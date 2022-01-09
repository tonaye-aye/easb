import { useRef, useEffect } from 'react';

export default function Input({ setSearchInput }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const cleanSearch = (value) => {
    let newValue = value
      .replace(/\\+/, '')
      .replace(/\/+/, '')
      .replace(/\[+/, '')
      .replace(/\]+/, '');

    setSearchInput(newValue);
  };

  return (
    <div className="search-bar">
      <form>
        <input
          ref={inputRef}
          onChange={(e) => cleanSearch(e.target.value)}
          type="text"
          placeholder="search..."
        />
        <div className="clear no-select">&#10005;</div>
      </form>
    </div>
  );
}
