import Link from "next/link"
import LogoutButton from "../organisms/LogoutButton"

export const AdminMenu = () => {
    return (
        <div className="fixed top-0 left-0 p-4 w-54 h-screen bg-white">
            <nav className="">
                <ul className="">
                    <li className="mb-4 pb-2 border-b border-main"><Link href='/admin/news'>お知らせ</Link></li>
                    <li className="mb-4 pb-2 border-b border-main"><Link href='/admin/users'>ユーザー</Link></li>
                    <li className="mb-4 pb-2 border-b border-main"><Link href='/admin/materials'>素材</Link></li>
                    <li className="mb-4 pb-2 border-b border-main"><Link href='/admin/comments'>コメント</Link></li>
                    <li className="mb-4 pb-2 border-b border-main"><Link href='/admin/categories'>カテゴリー</Link></li>
                    <li className="mb-4 pb-2 border-b border-main"><Link href='/admin/settings'>管理者設定</Link></li>
                </ul>
            </nav>
            <LogoutButton />
        </div>
    )
}

export default AdminMenu