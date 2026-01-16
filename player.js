import { state } from './state.js';

const audio = document.getElementById('audio');
const nowCover = document.getElementById('nowCover');
const nowTitle = document.getElementById('nowTitle');
const nowArtist = document.getElementById('nowArtist');

export function playTrack(id){
  const t = state.library.find(x=>x.id===id);
  if(!t) return;

  state.currentId = id;
  audio.src = URL.createObjectURL(t.blob);
  audio.play();

  nowTitle.textContent = t.title;
  nowArtist.textContent = t.artist || '-';
  nowCover.innerHTML='';

  if(t.cover){
    const img=document.createElement('img');
    img.src=t.cover;
    nowCover.appendChild(img);
  }else{
    nowCover.textContent='♬';
  }
}
