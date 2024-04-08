import Image from "next/image";
import Button from "../atoms/Button";
import Container from "../Container";
import Link from "next/link";
import { reggaeOne } from "@/app/fonts";

const FV = () => {
    return (
        <div className="w-full relative py-20 mb-8 bg-cover bg-[left_-20rem_top_0] md:bg-center" style={{ backgroundImage: 'url(/images/bg-fv.png)', backgroundRepeat: 'no-repeat' }}>
            <Container>
                <div className="flex justify-center items-center">
                    <div className="relative md:absolute top-1/2 md:-translate-y-1/2 left-0 w-1/3 md:w-1/4 max-w-72 aspect-square"><Image src="/images/character_CLE_01.png" fill alt="" /></div>
                    <div className="relative md:absolute top-1/2 md:-translate-y-1/2 right-0 w-1/4 md:w-1/5 max-w-72 aspect-[2/3]"><Image src="/images/character_RECY_01.png" fill alt="" /></div>
                </div>
                <div className="text-center md:w-1/2 mx-auto">
                    <Image className="mx-auto" src="/images/logo.png" width={1000} height={246} alt="クリエイターズキャンプ" />
                </div>
                <div className="text-center">
                    <Button className="text-5xl"><Link href='/user' className={reggaeOne.className}>マイページ</Link></Button>
                </div>
            </Container>
        </div>
    );
}

export default FV;