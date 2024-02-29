import { Material, MaterialError } from "@/app/types/Material";
import Image from "next/image";
import Link from "next/link";
import UserCard from "../UserCard";

const MaterialCard = ({ material }: { material: Material }) => {
    return (
        <div className="w-1/2 md:w-1/4 p-4 mb-4 relative" key={material.id}>
            <Link href={`/materials/${material.id}`} className="block w-full relative aspect-video">
                <Image className="mx-auto relative" src={material.image} fill objectFit="cover" alt={material.name} />
            </Link>
            <div className="bg-white p-2">
                <p>{material.name}</p>
                {material.user && <UserCard user={material.user} />}
            </div>
        </div>
    )
}

export default MaterialCard;