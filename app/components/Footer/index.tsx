import styles from './index.module.css'
import Link from "next/link";
import Container from "../Container";
import TextShadow from "../TextShadow";
import clsx from 'clsx';
import Image from 'next/image';
import { reggaeOne } from '@/app/fonts';

const Footer = () => {
  return (
    <footer className={clsx(["footer px-4 py-8", styles.footer])}>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 md:w-40 aspect-[11/5]'><Image src='/images/footer-camp.png' fill alt='' /></div>
      <Container>
          <div className={clsx(["flex md:justify-center flex-wrap", reggaeOne.className])}>
              <Link href='/toc' className='mr-2 mb-4'><TextShadow className="md:text-xl" align='left'>ご利用規約</TextShadow></Link>
              <Link href='/contact' className='mr-2 mb-4'><TextShadow className="md:text-xl" align='left'>お問い合わせ</TextShadow></Link>
              <Link href='/about' className='mr-2 mb-4'><TextShadow className="md:text-xl" align='left'>サイトについて</TextShadow></Link>
              <Link href='/sitemap' className='mr-2 mb-4'><TextShadow className="md:text-xl" align='left'>サイトマップ</TextShadow></Link>
              <Link href='/sponser' className='mr-2 mb-4'><TextShadow className="md:text-xl" align='left'>スポンサー</TextShadow></Link>
          </div>
      </Container>
    </footer>
  );
}

export default Footer;