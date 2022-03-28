import Image from 'next/image'
import hannibal from '../public/assets/hannibal-icon.png'
import eric from '../public/assets/eric-icon.png'

export default function Footer() {
  return (
    <footer className="flex justify-between p-3 text-white backdrop-blur">
      <div className="flex gap-2">
        <a
          rel="noreferrer"
          href="https://www.instagram.com/hannibalburess/?hl=en"
          target="_blank"
        >
          <Image src={hannibal} width={30} height={30} alt="hannibal buress" />
        </a>
        <a
          rel="noreferrer"
          href="https://www.instagram.com/ericfuckingandre/?hl=en"
          target="_blank"
        >
          <Image src={eric} width={30} height={30} alt="eric andre" />
        </a>
      </div>
      <span>
        made by{' '}
        <a
          className="hover:text-yellow-400"
          href="https://www.youtube.com/watch?v=r9B7BQWnZJs"
          rel="noreferrer"
        >
          L. Ron Hoyabemebe
        </a>
      </span>
    </footer>
  )
}
