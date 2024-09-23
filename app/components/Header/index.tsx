import Image from "next/image";
import Button from "../atoms/Button";
import Link from "next/link";
import TextShadow from "../TextShadow";
import clsx from "clsx";
import { reggaeOne } from "@/app/fonts";
import SearchForm from "../organisms/SearchForm";
import GlobalSearchForm from "../organisms/GlobalSearchForm";
import SPMenu from "../organisms/SPMenu";
import { getUser } from "@/app/lib/auth";

const Header = async () => {
    const user = await getUser();
    console.log(user)
    return (
        <header className="header px-4 bg-[#DDDEDB]">
            <div className="flex items-center justify-between">
                <div className="px-2">
                    <Link href="/"><Image src="/images/logo.png" width={200} height={80} alt="logo" /></Link>
                </div>
                <div className="hidden md:block">
                    <GlobalSearchForm />
                </div>
                <div className="hidden md:flex justify-end">
                    <Link href="/" className="mx-2 px-4 md:px-12 py-2" style={{background: '#24332e', borderRadius: '0 0 1rem 1rem'}}><Image src="/images/x-logo.png" width={30} height={30} alt="x" /></Link>
                    <Link href="/contact" className="mx-2 px-4 md:px-12 py-2 bg-accent" style={{borderRadius: '0 0 1rem 1rem'}}><Image src="/images/mail.png" width={40} height={20} alt="twitter" /></Link>
                    <Link href="/login" className="mx-2 px-4 md:px-12 py-2 bg-accent" style={{borderRadius: '0 0 1rem 1rem'}}>
                        <span className="hidden md:block"><TextShadow className={clsx(["text-xs md:text-base", reggaeOne.className])}>マイページ</TextShadow></span>
                        <Image className="block md:hidden" src="/images/user.png" width={40} height={20} alt="twitter" />
                    </Link>
                </div>
                <div className="md:hidden">
                    <SPMenu isAuth={user !== null} />
                </div>
            </div>
        </header>
    );
}

export default Header;