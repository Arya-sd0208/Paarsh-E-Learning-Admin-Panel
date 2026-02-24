import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center" prefetch={false}>
      <Image
        src="/logo-wide.webp"
        alt="Paarsh E-Learning Logo"
        width={180}
        height={34}
        style={{ height: 'auto' }}
        priority
      />
    </Link>
  );
}
