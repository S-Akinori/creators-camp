import Image from "next/image";

interface ThumbnailProps {
    src: string;
    alt?: string;
}

const Thumbnail = ({ src, alt = '' }: ThumbnailProps) => {
  return (
    <div className="block w-full relative aspect-video">
      <Image className="mx-auto relative" src={src} fill objectFit="cover" alt={alt} />
    </div>
  );
};

export default Thumbnail;
