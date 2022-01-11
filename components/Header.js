import Image from 'next/image';
import headerImg from '../public/assets/header.png';

export default function Header() {
  return (
    <header className="w-full p-2 bg-yellow-400">
      <div className="w-full md:max-w-5xl grid place-items-center">
        <Image
          src={headerImg}
          width={300}
          height={100}
          alt="The Eric Andre Show"
        />
      </div>
    </header>
  );
}
