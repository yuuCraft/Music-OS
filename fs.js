import { state } from './state.js';

export async function readDirectoryRecursive(dirHandle, path = []) {
  for await (const [name, handle] of dirHandle.entries()) {
    if (handle.kind === 'file' && name.toLowerCase().endsWith('.mp3')) {
      const file = await handle.getFile();
      const blob = new Blob([await file.arrayBuffer()], { type: 'audio/mpeg' });

      state.library.push({
        id: crypto.randomUUID(),
        title: name.replace(/\.mp3$/i, ''),
        artist: '',
        album: path.at(-1) || '',
        blob,
        cover: null
      });
    }

    if (handle.kind === 'directory') {
      await readDirectoryRecursive(handle, [...path, name]);
    }
  }
}
