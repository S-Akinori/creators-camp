import Image from "next/image";
import Button from "../Button";
import Link from "next/link";

const Header = () => {
    return (
        <header className="header">
            <div className="flex justify-end">
                <Link href="/" className="mx-2"><Image src="/images/x.png" width={123} height={50} alt="twitter" /></Link>
                <Link href="/" className="mx-2"><Image src="/images/mailtab.png" width={123} height={50} alt="twitter" /></Link>
                <Link href="/login" className="mx-2"><Image src="/images/mypagetab.png" width={123} height={50} alt="twitter" /></Link>
                {/* <Button className="mx-4"><Image src="/images/twitter.png" width={30} height={24} alt="twitter" /></Button>
                <Button className="mx-4" color="accent"><Image src="/images/mail.png" width={30} height={24} alt="twitter" /></Button>
                <Button className="mx-4 text-shadow" color="accent"><Image src="/images/mypage.png" width={60} height={48} alt="twitter" /></Button> */}
            </div>
        </header>
    );
}

export default Header;