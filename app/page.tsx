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
import useMaterial from "./lib/hooks/useMaterial";
import UserCard from "./components/organisms/UserCard";
import MaterialCard from "./components/organisms/MaterialCard";
import { getCategoryMaterials, getMaterials } from "./lib/material";
import { getCategories, getCategory } from "./lib/category";
import clsx from "clsx";
import { reggaeOne } from "./fonts";
import { ThumbUpOffAlt } from "@mui/icons-material";
import DownloadIcon from '@mui/icons-material/Download';
import MaterialListClient from "./components/organisms/MaterialListClient";
import NewsList from "./components/organisms/NewsList";

export default async function Home() {
  // const materialsPagination = await getMaterials()
  const pluginsData = await getCategory(2)
  const musicsData = await getCategory(3)
  const illustrationsData = await getCategory(6)
  const categories = await getCategories();
  return (
    <>
      <Header />
      <div className="flex justify-end mt-8">
        <Link href="/news" className="mx-2"><Image src="/images/news.png" width={212} height={85} alt="twitter" /></Link>
        <Link href="/materials" className="mx-2"><Image src="/images/search.png" width={212} height={85} alt="twitter" /></Link>
        <Link href="/user/material/create" className="mx-2"><Image src="/images/post.png" width={212} height={85} alt="twitter" /></Link>
      </div>
      <main className="min-h-screen">
        <FV />
        <div className="mb-8">
          <div className={clsx(["flex flex-wrap justify-center max-w-5xl mx-auto", reggaeOne.className])}>
            <div className="w-1/2 md:w-1/4"><ArrowButton className="w-full" href="/users"><TextShadow className=" md:text-xl">クリエイター</TextShadow></ArrowButton></div>
            <div className="w-1/2 md:w-1/4"><ArrowButton className="w-full" href="/materials?category_id=3"><TextShadow className=" md:text-xl">ミュージック</TextShadow></ArrowButton></div>
            <div className="w-1/2 md:w-1/4"><ArrowButton className="w-full" href="/materials?category_id=6"><TextShadow className=" md:text-xl">イラスト</TextShadow></ArrowButton></div>
            <div className="w-1/2 md:w-1/4"><ArrowButton className="w-full" href="/materials?category_id=2"><TextShadow className=" md:text-xl">プラグイン</TextShadow></ArrowButton></div>
          </div>
        </div>
        <Container className="flex justify-center mb-12">
          <div className="mx-4">
            <Image src="/images/banner.png" width={500} height={161} alt="" />
          </div>
          <div className="mx-4">
            <Image src="/images/banner.png" width={500} height={161} alt="" />
          </div>
        </Container>
        <Container className="mb-12">
          <div className="max-w-5xl mx-auto">
            <Title className="mb-4">お知らせ</Title>
            <NewsList />
          </div>
        </Container>
        <Container>
          <div className="absolute left-0 -top-4 z-[-1] aspect-[6/1] w-full"><Image src="/images/flag.png" fill alt="" /></div>
          <Title>ジャンル一覧</Title>
          <div className="max-w-5xl flex justify-center flex-wrap mx-auto">
            {categories?.map((category) => (
              <div key={category.id} className="w-1/3 md:w-1/5 p-4 mb-4">
                <Link href={`materials?category_id=${category.id}`}>
                  <Image src={`/images/${category.slug}.png`} width={220} height={330} alt={category.name} />
                </Link>
              </div>
            ))}
          </div>
        </Container>
        <Container className="mb-12">
          <div className="absolute left-0 -top-4 z-[-1] aspect-[6/1] w-full"><Image src="/images/flag.png" fill alt="" /></div>
          <Title className="mb-8">素材一覧</Title>
          <MaterialListClient />
          <div className="text-right">
            <Link href={'/materials'} className="bg-gray-400 py-2 px-20 text-white">素材をもっと見る →</Link>
          </div>
        </Container>
        <Container className="mb-12">
          <div className="absolute left-0 -top-4 z-[-1] aspect-[6/1] w-full"><Image src="/images/flag.png" fill alt="" /></div>
          <Title className="mb-4">ランキング一覧</Title>
          <div className="mb-8">
            <div className="relative mb-4">
              <Image src='/images/icon-plugin.png' width={50} height={50} alt='ランキング' className="absolute left-0 top-0" />
              <p className="relative pl-4"><TextShadow className=" md:text-2xl" color="accent" align="left">プラグインいいねランキング</TextShadow></p>
            </div>
            <MaterialListClient categoryId={2} />
            <div className="text-right">
              <Link href={'/materials?category_id=' + pluginsData.category.id} className="bg-gray-400 py-2 px-20 text-white">プラグイン素材を見る →</Link>
            </div>
          </div>
          <div className="mb-8">
            <div className="relative mb-4">
              <Image src='/images/icon-bgm.png' width={50} height={50} alt='ランキング' className="absolute left-0 top-0" />
              <p className="relative pl-4"><TextShadow className=" md:text-2xl" color="accent" align="left">BGMいいねランキング</TextShadow></p>
            </div>
            <MaterialListClient categoryId={3} />
            <div className="text-right">
              <Link href={'/materials?category_id=' + musicsData.category.id} className="bg-gray-400 py-2 px-20 text-white">BGM素材を見る →</Link>
            </div>
          </div>
          <div className="mb-8">
            <div className="relative mb-4">
              <Image src='/images/icon-picture.png' width={50} height={50} alt='ランキング' className="absolute left-0 top-0" />
              <p className="relative pl-4"><TextShadow className=" md:text-2xl" color="accent" align="left">立ち絵いいねランキング</TextShadow></p>
            </div>
            <MaterialListClient categoryId={6} />
            <div className="text-right">
              <Link href={'/materials?category_id=' + illustrationsData.category.id} className="bg-gray-400 py-2 px-20 text-white">立ち絵素材を見る →</Link>
            </div>
          </div>
        </Container>
        <Container className="mt-24 mb-24">
          <div className="relative text-center">
            <Image src="/images/bg-camp.png" width={570} height={180} alt="クリエイターズキャンプ" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/5 max-w-60 aspect-[2/3]"><Image src="/images/character_RECY_01.png" width={200} height={150} alt="" className="absolute top-1/2 -translate-y-1/2 right-0" /></div>
            <div className="relative"><Button href="/register"><TextShadow className={clsx(["text-3xl", reggaeOne.className])}>新規登録</TextShadow></Button></div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1/5 max-w-60 aspect-square"><Image src="/images/character_CLE_01.png" fill alt="" /></div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
