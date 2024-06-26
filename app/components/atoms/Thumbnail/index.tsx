import Image from "next/image";

interface ThumbnailProps {
    src: string;
    alt?: string;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const Thumbnail = ({ src, alt = '', objectFit = 'cover' }: ThumbnailProps) => {
  return (
    <div className="block w-full relative aspect-video">
      <Image className="mx-auto relative" src={src} fill objectFit={objectFit} alt={alt} />
    </div>
  );
};

export default Thumbnail;
