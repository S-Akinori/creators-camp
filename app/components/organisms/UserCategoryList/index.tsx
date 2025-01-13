import { Category } from "@/app/types/Category";
import Button from "../../atoms/Button";

const roles = [
    'ゲームプランナー',
    'ゲームデザイナー',
    'イラストレーター',
    'グラフィッカー',
    'サウンドクリエイター',
    'シナリオライター',
    'テスター',
    'プログラマー',
    '声優',
    'その他クリエイター'
];

interface Props {
    roleParam?: string
}

export const UserCategoryList = ({roleParam}: Props) => {
    return (
        <div className="flex flex-wrap items-center">
            <div className="p-2 w-1/2 md:w-1/5">
                <Button href='users' className="w-full py-2 !px-2 block text-center" scroll={false} color={!roleParam ? 'main' : 'main-cont'}>
                    すべて
                </Button>
            </div>
            {roles.map((role, index) => (
                <div key={index} className="p-2 w-1/2 md:w-1/5">
                    <Button href={`/users?role=${role}`} scroll={false} className="w-full py-2 !px-2 block text-center" color={role === roleParam ? 'main' : 'main-cont'}>
                        {role}
                    </Button>
                </div>
            ))}
        </div>
    );
}
export default UserCategoryList;