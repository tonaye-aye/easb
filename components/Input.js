import { useRef, useEffect, useState } from 'react';

export default function Input({ setSearchInput, setFilteredSounds, sounds }) {
  const inputRef = useRef(null);
  const clearRef = useRef(null);
  const [input, setInput] = useState('');
  const [placeholder, setPlaceholder] = useState('Search...');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement === inputRef.current) return;
      if (e.key === '/') {
        inputRef.current.focus();
        setInput('');
        setPlaceholder('Search...');
      }
    };

    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        !clearRef.current.contains(e.target)
      ) {
        inputRef.current.blur();
        setPlaceholder("Press '/' to focus...");
      } else {
        setPlaceholder('Search...');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', (e) => handleClickOutside(e));

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', (e) => handleClickOutside(e));
    };
  });

  useEffect(() => {
    if (input !== '') {
      clearRef.current.style.visibility = `visible`;
      clearRef.current.classList.add('close');
    } else {
      clearRef.current.style.visibility = `hidden`;
      clearRef.current.classList.remove('close');
    }
  }, [input]);

  const handleSearch = (value) => {
    let newValue = value
      .replace(/\\+/, '')
      .replace(/\/+/, '')
      .replace(/\[+/, '')
      .replace(/\]+/, '');
    setInput(newValue);
    setSearchInput(newValue);
  };

  const handleClear = () => {
    inputRef.current.focus();
    setInput('');
    setFilteredSounds(sounds);
  };

  return (
    <div className="search-bar">
      <form>
        <input
          value={input}
          ref={inputRef}
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder={placeholder}
        />
        <div ref={clearRef} onClick={handleClear} className="clear no-select">
          &#10005;
        </div>
      </form>
    </div>
  );
}
