import Image from "next/image";
import TextShadow from "./components/TextShadow";
import FV from "./components/FV";
import ArrowButton from "./components/atoms/Button/ArrowButton";
import Title from "./components/Title";
import Container from "./components/Container";
import Button from "./components/atoms/Button";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from "next/link";
import { getCategories, getCategory } from "./lib/category";
import clsx from "clsx";
import { reggaeOne } from "./fonts";
import MaterialListClient from "./components/organisms/MaterialListClient";
import NewsList from "./components/organisms/NewsList";
import Frame from "./components/molecules/Frame";

export default async function Home() {
  // const materialsPagination = await getMaterials()
  const categories = await getCategories();
  return (
    <>
      <Header />
      <main className="py-16 min-h-screen">
        <div className="flex justify-end mt-8">
          <Link href="/news" className="mx-2 hidden md:block"><Image src="/images/news.png" width={212} height={85} alt="twitter" /></Link>
          <Link href="/materials" className="mx-2"><Image src="/images/search.png" width={212} height={85} alt="twitter" /></Link>
          <Link href="/user/material/create" className="mx-2"><Image src="/images/post.png" width={212} height={85} alt="twitter" /></Link>
        </div>
        <FV />
        <div className="mb-8">
          <div className={clsx(["flex flex-wrap justify-center max-w-5xl mx-auto", reggaeOne.className])}>
            <div className="w-1/2 md:w-1/4"><ArrowButton className="w-full" href="/users"><TextShadow className=" md:text-xl">クリエイター</TextShadow></ArrowButton></div>
            <div className="w-1/2 md:w-1/4"><ArrowButton className="w-full" href="/materials?category_id=3"><TextShadow className=" md:text-xl">ミュージック</TextShadow></ArrowButton></div>
            <div className="w-1/2 md:w-1/4"><ArrowButton className="w-full" href="/materials?category_id=6"><TextShadow className=" md:text-xl">イラスト</TextShadow></ArrowButton></div>
            <div className="w-1/2 md:w-1/4"><ArrowButton className="w-full" href="/materials?category_id=2"><TextShadow className=" md:text-xl">プラグイン</TextShadow></ArrowButton></div>
          </div>
        </div>
        <Container className="md:flex max-w-5xl mx-auto mb-12 flex-wrap">
          <div className="p-4 md:w-1/2">
            <Link href='https://keylandalice.wixsite.com/torapeceeno' target="_blank"><Image src="/images/banner-torape.png" width={580} height={160} alt="" /></Link>
          </div>
          <div className="p-4 md:w-1/2">
            <Link href='https://pokapoka0802.wixsite.com/tunousaginoie82' target="_blank"><Image src="/images/banner-tsunousagi.png" width={580} height={160} alt="" /></Link>
          </div>
          <div className="p-4 md:w-1/2">
            <Link href='https://suiko-game.com/' target="_blank"><Image src="/images/banner-suiko.jpg" width={580} height={160} alt="" /></Link>
          </div>
        </Container>
        <Container className="mb-12">
          <div className="max-w-5xl mx-auto">
            <Title className="mb-4">お知らせ</Title>
            <NewsList />
          </div>
        </Container>
        <Container className="mb-20">
          <div className="absolute left-0 -top-4 z-[-1] aspect-[6/1] w-full"><Image src="/images/flag.png" fill alt="" /></div>
          <Title>ジャンル一覧</Title>
          <div className="max-w-5xl flex justify-center flex-wrap mx-auto">
            {categories?.map((category) => (
              <div key={category.id} className="w-1/2 md:w-1/5 p-4 mb-4">
                <Frame className="h-full">
                  <Link href={`materials?category_id=${category.id}`} className="text-center block">
                    <span className={`text-main-cont text-bold text-xl ${reggaeOne.className}`}>{category.name}</span>
                    <div className="relative h-20 md:h-40 m-2">
                      <Image className="mx-auto" src={category.image} fill objectFit="contain" alt={category.name} />
                    </div>
                  </Link>
                </Frame>
              </div>
            ))}
          </div>
        </Container>
        <Container className="mb-20">
          <div className="absolute left-0 -top-4 z-[-1] aspect-[6/1] w-full"><Image src="/images/flag.png" fill alt="" /></div>
          <Title className="mb-8">素材一覧</Title>
          <MaterialListClient />
          <div className="text-right mt-8">
            <Link href={'/materials'} className="bg-gray-400 py-2 px-20 text-white">素材をもっと見る →</Link>
          </div>
        </Container>
        <Container className="mb-20">
          <div className="absolute left-0 -top-4 z-[-1] aspect-[6/1] w-full"><Image src="/images/flag.png" fill alt="" /></div>
          <Title className="mb-4">ランキング一覧</Title>
          <div className="mb-20">
            <MaterialListClient categoryId={2} title="プラグインいいねランキング" icon="/images/icon-plugin.png" moreLinkText="プラグイン素材を見る →" />
          </div>
          <div className="mb-20">
            <MaterialListClient categoryId={3} title="BGMいいねランキング" icon="/images/icon-bgm.png" moreLinkText="BGM素材を見る →" />
          </div>
          <div className="mb-20">
            <MaterialListClient categoryId={6} title="立ち絵いいねランキング" icon="/images/icon-picture.png" moreLinkText="立ち絵素材を見る →" />
          </div>
        </Container>
        <Container className="mt-24 mb-24">
          <div className="relative text-center">
            <Image src="/images/bg-camp.png" width={570} height={180} alt="クリエイターズキャンプ" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/5 max-w-60"><Image src="/images/character.png" width={200} height={178} alt="" className="absolute top-1/2 -translate-y-1/2 right-0" /></div>
            <div className="relative"><Button href="/register"><TextShadow className={clsx(["text-3xl", reggaeOne.className])}>新規登録</TextShadow></Button></div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1/5 max-w-60"><Image src="/images/character2.png" width={200} height={150} alt="" /></div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
