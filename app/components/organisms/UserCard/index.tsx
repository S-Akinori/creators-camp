import { User } from "@/app/types/User";
import Image from "next/image";

const UserCard = ({ user }: { user: User }) => {
    return (
        <div className="flex items-center mt-2">
            <Image src={user.image} width={40} height={40} alt={user.name} className="rounded-full" />
            <p className="ml-4 text-sm md:text-base">{user.name}</p>
        </div>
    )
}

export default UserCard;