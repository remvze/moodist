import { useMediaSessionStore } from '@/stores/media-session';

import { MediaSessionTrack } from './media-session-track';

export function MediaControls() {
  const mediaControlsEnabled = useMediaSessionStore(state => state.enabled);

  if (!mediaControlsEnabled) {
    return null;
  }

  return <MediaSessionTrack />;
}
