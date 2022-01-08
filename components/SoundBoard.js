import { useState, useRef, useEffect } from 'react';
import { sounds } from '@data/data';

export default function Footer() {
  const [playing, setPlaying] = useState(false);
  const soundRefs = useRef([]);

  const handleSound = (id) => {
    if (playing) return;
    soundRefs.current[id].play();
    setPlaying(true);
    soundRefs.current[id].addEventListener('ended', () => {
      setPlaying(false);
    });
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
              <audio id={id} ref={(el) => soundRefs.current.push(el)} src={src}>
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
