import Image from "next/image";

export function PhotoGridItem({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-square md:aspect-video w-full overflow-hidden rounded-3xl bg-bg-secondary">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}
