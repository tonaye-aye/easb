import Image from 'next/image';
import headerImg from '../public/assets/header.png';

export default function Header() {
  return (
    <header>
      <Image
        src={headerImg}
        width={600}
        height={200}
        alt="The Eric Andre Show"
      />
    </header>
  );
}
