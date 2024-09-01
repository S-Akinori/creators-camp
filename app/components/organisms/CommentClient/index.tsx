'use client'
import { Comment } from "@/app/types/Comment";
import TextShadow from "../../TextShadow";
import { Pagination } from "@/app/types/Material";
import UserCard from "../UserCard";
import { toDateString } from "@/app/lib/functions/toDateString";
import CommentForm from "../CommentForm";
import Button from "../../atoms/Button";
import { User } from "@/app/types/User";
import { useState } from "react";
import ReportButton from "../ReportButton";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

interface Props {
    comments: Pagination<Comment>
    user: User | null
    materialId: number | string
}

const CommentClient = ({comments, user, materialId}: Props) => {
    const [newComments, setNewComments] = useState<Comment[]>(comments.data)

    return (
        <>
            <div className="mt-16">
                <h2 className="mb-4">
                    <TextShadow className="text-xl mb-4">この素材のコメント</TextShadow>
                </h2>
                {newComments.length == 0 && <p className="text-center">コメントはまだありません</p>}
                {newComments.length > 0 && newComments.map((comment) => (
                    <div key={comment.id} className="bg-white border-b border-main p-4 mt-4 relative">
                        <div className="">
                            <div className="mb-4">
                                <UserCard user={comment.user} />
                                <p>{toDateString(comment.created_at)}</p>
                            </div>
                            {(user && user.status === 'active') && (
                                <div className="absolute top-4 right-4">
                                    <ReportButton id={comment.id} style={{padding: '.25rem', display: 'flex'}} type="comment"><ReportProblemIcon className="w-4 h-4" /></ReportButton>
                                </div>
                            )}
                        </div>
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>
            <div className="mt-16">
                {(user && user.status === 'active') && (
                    <div>
                        <h2 className="mb-4">
                            <TextShadow className="text-xl">コメントを投稿する</TextShadow>
                        </h2>
                        <CommentForm materialId={materialId} comments={newComments} setComments={setNewComments} />
                    </div>
                )}
            </div>
        </>
    )
}

export default CommentClient;