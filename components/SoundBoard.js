import { useState, useRef, useEffect } from 'react';
import { sounds } from '@data/appData';

import Input from '@components/input';

export default function SoundBoard() {
  const soundRefs = useRef([]);
  const buttonRefs = useRef([]);
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

  const handleSound = (e, id) => {
    e.preventDefault();
    if (playing) return;
    soundRefs.current[id].play();
    setPlaying(true);
    soundRefs.current[id].addEventListener('ended', () => {
      setPlaying(false);
    });
  };

  return (
    <>
      <Input
        setSearchInput={setSearchInput}
        setFilteredSounds={setFilteredSounds}
        sounds={sounds}
      />
      <main className="w-full mx-auto px-2 py-6 md:max-w-5xl grid place-items-center gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredSounds.map(({ id, title, src }) => (
          <div key={id} className="card">
            <button
              className="w-full no-select rounded-md text-lg text-white px-3 py-6 text-center bg-pink-700 transition ease-in-out duration-300 hover:scale-105"
              ref={(el) => buttonRefs.current.push(el)}
              onClick={(e) => handleSound(e, id)}
              type="button"
            >
              {title}
            </button>
            <audio id={id} ref={(el) => soundRefs.current.push(el)} src={src}>
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </div>
        ))}
        {filteredSounds.length === 0 && (
          <div className="message">No results found.</div>
        )}
      </main>
    </>
  );
}
