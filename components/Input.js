import { useRef, useEffect, useState } from 'react';

export default function Input({ setSearchInput }) {
  const inputRef = useRef(null);
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
      if (inputRef.current && !inputRef.current.contains(e.target)) {
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

  const cleanSearch = (value) => {
    let newValue = value
      .replace(/\\+/, '')
      .replace(/\/+/, '')
      .replace(/\[+/, '')
      .replace(/\]+/, '');
    setInput(newValue);
    setSearchInput(newValue);
  };

  return (
    <div className="search-bar">
      <form>
        <input
          value={input}
          ref={inputRef}
          onChange={(e) => cleanSearch(e.target.value)}
          type="text"
          placeholder={placeholder}
        />
        <div className="clear no-select">&#10005;</div>
      </form>
    </div>
  );
}
