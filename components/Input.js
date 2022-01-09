import { useRef, useEffect, useState } from 'react';

export default function Input({ setSearchInput }) {
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [placeholder, setPlaceholder] = useState('Search...');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (document.activeElement === inputRef.current) return;
      setPlaceholder("'/' to focus");
      if (e.key === '/') {
        inputRef.current.focus();
        setInput('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
