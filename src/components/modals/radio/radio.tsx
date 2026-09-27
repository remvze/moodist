import { useEffect, useMemo, useRef, useState } from 'react';
import { Select } from 'radix-ui';
import {
  LuChevronDown,
  LuExternalLink,
  LuPause,
  LuPlay,
  LuRadio,
} from 'react-icons/lu/index';

import {
  Modal,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/components/modal';
import { Slider } from '@/components/slider';

import styles from './radio.module.css';

interface RadioProps {
  onClose: () => void;
  onPlayingChange: (playing: boolean) => void;
  show: boolean;
}

interface Station {
  id: string;
  image: string;
  name: string;
  stream: string;
  website: string;
}

interface StationRecord {
  codec?: unknown;
  favicon?: unknown;
  homepage?: unknown;
  lastcheckok?: unknown;
  name?: unknown;
  stationuuid?: unknown;
  tags?: unknown;
  url_resolved?: unknown;
}

const genres = ['ambient', 'chillout', 'lofi', 'jazz', 'classical'];
const endpoint = 'https://all.api.radio-browser.info/json/stations/search';
const excludedTags = /\b(news|talk|podcast|sports|religion)\b/i;

function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;

  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function isSomaFm(value: string) {
  return /(^|[/.])somafm\.com\b|\bsomafm\b/i.test(value);
}

function toStation(record: StationRecord): Station | null {
  if (
    typeof record.stationuuid !== 'string' ||
    typeof record.name !== 'string' ||
    !record.name.trim() ||
    record.lastcheckok !== 1 ||
    String(record.codec).toLowerCase() !== 'mp3' ||
    !isHttpsUrl(record.url_resolved) ||
    (typeof record.tags === 'string' && excludedTags.test(record.tags)) ||
    excludedTags.test(record.name) ||
    isSomaFm(record.name) ||
    isSomaFm(record.url_resolved) ||
    (typeof record.homepage === 'string' && isSomaFm(record.homepage))
  ) {
    return null;
  }

  return {
    id: record.stationuuid,
    image:
      isHttpsUrl(record.favicon) && !isSomaFm(record.favicon)
        ? record.favicon
        : '',
    name: record.name.trim(),
    stream: record.url_resolved,
    website: isHttpsUrl(record.homepage) ? record.homepage : '',
  };
}

async function loadStations(signal: AbortSignal): Promise<Station[]> {
  const results = await Promise.allSettled(
    genres.map(async genre => {
      const params = new URLSearchParams({
        tag: genre,
        hidebroken: 'true',
        order: 'clickcount',
        reverse: 'true',
        limit: '40',
      });
      const response = await fetch(`${endpoint}?${params}`, { signal });
      if (!response.ok) throw new Error('Could not load stations');
      const data: unknown = await response.json();
      return Array.isArray(data) ? (data as StationRecord[]) : [];
    }),
  );

  const stations = new Map<string, Station>();
  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    for (const record of result.value) {
      const station = toStation(record);
      if (station && !stations.has(station.id))
        stations.set(station.id, station);
    }
  }

  return [...stations.values()].slice(0, 60);
}

export function RadioModal({ onClose, onPlayingChange, show }: RadioProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [volume, setVolume] = useState(60);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const selectPortalRef = useRef<HTMLDivElement>(null);

  const selectedStation = useMemo(
    () => stations.find(station => station.id === selectedId) ?? stations[0],
    [stations, selectedId],
  );

  useEffect(() => {
    if (!show || stations.length > 0) return;

    const controller = new AbortController();
    setLoading(true);
    setLoadError(false);

    loadStations(controller.signal)
      .then(result => {
        if (controller.signal.aborted) return;
        setStations(result);
        setSelectedId(result[0]?.id ?? '');
        setLoadError(result.length === 0);
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoadError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [show, stations.length, retryKey]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume, selectedStation]);

  useEffect(() => () => audioRef.current?.pause(), []);

  useEffect(() => {
    if (!show) setSelectOpen(false);
  }, [show]);

  const changeStation = (id: string) => {
    audioRef.current?.pause();
    setPlaying(false);
    onPlayingChange(false);
    setBuffering(false);
    setPlaybackError(false);
    setImageError(false);
    setSelectedId(id);
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    setPlaybackError(false);
    setBuffering(true);
    try {
      await audio.play();
    } catch {
      setBuffering(false);
      setPlaybackError(true);
    }
  };

  return (
    <Modal
      persist
      show={show}
      closeOnEscape={!selectOpen}
      onClose={onClose}
      portalContainerRef={selectPortalRef}
    >
      <ModalHeader>
        <div>
          <ModalTitle>Music Radio</ModalTitle>
          <ModalDescription>Live stations for focus and calm.</ModalDescription>
        </div>
      </ModalHeader>

      {loading ? (
        <div className={styles.loading} role="status" aria-live="polite">
          <div className={styles.loadingArt} />
          <div className={styles.loadingText}>
            <span />
            <span />
            <p>Finding music stations…</p>
          </div>
        </div>
      ) : loadError ? (
        <div className={styles.empty} role="alert">
          <LuRadio />
          <p>Stations are unavailable right now.</p>
          <button type="button" onClick={() => setRetryKey(key => key + 1)}>
            Try again
          </button>
        </div>
      ) : selectedStation ? (
        <div className={styles.player}>
          <div className={styles.station}>
            <div className={styles.artwork}>
              {selectedStation.image && !imageError ? (
                <img
                  src={selectedStation.image}
                  alt=""
                  onError={() => setImageError(true)}
                />
              ) : (
                <LuRadio aria-hidden="true" />
              )}
            </div>
            <div className={styles.stationDetails}>
              <span className={styles.liveLabel}>
                <span className={styles.liveDot} /> Live Radio
              </span>
              <h3>{selectedStation.name}</h3>
              {selectedStation.website && (
                <a
                  href={selectedStation.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit station <LuExternalLink aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <span id="music-radio-station-label" className={styles.fieldLabel}>
              Station
            </span>
            <Select.Root
              value={selectedStation.id}
              open={selectOpen}
              onOpenChange={setSelectOpen}
              onValueChange={id => {
                if (id !== selectedStation.id) changeStation(id);
              }}
            >
              <Select.Trigger
                className={styles.selectTrigger}
                aria-labelledby="music-radio-station-label"
              >
                <Select.Value />
                <Select.Icon className={styles.selectIcon}>
                  <LuChevronDown aria-hidden="true" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal container={selectPortalRef.current}>
                <Select.Content
                  className={styles.selectContent}
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={4}
                  avoidCollisions={false}
                >
                  <Select.Viewport className={styles.selectViewport}>
                    {stations.map(station => (
                      <Select.Item
                        key={station.id}
                        value={station.id}
                        className={styles.selectOption}
                      >
                        <Select.ItemText>{station.name}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            <small>{stations.length} music stations available</small>
          </div>

          <div className={styles.controls}>
            <button
              className={styles.playButton}
              type="button"
              aria-label={playing ? 'Pause radio' : 'Play radio'}
              onClick={togglePlayback}
            >
              {playing ? <LuPause /> : <LuPlay />}
            </button>
            <div className={styles.volume}>
              <div className={styles.volumeLabel}>
                <span>Volume</span>
                <span>{volume}%</span>
              </div>
              <Slider
                ariaLabel="Radio volume"
                value={volume}
                onChange={setVolume}
              />
            </div>
          </div>

          <p className={styles.status} role="status" aria-live="polite">
            {playbackError
              ? 'This stream could not play. Try another station.'
              : buffering
                ? 'Connecting to station…'
                : playing
                  ? 'Playing live radio'
                  : 'Ready to play'}
          </p>

          <audio
            ref={audioRef}
            src={selectedStation.stream}
            preload="none"
            onPlaying={() => {
              setPlaying(true);
              onPlayingChange(true);
              setBuffering(false);
            }}
            onPause={() => {
              setPlaying(false);
              onPlayingChange(false);
              setBuffering(false);
            }}
            onWaiting={() => setBuffering(true)}
            onError={() => {
              setPlaying(false);
              onPlayingChange(false);
              setBuffering(false);
              setPlaybackError(true);
            }}
          />
        </div>
      ) : null}

      <p className={styles.credit}>
        Stations from{' '}
        <a
          href="https://www.radio-browser.info/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Radio Browser
        </a>
        . Playback continues when this window is closed.
      </p>
    </Modal>
  );
}
