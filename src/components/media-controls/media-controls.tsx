import { MediaSessionTrack } from './media-session-track';
import { useEffect, useState } from 'react';
import { useSSR } from '@/hooks/use-ssr';

export function MediaControls() {
  const [mediaControlsEnabled, setMediaControlsEnabled] = useState(false);
  const { isBrowser } = useSSR();

  useEffect(() => {
    if (!isBrowser) return;

    setMediaControlsEnabled('mediaSession' in navigator);
  }, [isBrowser]);

  if (!mediaControlsEnabled) {
    return null;
  }

  return <MediaSessionTrack />;
}
