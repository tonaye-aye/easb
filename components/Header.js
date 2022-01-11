import Image from 'next/image';
import headerImg from '../public/assets/header.png';

export default function Header() {
  return (
    <header className="flex w-full px-2 bg-yellow-400">
      <Image
        src={headerImg}
        width={300}
        height={100}
        alt="The Eric Andre Show"
      />
    </header>
  );
}
