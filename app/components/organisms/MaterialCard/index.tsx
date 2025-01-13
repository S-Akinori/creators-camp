import { Material, MaterialError } from "@/app/types/Material";
import Image from "next/image";
import Link from "next/link";
import UserCard from "../UserCard";
import clsx from "clsx";
import { reggaeOne } from "@/app/fonts";
import { Download, ThumbUp } from "@mui/icons-material";

const MaterialCard = ({ material }: { material: Material }) => {
    return (
        <div className=" relative bg-white shadow h-full" key={material.id}>
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="relative">
                        <Link href={`/materials/${material.id}`} className="block w-full relative aspect-video">
                            <Image className="mx-auto relative object-cover" src={material.image} fill alt={material.name} />
                        </Link>
                        <div className={clsx(["flex absolute right-0 bottom-0", reggaeOne.className])}>
                            <div className="bg-main text-main-cont p-1 text-sm"><Download className="text-sm" /> {material.download_count}</div>
                            <div className="bg-accent text-accent-cont p-1 text-sm"><ThumbUp className="text-sm" /> {material.like_count}</div>
                        </div>
                    </div>
                    <p className="p-2"><Link href={`/materials/${material.id}`}>{material.name}</Link></p>
                </div>
                <div className={clsx(["bg-white p-2", reggaeOne.className])}>
                    {material.user && (
                        <div className="border-t border-main">
                            <UserCard user={material.user} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MaterialCard;