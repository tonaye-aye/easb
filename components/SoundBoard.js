import { useRef } from 'react';
import { sounds } from '@data/data';

import yeah from '../public/sounds/yeah.mp3';

export default function Footer() {
  const soundRefs = [];
  const audio = useRef(null);

  sounds.forEach((sound) => {
    soundRefs.push(sound);
  });

  const handleSound = (src) => {
    console.log(soundRefs);

    //soundRefs[src].current[src].play();
  };

  return (
    <>
      <div className="search-bar">
        <form>
          <input type="text" placeholder="search..." autoFocus />
          <div className="clear no-select">&#10005;</div>
        </form>
      </div>
      <main>
        <div className="container">
          {sounds.map(({ id, title, src }) => (
            <div key={id} className="card">
              <div
                id={id}
                className="btn no-select"
                onClick={() => handleSound(src)}
              >
                {title}
              </div>
              <audio ref={soundRefs[id]} src={src}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

// <div className="card">
//             <div className="btn no-select" onClick={handleSound}>
//               SOmething
//             </div>
//             <audio ref={audio} src={yeah}>
//               Your browser does not support the
//               <code>audio</code> element.
//             </audio>
//           </div>
