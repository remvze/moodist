function blobToDataURL(blob: Blob) {
  return new Promise<string>(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') return;
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function encodeWAV(audioBuffer: AudioBuffer) {
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const length = audioBuffer.length * numChannels * 2 + 44; // Header + PCM data
  const wavBuffer = new ArrayBuffer(length);
  const view = new DataView(wavBuffer);

  // WAV file header
  writeString(view, 0, 'RIFF');
  // File size - 8
  view.setUint32(4, 36 + audioBuffer.length * numChannels * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  // Subchunk1Size
  view.setUint32(16, 16, true);
  // Audio format (PCM)
  view.setUint16(20, 1, true);
  // NumChannels
  view.setUint16(22, numChannels, true);
  // SampleRate
  view.setUint32(24, sampleRate, true);
  // ByteRate
  view.setUint32(28, sampleRate * numChannels * 2, true);
  // BlockAlign
  view.setUint16(32, numChannels * 2, true);
  // BitsPerSample
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  // Subchunk2Size
  view.setUint32(40, audioBuffer.length * numChannels * 2, true);

  // Write interleaved PCM samples
  let offset = 44;

  for (let i = 0; i < audioBuffer.length; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      const sample = audioBuffer.getChannelData(channel)[i];
      const clampedSample = Math.max(-1, Math.min(1, sample));
      view.setInt16(offset, clampedSample * 0x7fff, true);
      offset += 2;
    }
  }

  return wavBuffer;
}

export async function getSilenceDataURL(seconds: number = 60) {
  const audioContext = new AudioContext();

  const sampleRate = 44100;
  const length = sampleRate * seconds;
  const buffer = audioContext.createBuffer(1, length, sampleRate);
  const channelData = buffer.getChannelData(0);

  /**
   * - Firefox ignores audio for Media Session without any actual sound in the beginning.
   * - Add a small value to the end to prevent clipping.
   */
  channelData[0] = 0.001;
  channelData[channelData.length - 1] = 0.001;

  return await blobToDataURL(
    new Blob([encodeWAV(buffer)], { type: 'audio/wav' }),
  );
}
