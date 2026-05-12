import Image from "next/image";

export function PhotoGridItem({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-bg-secondary">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}
