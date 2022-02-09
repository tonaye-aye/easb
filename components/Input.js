import { useRef, useEffect, useState } from 'react'

export default function Input({
  setSearchInput,
  setFilteredSounds,
  sounds,
  disabledInput
}) {
  const inputRef = useRef(null)
  const clearRef = useRef(null)
  const [input, setInput] = useState('')
  const [placeholder, setPlaceholder] = useState('Search...')

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement === inputRef.current) return
      if (e.key === '/') {
        inputRef.current.focus()
        setInput('')
        setPlaceholder('Search...')
      }
    }

    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        !clearRef.current.contains(e.target)
      ) {
        inputRef.current.blur()
        setPlaceholder("Press '/' to focus...")
      } else {
        setPlaceholder('Search...')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', (e) => handleClickOutside(e))

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', (e) => handleClickOutside(e))
    }
  })

  useEffect(() => {
    if (input !== '') {
      clearRef.current.style.visibility = 'visible'
      clearRef.current.style.pointerEvents = 'auto'
    } else {
      clearRef.current.style.visibility = 'hidden'
      clearRef.current.style.pointerEvents = 'none'
    }
  }, [input])

  const handleSearch = (value) => {
    let newValue = value
      .replace(/\\+/, '')
      .replace(/\/+/, '')
      .replace(/\[+/, '')
      .replace(/\]+/, '')
    setInput(newValue)
    setSearchInput(newValue)
  }

  const handleClear = () => {
    inputRef.current.focus()
    setInput('')
    setFilteredSounds(sounds)
  }

  return (
    <div className="w-full sticky top-0 z-10 bg-stone-900 border-b-2 border-yellow-400">
      <form className="w-full flex relative items-center justify-between mx-auto md:max-w-5xl px-6 md:px-2 py-3 text-white">
        <input
          value={input}
          ref={inputRef}
          disabled={disabledInput}
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder={placeholder}
          className="w-full p-3 border-0 outline-0 text-white bg-inherit rounded-md bg-stone-800"
        />
        <div
          ref={clearRef}
          onClick={handleClear}
          className="absolute py-1 px-2 right-8 md:right-4 no-select rounded-full bg-stone-900 hover:bg-red-700 text-sm hover:cursor-pointer"
        >
          &#10005;
        </div>
      </form>
    </div>
  )
}
