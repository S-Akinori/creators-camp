import Image from "next/image";
import TextShadow from "./components/TextShadow";
import FV from "./components/FV";
import ArrowButton from "./components/Button/ArrowButton";
import Title from "./components/Title";
import Container from "./components/Container";
import Button from "./components/Button";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex justify-end mt-8">
        <Link href="/" className="mx-2"><Image src="/images/news.png" width={212} height={85} alt="twitter" /></Link>
        <Link href="/" className="mx-2"><Image src="/images/search.png" width={212} height={85} alt="twitter" /></Link>
        <Link href="/" className="mx-2"><Image src="/images/post.png" width={212} height={85} alt="twitter" /></Link>
      </div>
      <main className="min-h-screen">
        <FV />
        <div className="bg-gray-400 mb-8">
          <div className="flex flex-wrap justify-center max-w-4xl mx-auto">
            <div className="w-1/2 md:w-1/4"><ArrowButton className="w-full"><TextShadow className=" md:text-xl">クリエイター</TextShadow></ArrowButton></div>
            <div className="w-1/2 md:w-1/4"><ArrowButton className="w-full"><TextShadow className=" md:text-xl">ミュージック</TextShadow></ArrowButton></div>
            <div className="w-1/2 md:w-1/4"><ArrowButton className="w-full"><TextShadow className=" md:text-xl">イラスト</TextShadow></ArrowButton></div>
            <div className="w-1/2 md:w-1/4"><ArrowButton className="w-full"><TextShadow className=" md:text-xl">プラグイン</TextShadow></ArrowButton></div>
          </div>
        </div>
        <Container className="flex justify-center">
          <div className="mx-4">
            <Image src="/images/banner.png" width={500} height={161} alt="" />
          </div>
          <div className="mx-4">
            <Image src="/images/banner.png" width={500} height={161} alt="" />
          </div>
        </Container>
        <Container>
          <div className="absolute left-0 -top-4 z-[-1] aspect-[6/1] w-full"><Image src="/images/flag.png" fill alt="" /></div>
          <Title>ジャンル一覧</Title>
          <div className="max-w-2xl flex justify-center flex-wrap mx-auto">
            <div className="w-1/3 md:w-1/5 p-4 mb-4"><Image className="mx-auto" src="/images/tool.png" width={110} height={165} alt="" /></div>
            <div className="w-1/3 md:w-1/5 p-4 mb-4"><Image className="mx-auto" src="/images/plugin.png" width={110} height={165} alt="" /></div>
            <div className="w-1/3 md:w-1/5 p-4 mb-4"><Image className="mx-auto" src="/images/bgm.png" width={110} height={165} alt="" /></div>
            <div className="w-1/3 md:w-1/5 p-4 mb-4"><Image className="mx-auto" src="/images/se.png" width={110} height={165} alt="" /></div>
            <div className="w-1/3 md:w-1/5 p-4 mb-4"><Image className="mx-auto" src="/images/voice.png" width={110} height={165} alt="" /></div>
            <div className="w-1/3 md:w-1/5 p-4 mb-4"><Image className="mx-auto" src="/images/picture.png" width={110} height={165} alt="" /></div>
            <div className="w-1/3 md:w-1/5 p-4 mb-4"><Image className="mx-auto" src="/images/dot.png" width={110} height={165} alt="" /></div>
            <div className="w-1/3 md:w-1/5 p-4 mb-4"><Image className="mx-auto" src="/images/map.png" width={110} height={165} alt="" /></div>
            <div className="w-1/3 md:w-1/5 p-4 mb-4"><Image className="mx-auto" src="/images/ui.png" width={110} height={165} alt="" /></div>
            <div className="w-1/3 md:w-1/5 p-4 mb-4"><Image className="mx-auto" src="/images/background.png" width={110} height={165} alt="" /></div>
          </div>
        </Container>
        <Container>
          <div className="absolute left-0 -top-4 z-[-1] aspect-[6/1] w-full"><Image src="/images/flag.png" fill alt="" /></div>
          <Title>素材一覧</Title>
          <div className="flex justify-center flex-wrap">
            <div className="w-1/2 md:w-1/4 p-4 mb-4"><Link href='/materials/1'><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></Link></div>
            <div className="w-1/2 md:w-1/4 p-4 mb-4"><Link href='/materials/1'><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></Link></div>
            <div className="w-1/2 md:w-1/4 p-4 mb-4"><Link href='/materials/1'><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></Link></div>
            <div className="w-1/2 md:w-1/4 p-4 mb-4"><Link href='/materials/1'><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></Link></div>
            <div className="w-1/2 md:w-1/4 p-4 mb-4"><Link href='/materials/1'><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></Link></div>
            <div className="w-1/2 md:w-1/4 p-4 mb-4"><Link href='/materials/1'><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></Link></div>
            <div className="w-1/2 md:w-1/4 p-4 mb-4"><Link href='/materials/1'><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></Link></div>
            <div className="w-1/2 md:w-1/4 p-4 mb-4"><Link href='/materials/1'><Image className="mx-auto" src="/images/material.png" width={180} height={264} alt="" /></Link></div>
          </div>
        </Container>
        <Container>
          <div className="absolute left-0 -top-4 z-[-1] aspect-[6/1] w-full"><Image src="/images/flag.png" fill alt="" /></div>
          <Title>ランキング一覧</Title>
          <div className="mb-8">
            <div className="relative">
              <Image src='/images/icon-plugin.png' width={50} height={50} alt='ランキング' className="absolute left-0 top-0" />
              <p className="relative pl-4"><TextShadow className=" md:text-2xl" color="accent" align="left">プラグインいいねランキング</TextShadow></p>
            </div>
            <div className="flex flex-wrap">
              <div className="p-4 w-1/2 md:w-1/4"><div className="bg-white border-4 border-gray-500 aspect-[2/3]"></div></div>
              <div className="p-4 w-1/2 md:w-1/4"><div className="bg-white border-4 border-gray-500 aspect-[2/3]"></div></div>
              <div className="p-4 w-1/2 md:w-1/4"><div className="bg-white border-4 border-gray-500 aspect-[2/3]"></div></div>
              <div className="p-4 w-1/2 md:w-1/4"><div className="bg-white border-4 border-gray-500 aspect-[2/3]"></div></div>
            </div>
          </div>
          <div className="mb-8">
            <div className="relative">
              <Image src='/images/icon-bgm.png' width={50} height={50} alt='ランキング' className="absolute left-0 top-0" />
              <p className="relative pl-4"><TextShadow className=" md:text-2xl" color="accent" align="left">ミュージックいいねランキング</TextShadow></p>
            </div>
            <div className="flex flex-wrap">
              <div className="p-4 w-1/2 md:w-1/4"><div className="bg-white border-4 border-gray-500 aspect-[2/3]"></div></div>
              <div className="p-4 w-1/2 md:w-1/4"><div className="bg-white border-4 border-gray-500 aspect-[2/3]"></div></div>
              <div className="p-4 w-1/2 md:w-1/4"><div className="bg-white border-4 border-gray-500 aspect-[2/3]"></div></div>
              <div className="p-4 w-1/2 md:w-1/4"><div className="bg-white border-4 border-gray-500 aspect-[2/3]"></div></div>
            </div>
          </div>
          <div className="mb-8">
            <div className="relative">
              <Image src='/images/icon-picture.png' width={50} height={50} alt='ランキング' className="absolute left-0 top-0" />
              <p className="relative pl-4"><TextShadow className=" md:text-2xl" color="accent" align="left">イラストいいねランキング</TextShadow></p>
            </div>
            <div className="flex flex-wrap">
              <div className="p-4 w-1/2 md:w-1/4"><div className="bg-white border-4 border-gray-500 aspect-[2/3]"></div></div>
              <div className="p-4 w-1/2 md:w-1/4"><div className="bg-white border-4 border-gray-500 aspect-[2/3]"></div></div>
              <div className="p-4 w-1/2 md:w-1/4"><div className="bg-white border-4 border-gray-500 aspect-[2/3]"></div></div>
              <div className="p-4 w-1/2 md:w-1/4"><div className="bg-white border-4 border-gray-500 aspect-[2/3]"></div></div>
            </div>
          </div>
        </Container>
        <Container className="mt-24 mb-24">
          <div className="relative text-center">
            <Image src="/images/bg-camp.png" width={570} height={180} alt="クリエイターズキャンプ" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/5 aspect-[2/3]"><Image src="/images/character_RECY_01.png" width={200} height={150} alt="" className="absolute top-1/2 -translate-y-1/2 right-0" /></div>
            <div className="relative"><Button><TextShadow className="text-3xl">新規登録</TextShadow></Button></div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1/5 aspect-square"><Image src="/images/character_CLE_01.png" fill alt="" /></div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
