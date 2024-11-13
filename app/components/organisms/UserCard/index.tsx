import { User } from "@/app/types/User";
import Image from "next/image";
import Link from "next/link";

const UserCard = ({ user }: { user: User }) => {
    return (
        <div className="flex items-center mt-2">
            <div className="relative w-12 aspect-square">
                <Link href={`/users/${user.id}`} className="block w-full relative aspect-square">
                    <Image src={user.image} fill objectFit="cover" alt={user.name} className="rounded-full" />
                </Link>
            </div>
            <p className="ml-4 text-sm md:text-base"><Link href={`/users/${user.id}`}>{user.name}</Link></p>
        </div>
    )
}

export default UserCard;