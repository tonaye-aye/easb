import { useState, useRef, useEffect } from 'react';
import sounds from '@data/sounds';

import Input from '@components/input';

export default function SoundBoard() {
  const soundRefs = useRef([]);
  const inputRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredSounds, setFilteredSounds] = useState([]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (searchInput !== '') {
      const filtered = sounds.filter((item) => {
        const regex = new RegExp(searchInput, 'gi');
        return item.title.match(regex);
      });
      setFilteredSounds(filtered);
    } else {
      setFilteredSounds(sounds);
    }
  }, [searchInput]);

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
      <Input setSearchInput={setSearchInput} />
      <main>
        <div className="container">
          {filteredSounds.map(({ id, title, src }) => (
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
