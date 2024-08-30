import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";

const sponsors1 = [
    {
        id: 1,
        name: 'ツノウサギの家　白金隅',
        url: 'https://pokapoka0802.wixsite.com/tunousaginoie82',
        description: '',
    },
]

const sponsors2 = [
    {
        id:2,
        name: 'ＴＥＡＭ海の藻屑',
        url: 'http://twitter.com/umijinko404',
        description: '金曜ロードショーと、オールドゲーム好きな海産物が、ゲーム制作はじめました。',
    },
    {
        id:3,
        name: 'とらぺちぃの',
        url: '',
        description: '',
    },
    {
        id:4,
        name: '水降 恵来',
        url: 'https://www.youtube.com/channel/UCqUsAUzgTZRZToIYXm6MOFg/',
        description: '心が動くゲームと出会ったとき、『パッと世界に色が灯る』そんな感覚になったことはありませんか？ゲームを通して『私とあなたの人生が幸せに満ちたものになること』を願い、今日もゲームを実況中。スクリーン リーダーのサポートを有効にする',
    },
    {
        id:5,
        name: 'panda (werepanda.jp)',
        url: 'http://www.werepanda.jp/',
        description: 'RPGツクールで王道的なフリーゲーム制作や、単純かつ汎用的なスクリプト/プラグイン作成を行っています。◆公開中ゲーム：和風探索RPG『天下御免！からくり屋敷』／正統派王道RPG『小さな大冒険』／試行錯誤系ミニゲーム『夫婦戦争MZ』◆制作中ゲーム：王道長編RPG『王国の英雄』',
    }
]

const sponsors3 = [
    {
        id: 6,
        name: '上海ラプソディ公式　@shanhai_rap',
        url: 'http://syanrap.web.fc2.com/',
        description: 'フリーゲーム製作サークル「上海ラプソディ」の公式アカウントです。募集や広告中心のつもりです。',
    },
    {
        id: 7,
        name: 'ヒイラギ',
        url: '',
        description: '',
    },
    {
        id: 8,
        name: 'ソウ',
        url: '',
        description: '',
    },
    {
        id: 9,
        name: '龍神リウズ@ゲームクリエイター応援ch「はじまりの村」',
        url: 'https://bit.ly/3bC81d1',
        description: 'ゲーム制作未経験、初心者の方を対象としたYoutubeチャンネルを運営しています。下の?にあてはまる人はぜひチャンネル登録を！-ゲームを作ってみたい-Unityってよく分からない-エンジニアってなにするの？',
    },
    {
        id: 10,
        name: 'ジャグリングドラゴン　ヒョウガ',
        url: 'http://fine.tok2.com/home/ryuhan/hyoga/RPG_hyoga/hyo_etcgame.html',
        description: 'ジャグリングドラゴンヒョウガと申します。普段は大道芸をしているドラゴンです。ゲームも作ります。大道芸がメインなのでゲームだけじゃなくてパフォーマンスも見に来てくださいね！',
    },
    {
        id: 11,
        name: 'ヨシ-yoshi-',
        url: 'https://youtube.com/channel/UCOk6xKN1t6GKFhjXOG0gNyQ',
        description: 'ゲーム実況者です。',
    },
    {
        id: 12,
        name: '野中ソルト',
        url: '',
        description: '',
    },
    {
        id: 13,
        name: 'ソルト',
        url: 'https://note.com/salt40',
        description: 'フリーゲームの感想を書いています。あまりに広大なフリゲ界では好みの作品を探すのも大変です。なので、自分が好きなフリゲを発信して同好の士に情報を届けたいという気持ちで活動しています。',
    },
    {
        id: 14,
        name: 'ツキヤモリ',
        url: '',
        description: 'バカゲーに魂を売った男。アツマールにてゲームを投稿してます',
    },
    {
        id: 15,
        name: 'Sherlock',
        url: 'https://twitter.com/Sherloc_221b',
        description: '名探偵諸君、事件現場へようこそ。』…自作の謎解き公演に登場する、姿は女性・口調は英国グラナダTV版シャーロック・ホームズな探偵。',
    },
    {
        id: 16,
        name: 'たちやま',
        url: 'https://twitter.com/wtc_79562',
        description: 'ゲーム制作という表現手段が持つ無限の可能性を信じています！ばけねこ探偵事務所シリーズもよろしく！?',
    },
    {
        id: 17,
        name: 'ありすめぐみ/MEGUTOPIA',
        url: 'https://aricemegumiofficial.jimdofree.com/',
        description: '生々しい話と人間が好き。ツクールやティラノで制作。人様の作品への素材、技術提供も好きです。',
    },
]

const sponsors4 = [
    {
        id: 18,
        name: 'マニュオン',
        url: 'https://manuon.com/',
    },
    {
        id: 19,
        name: 'タイト',
        url: 'https://www.youtube.com/channel/UCkg-dwMUzqJmc9LzzAdrWLw',
    },
    {
        id: 20,
        name: 'あらちりょう',
        url: 'https://twitter.com/p_p_koumori',
    },
    {
        id: 21,
        name: 'しゅぴーげるアイ',
        url: 'https://twitter.com/FHGlove?t=KHMbeg8bG0T4fTk_2dnDNg&s=09',
    },
    {
        id: 22,
        name: 'アイストマトバズーカ',
        url: 'https://icedtomatobazooka.site/',
    },
    {
        id: 23,
        name: '羽島蓮奈',
        url: 'https://twitter.com/lotusabyss',
    },
    {
        id: 24,
        name: '折尾楽太郎',
        url: 'https://r-orio-rpg.halfmoon.jp/rpgmaker/main/',
    },
    {
        id: 25,
        name: '露木佑太郎',
        url: 'http://blog.livedoor.jp/ing_tdk/',
    },
    {
        id: 26,
        name: '森山秀',
        url: 'https://www.youtube.com/channel/UCPpElkrokKFPULaV6_4cQIw',
    },
    {
        id: 27,
        name: 'Murazrai',
        url: 'https://twitter.com/murazrai',
    },
    {
        id: 28,
        name: 'シキ',
        url: 'http://tokiiro11.web.fc2.com/',
    },
]

const sponsors5 = [
    {
        id: 29,
        name: 'キリサキ',
    },
    {
        id: 30,
        name: '小林先生YusakuKobayashi',
    },
    {
        id: 31,
        name: 'ごーぐる@ウディタ部の先輩',
    },
    {
        id: 32,
        name: 'ぬか漬けパリピマン',
    },
    {
        id: 33,
        name: 'スラッシャー松井',
    },
    {
        id: 34,
        name: 'やかろ',
    },
    {
        id: 35,
        name: 'ICHI',
    },
    {
        id: 36,
        name: 'sewo hayami',
    },
    {
        id: 37,
        name: 'ナイデン内田',
    },
    {
        id: 38,
        name: '落柿',
    },
    {
        id: 39,
        name: '茶川あくた',
    },
    {
        id: 40,
        name: 'ShooterZAP',
    },
    {
        id: 41,
        name: '日向日影',
    },
    {
        id: 42,
        name: '花梨',
    },
    {
        id: 43,
        name: '明田ミオ',
    },
    {
        id: 44,
        name: 'Proudust',
    },
    {
        id: 45,
        name: 'ぼとる',
    },
    {
        id: 46,
        name: '七ノ騎すがら',
    },
]
export default function SponserPage() {
    return (
        <Container>
            <div className="relative">
                <Image src="/images/bg-fv.png" className="mx-auto mb-4" alt="about" width={800} height={220} />
                <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><TextShadow className="text-3xl">スポンサーの皆様</TextShadow></h1>
            </div>
            <div className="flex justify-center">
                <Image src="/images/bow2.png" sizes="(max-width: 768px) 30vw" className="" alt="about" width={300} height={300} />
                <Image src="/images/bow.png" sizes="(max-width: 768px) 30vw" alt="about" width={200} height={300} />
            </div>
            <div className="max-w-screen-lg mx-auto mt-8">
                <p>Re-Creator’s Campはクラウドファンディングを通じて、多くの支援者様にサポート頂くことで、スタートすることができました。重ねて感謝申し上げます。</p>
                <p>紆余曲折があり、多大なご心配をおかけいたしましたが、皆様の温かい応援もあり、ようやくサービスを開始することができました。</p>
                <p>重ねて御礼申し上げます。</p>
            </div>
            <div className="max-w-screen-lg mx-auto">
                <div className="mb-4 bg-gray-100">
                    {sponsors1.map((sponsor) => (
                        <div key={sponsor.id} className="flex p-4">
                            <div className="text-center mr-4 w-40">
                                <div className="w-40 aspect-square bg-gray-200 mx-auto">画像</div>
                                <h2 className="text-main">{sponsor.name}</h2>
                            </div>
                            <div>
                                <a href={sponsor.url} className="text-blue-500 break-words">{sponsor.url}</a>
                                <p>{sponsor.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap mb-4 bg-gray-100">
                    {sponsors2.map((sponsor) => (
                        <div key={sponsor.id} className="flex p-4 w-1/2">
                            <div className="text-center mr-4 w-40 min-w-0 shrink-0">
                                <div className="w-40 aspect-square bg-gray-200 mx-auto">画像</div>
                                <h2 className="text-main">{sponsor.name}</h2>
                            </div>
                            <div className="min-w-0	">
                                <a href={sponsor.url} className="text-blue-500 break-words">{sponsor.url}</a>
                                <p>{sponsor.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap mb-4 bg-gray-100">
                    {sponsors3.map((sponsor) => (
                        <div key={sponsor.id} className="p-4 w-1/3">
                            <div className="text-center mr-4 w-40">
                                <div className="w-40 aspect-square bg-gray-200 mx-auto">画像</div>
                                <h2 className="text-main">{sponsor.name}</h2>
                            </div>
                            <div>
                                {sponsor.url && <a href={sponsor.url} className="w-full text-blue-500 break-words">{sponsor.url}</a>}
                                <p>{sponsor.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap mb-4 bg-gray-100">
                    {sponsors4.map((sponsor) => (
                        <div key={sponsor.id} className="p-4 w-1/3">
                            <div className="">
                                <h2 className="text-main">{sponsor.name}</h2>
                            </div>
                            <div>
                                <a href={sponsor.url} className="text-blue-500 break-words">{sponsor.url}</a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap mb-4 bg-gray-100">
                    {sponsors5.map((sponsor) => (
                        <div key={sponsor.id} className="p-4 w-1/3">
                            <div className="">
                                <h2 className="text-main">{sponsor.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}
