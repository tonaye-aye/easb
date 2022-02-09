import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'

// import { sounds } from '@data/appData'
const { sounds } = dynamic(() => import('@data/appData'))

import Input from '@components/Input'

export default function SoundBoard() {
  const soundRefs = useRef([])
  const buttonRefs = useRef([])
  const inputRef = useRef(null)

  const [playing, setPlaying] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [disabledInput, setDisabledInput] = useState(false)
  const [filteredSounds, setFilteredSounds] = useState([])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (searchInput !== '') {
      const filtered = sounds.filter((item) => {
        const regex = new RegExp(searchInput, 'gi')
        return item.title.match(regex)
      })
      setFilteredSounds(filtered)
    } else {
      setFilteredSounds(sounds)
    }
  }, [searchInput])

  const handleSound = (e, id) => {
    e.preventDefault()
    if (playing) return
    soundRefs.current[id].play()
    setDisabledInput(true)
    setPlaying(true)
    soundRefs.current[id].addEventListener('ended', () => {
      setPlaying(false)
      setDisabledInput(false)
    })
  }

  return (
    <>
      <Input
        setSearchInput={setSearchInput}
        setFilteredSounds={setFilteredSounds}
        sounds={sounds}
        disabledInput={disabledInput}
      />
      <div className="w-full">
        <main className="w-full mx-auto px-6 md:px-2 py-6 md:mb-8 md:max-w-5xl grid place-items-center items-start gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredSounds.map(({ id, title, src }) => (
            <div key={id} className="w-full shawod-lg">
              <button
                className="w-full no-select rounded-md text-lg text-white px-2 py-4 text-center bg-pink-700 transition ease-in-out duration-300 hover:scale-105"
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
            <div className="text-pink-500 font-semibold text-2xl py-12 flex justify-center">
              No results found. 😦
            </div>
          )}
        </main>
      </div>
    </>
  )
}
