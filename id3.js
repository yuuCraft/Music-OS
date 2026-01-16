import { state } from './state.js';
import { renderLibrary, renderArtists } from './render.js';

export async function parseID3Safely(){
  for(const t of state.library){
    await new Promise(res=>{
      jsmediatags.read(t.blob,{
        onSuccess: tag=>{
          const d = tag.tags;
          if(d.title) t.title = d.title;
          if(d.artist) t.artist = d.artist;

          if(d.picture){
            const p = d.picture;
            const b64 = btoa(
              new Uint8Array(p.data)
                .reduce((s,c)=>s+String.fromCharCode(c),'')
            );
            t.cover = `data:${p.format};base64,${b64}`;
          }
          res();
        },
        onError:()=>res()
      });
    });
    renderLibrary();
    renderArtists();
  }
}
