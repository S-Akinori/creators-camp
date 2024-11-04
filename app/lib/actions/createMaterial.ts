"use server"
import { z } from 'zod'

import { MaterialError } from "@/app/types/Material";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const MAX_FILE_SIZE = 500; // 500MB
const MAX_IMAGE_SIZE = 5; // 5MB
const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
    const result = sizeInBytes / (1024 * 1024);
    console.log(+result.toFixed(decimalsNum))
    return +result.toFixed(decimalsNum);
  };

const schema = z.object({
    name: z.string({invalid_type_error: "文字列で入力してください"}).min(1, {message: "入力してください"}).max(50, {message: "50文字以内で入力してください"}),
    description: z.string({invalid_type_error: "文字列で入力してください"}).min(1, {message: "入力してください"}).max(1000, {message: "1000文字以内で入力してください"}),
    category_id: z.number(),
    permission: z.number(),
    file: z.custom<File>()
    // 必須にしたい場合
    .refine((file) => file.size !== 0, { message: '必須です' })
    // // このあとのrefine()で扱いやすくするために整形
    // .transform((file) => file[0])
     // ファイルサイズを制限したい場合
    .refine((file) => sizeInMB(file.size) <= MAX_FILE_SIZE, { message: `ファイルサイズは最大${MAX_FILE_SIZE}MBです`}),
    image: z.custom<File>()
    .refine((file) => file.size !== 0, { message: '必須です' })
    .refine((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE, { message: `ファイルサイズは最大${MAX_IMAGE_SIZE}MBです`})
    .refine((file) => IMAGE_TYPES.includes(file.type), {
        message: 'JPGもしくはPNG形式の画像を選択してください',
      }),
    images: z.array(z.custom<File>())
    .refine((files) => files.every((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE), { message: `ファイルサイズは最大${MAX_IMAGE_SIZE}MBです`})
    .refine((files) => files.every((file) => IMAGE_TYPES.includes(file.type)), {
        message: 'JPGもしくはPNG形式の画像を選択してください',
      }),
    tag: z.array(z.string()).optional(),
    is_ai_generated: z.number(),
})

type Schema = z.infer<typeof schema>

type State = {
    errors: MaterialError
    values?: {
        name: string
        description: string
        category_id: number
        permission: number
        file: File
        image: File
        images: File[]
        tag: string
        is_ai_generated: number
    }
    message: string | null;
};

export const createMaterial = async (
    prevState: State,
    formData: FormData
): Promise<State> => {
    // ユーザースキーマによるバリデーション
    const validatedFields = schema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        category_id: Number(formData.get("category_id")),
        permission: Number(formData.get("permission")),
        file: formData.get("file"),
        image: formData.get("image"),
        images: formData.getAll("images[]"),
        tag: formData.getAll("tags[]"),
        is_ai_generated: Number(formData.get("is_ai_generated")),
    });

    // バリデーションに失敗した場合はエラーメッセージを次の状態として返す
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "エラーが発生しました",
        };
    }

    try {
        // ユーザーを作成する処理
        console.log(validatedFields.data);
    } catch (error) {
        return {
            errors: {},
            message: "Database Error: Failed to Create User",
        };
    }

    return {
        errors: {},
        message: "プレビューを表示します",
    };
}
