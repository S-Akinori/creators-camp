import Link from "next/link"

export const AdminMenu = () => {
    return (
        <div className="fixed top-0 left-0 p-4 w-40 h-screen bg-white">
            <nav className="">
                <ul className="">
                    <li className="mb-4 pb-2 border-b border-main"><Link href='/admin/news'>お知らせ</Link></li>
                    {/* <li className="mb-4 pb-2 border-b border-main"><Link href=''>ユーザー</Link></li>
                    <li className="mb-4 pb-2 border-b border-main"><Link href=''>素材</Link></li>
                    <li className="mb-4 pb-2 border-b border-main"><Link href=''>カテゴリー</Link></li> */}
                </ul>
            </nav>
        </div>
    )
}

export default AdminMenu