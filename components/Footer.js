import Image from 'next/image';
import hannibal from '../public/assets/hannibal-icon.png';
import eric from '../public/assets/eric-icon.png';

export default function Footer() {
  return (
    <footer>
      <div className="icons">
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
      <div className="author">
        made by <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">tones</a>
      </div>
    </footer>
  );
}
