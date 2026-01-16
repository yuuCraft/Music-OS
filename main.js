import { readDirectoryRecursive } from './fs.js';
import { parseID3Safely } from './id3.js';
import { renderLibrary, renderArtists } from './render.js';
import { state } from './state.js';

document.getElementById('openWorkspace').onclick = async ()=>{
  const handle = await window.showDirectoryPicker();
  state.library.length = 0;

  await readDirectoryRecursive(handle);

  renderLibrary();
  renderArtists();

  parseID3Safely();
};
