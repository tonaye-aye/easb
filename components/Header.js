import Image from 'next/image';
import headerImg from '../public/assets/header.png';

export default function Header() {
  return (
    <header className="w-full bg-yellow-400">
      <div className="flex w-full mx-auto md:max-w-5xl">
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
