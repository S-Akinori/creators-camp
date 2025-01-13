import Image from "next/image"

interface Props {
    src: string;
    alt: string;
    width?: number;
}

const RoundedImage = ({src, alt, width}: Props) => {
    return (
        <div className="border-main border-2 bg-white w-full relative aspect-square rounded-full mx-auto" style={{width: `${width}px`}}>
            <Image className=" rounded-full" objectFit="cover" src={src} fill alt={alt} />
        </div>
    );
}

export default RoundedImage;