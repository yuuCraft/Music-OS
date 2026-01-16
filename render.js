import { state } from './state.js';
import { playTrack } from './player.js';

const list = document.getElementById('list');
const navArtists = document.getElementById('navArtists');

export function renderLibrary(filterArtist=null){
  list.innerHTML = '';
  state.library
    .filter(t => !filterArtist || t.artist === filterArtist)
    .forEach(t=>{
      const row = document.createElement('div');
      row.className = 'track';
      row.onclick = ()=>playTrack(t.id);

      const cover = document.createElement('div');
      cover.className = 'cover';
      if(t.cover){
        const img=document.createElement('img');
        img.src=t.cover;
        cover.appendChild(img);
      }else cover.textContent='♬';

      const info = document.createElement('div');
      info.className='info';
      info.innerHTML = `
        <div class="title">${t.title}</div>
        <div class="artist">${t.artist || '-'}</div>
      `;

      row.append(cover,info);
      list.appendChild(row);
    });
}

export function renderArtists(){
  navArtists.innerHTML='';
  [...new Set(state.library.map(t=>t.artist).filter(Boolean))]
    .sort()
    .forEach(a=>{
      const d=document.createElement('div');
      d.textContent=a;
      d.onclick=()=>renderLibrary(a);
      navArtists.appendChild(d);
    });
}
