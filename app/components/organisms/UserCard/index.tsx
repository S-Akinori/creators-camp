import { User } from "@/app/types/User";
import Image from "next/image";

const UserCard = ({ user }: { user: User }) => {
    return (
        <div className="flex items-center mt-2">
            <div className="relative w-12 aspect-square">
                <Image src={user.image} fill objectFit="cover" alt={user.name} className="rounded-full" />
            </div>
            <p className="ml-4 text-sm md:text-base">{user.name}</p>
        </div>
    )
}

export default UserCard;