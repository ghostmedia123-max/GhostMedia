import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="text-xl font-bold">
      {/* You can replace this text with an <Image> component later */}
      GhostMedia
    </Link>
  );
}