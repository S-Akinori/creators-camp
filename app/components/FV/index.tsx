import Image from "next/image";
import Button from "../atoms/Button";
import Container from "../Container";
import Link from "next/link";
import { reggaeOne } from "@/app/fonts";

const FV = () => {
    return (
        <div className="w-full relative mb-8 bg-cover md:bg-contain bg-center" style={{ backgroundImage: 'url(/images/bg-fv.png)', backgroundRepeat: 'no-repeat' }}>
            <div className="hidden md:flex justify-center items-center">
                <div className="relative pr-4"><Image src="/images/character_CLE_01.png" width={480} height={480} alt="" /></div>
                <div>
                    <div className="text-center mx-auto">
                        <Image className="mx-auto" src="/images/logo.png" width={1000} height={246} alt="クリエイターズキャンプ" />
                    </div>
                    <div className="text-center">
                        <Button className="text-5xl"><Link href='/user' className={reggaeOne.className}>マイページ</Link></Button>
                    </div>
                </div>
                <div className="relative pl-4"><Image src="/images/character_RECY_01.png" width={386} height={536} alt="" /></div>
            </div>
            <div className="md:hidden p-4">
                <div className="flex items-center">
                    <div className="relative px-4"><Image src="/images/character_CLE_01.png" width={480} height={480} alt="" /></div>
                    <div className="relative px-4"><Image src="/images/character_RECY_01.png" width={386} height={536} alt="" /></div>
                </div>
                <div className="">
                    <div className="text-center mx-auto">
                        <Image className="mx-auto" src="/images/logo.png" width={1000} height={246} alt="クリエイターズキャンプ" />
                    </div>
                    <div className="text-center">
                        <Button className="text-5xl"><Link href='/user' className={reggaeOne.className}>マイページ</Link></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FV;