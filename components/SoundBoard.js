import { useState, useRef } from 'react';
import { sounds } from '@data/data';

export default function Footer() {
  const [playing, setPlaying] = useState(false);
  const audio = useRef([]);

  const handleSound = (id) => {
    // for (const item in audio) {
    //   console.log(audio[item]);
    // }
    audio.current[id].play();
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
              <div className="btn no-select" onClick={() => handleSound(id)}>
                {title}
              </div>
              <audio id={id} ref={(el) => audio.current.push(el)} src={src}>
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
