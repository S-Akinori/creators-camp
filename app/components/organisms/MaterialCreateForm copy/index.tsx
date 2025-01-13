'use client'
import Input from "@/app/components/Form/Input";
import FormControl from "@/app/components/Form/FormControl";
import Label from "@/app/components/Form/Label";
import Textarea from "@/app/components/Form/Textarea";
import Select from "@/app/components/Form/Select";
import Button from "@/app/components/atoms/Button";
import { csrf } from "@/app/lib/csrf";
import { http } from "@/app/lib/http";
import Axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Material, MaterialError } from "@/app/types/Material";
import { Category } from "@/app/types/Category";
import ErrorMessage from "@/app/components/atoms/Error";
import LoadingIcon from "@/app/components/atoms/Icons/LoadingIcons";
import Modal from "@/app/components/molecules/Modal";
import Thumbnail from "@/app/components/atoms/Thumbnail";
import { Autocomplete, Chip, IconButton, TextField, Tooltip } from "@mui/material";
import { Delete, Edit, Message } from "@mui/icons-material";
import { identifyFileTypeByExtension } from "@/app/lib/identifyFileTypeByExtension";
import { getTags, storeTag } from "@/app/lib/tag";
import { Tag } from "@/app/types/Tag";
import MaterialPreview from "../MaterialPreview";
import Container from "../../Container";
import { useFormState } from "react-dom";
import { createMaterial } from "@/app/lib/actions/createMaterial";
import { editMaterial } from "@/app/lib/actions/editMaterial";


interface ImageFile {
    file: File;
    url: string;
}

interface Props {
    categories: Category[]
    material?: Material
}

interface MaterialPreviewProps {
    name: string
    description: string
    file: File | string
    image: File | string
    images: File[]
    tags: string[]
    permission: number
    is_ai_generated: number
}

const MaterialCreateForm = ({ categories, material }: Props) => {
    const [errors, setErrors] = useState<MaterialError>({})
    const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);
    const [images, setImages] = useState<ImageFile[]>([]);
    const [thumbnail, setThumbnail] = useState<ImageFile | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);
    const [formState, setFormState] = useState<'error' | 'success' | 'submitting' | 'ready'>('ready')
    const [isNew, setIsNew] = useState<boolean>(!material)
    const [storedMaterial, setStoredMaterial] = useState<Material | null>(null)
    const [fetchedTags, setFetchedTags] = useState<Tag[]>([])
    const [tags, setTags] = useState<string[]>([]);
    const [previewMaterial, setPreviewMaterial] = useState<MaterialPreviewProps | null>(null);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [materialFormData, setMaterialFormData] = useState<FormData>(new FormData());
    const [uploadProgress, setUploadProgress] = useState(0);

    const formRef = useRef<HTMLFormElement | null>(null);

    const initialState = {
        errors: {},
        message: null,
    }

    const [state, disPatch] = useFormState(material ? editMaterial : createMaterial, initialState)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        const targetName = event.target.name;
        if (file) {
            if(targetName === 'file') {
                if (file.type.startsWith('image/')) {
                    setFileType('image');
                } else if (file.type.startsWith('video/')) {
                    setFileType('video');
                } else if (file.type.startsWith('audio/')) {
                    setFileType('audio');
                } else {
                    setFileType(null);
                }
            }
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                const result = loadEvent.target?.result;
                if (event.target.name === 'file') {
                    setPreviewFileUrl(result as string);
                } else if (event.target.name === 'image') {
                    const url = URL.createObjectURL(file);
                    setThumbnail({ file, url });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setImages([...images, { file, url }]);
        }
    };

    const handleDelete = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handlePreview = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (formRef.current) {
            const formData = new FormData(formRef.current); // FormDataで取得
            images.forEach((image, index) => {
                formData.append(`images[]`, image.file);
            });
            tags.forEach((tag) => {
                formData.append('tags[]', tag);
            });
            disPatch(formData)
            formData.delete('tags[]')
            if (!Object.keys(state.errors).length) {
                const obj = formDataToObject(formData) as MaterialPreviewProps;
                obj.tags = tags
                setMaterialFormData(formData);
                setPreviewMaterial(obj);
                setPreviewOpen(true);
            }
        }
    }

    const store = async () => {
        await csrf();
        setFormState('submitting');
        setPreviewOpen(false);

        try {
            const tagIds = await Promise.all(tags.map(async (tag) => {
                const res = await storeTag(tag);
                return res.id;
            }));
            tagIds.forEach((tagId) => {
                materialFormData.append('tags[]', tagId.toString());
            });
            console.log(materialFormData.getAll('tags[]'))

            if (isNew) {
                const res = await http.post('/materials', materialFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total!
                        );
                        setUploadProgress(percentCompleted);
                    },
                });
                const data = res.data as Material;
                setStoredMaterial(data);
            } else {
                const res = await http.post(`/materials/${material?.id}`, materialFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-HTTP-Method-Override': 'PUT'
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total!
                        );
                        setUploadProgress(percentCompleted);
                    },
                });
            }
            setFormState('success');
        } catch (e) {
            if (Axios.isAxiosError(e) && e.response) {
                const data = e.response.data
                setErrors(data.errors);
            }
            setFormState('error');
            setTimeout(() => {
                setFormState('ready');
            }, 3000);
        };
    }

    const formDataToObject = (formData: FormData) => {
        const object: { [key: string]: any } = {};

        formData.forEach((value, key) => {
            // Keyが `[]` で終わっている場合、配列として扱う
            if (key.endsWith('[]')) {
                const cleanKey = key.slice(0, -2); // `[]` を削除
                if (!object[cleanKey]) {
                    object[cleanKey] = [];
                }
                object[cleanKey].push(value);
            } else {
                if (object[key]) {
                    if (Array.isArray(object[key])) {
                        object[key].push(value);
                    } else {
                        object[key] = [object[key], value];
                    }
                } else {
                    object[key] = value;
                }
            }
        });

        return object;
    }

    useEffect(() => {
        const setData = async (material: Material) => {
            const res = await http.get(`/materials/${material.id}/download`, {
                responseType: 'blob'
            });
            const blob = new Blob([res.data], { type: res.data.type });
            const url = URL.createObjectURL(blob)
            setPreviewFileUrl(url)
            const type = identifyFileTypeByExtension(material.file);
            setFileType(type);
            const imageRes = await fetch('/images/dummy.png');
            const imageBlob = await imageRes.blob();

            setThumbnail({ file: new File([imageBlob], 'thumbnail.png', { type: 'image/png' }), url: material.image });

            setImages(material.images.map((image) => {
                const lastSlashIndex = image.lastIndexOf('/');
                const fileName = image.substring(lastSlashIndex + 1);
                return { file: new File([imageBlob], fileName, { type: 'image/png' }), url: image }
            }));
        }
        const fetchTags = async () => {
            const data = await getTags();
            // const tagNames = material?.tags.map((tag) => tag.name);
            setFetchedTags(data);
        }

        if (material) {
            setData(material);
            setTags(material.tags.map((tag) => tag.name));
        }
        fetchTags();
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: string[]) => {
        setTags(newValue);
    };

    return (
        <>
            <Modal open={formState == 'success' || formState == 'submitting'} setOpen={(open) => setFormState(open ? 'success' : 'ready')}>
                {(uploadProgress >= 0 && uploadProgress < 100 )&& (
                    <div>
                        <p>アップロード進捗: {uploadProgress}%</p>
                        <progress value={uploadProgress} max="100">{uploadProgress}%</progress>
                    </div>
                )}
                {(uploadProgress === 100) && (
                    <div className="text-center">
                        <p className="text-2xl font-bold mb-4">アップロード完了</p>
                        {isNew && (
                            <div>
                                <Button className="mx-4 mb-4"><a href='/user/material/create'>続けて素材をアップする</a></Button>
                                <Button className="mx-4 block" href={'/materials/' + storedMaterial?.id}>アップした素材を見る</Button>
                            </div>
                        )}
                        {!isNew && (
                            <div>
                                <Button className="mx-4 block" href={'/materials/' + material?.id}>アップした素材を見る</Button>
                                <Button className="mx-4 block" href={'/user'}>マイページへ</Button>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
            {(previewMaterial && thumbnail && previewOpen) && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex flex-col justify-center'>
                    <div className="overflow-y-scroll h-4/5">
                        <Container>
                            <div className="flex items-start bg-white max-w-5xl mx-auto">
                                <div className="border-2 w-3/4">
                                    <MaterialPreview material={previewMaterial} images={images} thumbnail={thumbnail} />
                                </div>
                                <div className="mt-4 p-4 mx-auto justify-center bg-white max-w-max w-1/4">
                                    <p className="text-center mb-4">保存しますか？</p>
                                    <div className="mb-4 text-center">
                                        <Button className="" onClick={() => store()} disabled={formState !== 'ready'}>
                                            {formState === 'ready' && '保存する'}
                                            {formState === 'submitting' && <LoadingIcon />}
                                            {formState === 'error' && 'エラーが発生しました'}
                                            {formState === 'success' && '更新しました'}
                                        </Button>
                                    </div>
                                    <div className="text-center">
                                        <Button color="main-cont" onClick={() => setPreviewOpen(false)} disabled={formState !== 'ready'}>修正する</Button>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            )}
            <div className="p-4 mt-8 mx-auto max-w-2xl bg-white shadow">
                <form action={store} ref={formRef}>
                    <FormControl flex={false}>
                        <Label htmlFor="file" className="shrink-0 mr-4">素材 *</Label>
                        <Input id="file" type="file" name="file" className="w-full" onChange={handleFileChange} />
                        <span>※複数素材をアップするにはzipファイルでアップしてください</span>
                        {state.errors?.file && <ErrorMessage message={state.errors.file[0]} />}
                        {(fileType == 'image' && previewFileUrl) && (
                            <div className="mt-4">
                                <Thumbnail src={previewFileUrl} />
                            </div>
                        )}
                        {(fileType == 'video' && previewFileUrl) && (
                            <video className="w-full aspect-video mt-4" src={previewFileUrl} controls />
                        )}
                        {(fileType == 'audio' && previewFileUrl) && (
                            <audio className="w-full mt-4" src={previewFileUrl} controls />
                        )}
                    </FormControl>
                    <FormControl flex={false}>
                        <Label htmlFor="name" className="shrink-0 mr-4">タイトル *</Label>
                        <Input id="name" type="text" name="name" className="w-full" defaultValue={material?.name} />
                        {state.errors?.name && <ErrorMessage message={state.errors.name[0]} />}
                    </FormControl>
                    <FormControl flex={false}>
                        <Label htmlFor="description" className="shrink-0 mr-4">説明 *</Label>
                        <Textarea id="description" rows={5} name="description" className="w-full" defaultValue={material?.description} />
                        {state.errors?.description && <ErrorMessage message={state.errors.description[0]} />}
                    </FormControl>
                    <FormControl flex={false}>
                        <Label htmlFor="image" className="shrink-0 mr-4">サムネイル *</Label>
                        <Input id="image" type="file" name="image" className="w-full" onChange={handleFileChange} accept="image/png, image/jpeg" />
                        {state.errors?.image && <ErrorMessage message={state.errors.image[0]} />}
                        {thumbnail?.url && (
                            <div className="mt-4">
                                <Thumbnail src={thumbnail?.url} />
                            </div>
                        )}
                    </FormControl>
                    <FormControl flex={false}>
                        <Label className="shrink-0 mr-4">その他画像</Label>
                        {state.errors?.images && <ErrorMessage message={state.errors.images[0]} />}
                        <div className="flex items-start flex-wrap">
                            {images.map((image, index) => (
                                <div key={index} className="relative mb-4 p-2 w-1/3">
                                    <Thumbnail src={image.url} />
                                    <div className="w-full flex items-center justify-center">
                                        <Tooltip title='削除'>
                                            <IconButton onClick={() => handleDelete(index)}><Delete /></IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="block mb-4 w-1/3 aspect-video bg-gray-200">
                                <label htmlFor={`images`} className="flex items-center justify-center w-full h-full cursor-pointer">画像を追加</label>
                                <Input id={`images`} type="file" className="w-full" onChange={handleImageChange} hidden accept="image/png, image/jpeg" />
                            </button>
                        </div>
                    </FormControl>
                    <FormControl flex={false}>
                        <Label htmlFor="category_id" className="shrink-0 mr-4">カテゴリー</Label>
                        <Select id="category_id" name="category_id" className="w-full" defaultValue={material?.category_id}>
                            {categories && categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </Select>
                        {state.errors?.category_id && <ErrorMessage message={state.errors.category_id[0]} />}
                    </FormControl>
                    <FormControl flex={false}>
                        <Label htmlFor="permission" className="shrink-0 mr-4">承認の有無</Label>
                        <Select id="permission" name="permission" className="w-full" defaultValue={material?.permission}>
                            <option value="1">承認を必要にする</option>
                            <option value="0">承認を必要にしない</option>
                        </Select>
                        {state.errors?.permission && <ErrorMessage message={state.errors.permission[0]} />}
                    </FormControl>
                    <FormControl flex={false}>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={fetchedTags.map((tag) => tag.name)}
                            freeSolo
                            value={tags}
                            onChange={handleChange}
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => {
                                    const { key, ...tagProps } = getTagProps({ index });
                                    return (
                                        <Chip variant="outlined" label={option} key={key} {...tagProps} />
                                    );
                                })
                            }
                            renderInput={(params) => (
                                <>
                                    <Label>タグ</Label>
                                    <TextField
                                        {...params}
                                        variant="filled"
                                        className="border-main border-2 !bg-white rounded"
                                    />
                                </>
                            )}
                        />
                    </FormControl>
                    <FormControl flex={false}>
                        <Label htmlFor="is_ai_generated" className="shrink-0 mr-4">AIの利用</Label>
                        <Select id="is_ai_generated" name="is_ai_generated" className="w-full" defaultValue={material?.is_ai_generated}>
                            <option value="1">利用している</option>
                            <option value="0">利用していない</option>
                        </Select>
                        {state.errors?.is_ai_generated && <ErrorMessage message={state.errors.is_ai_generated[0]} />}
                    </FormControl>
                </form>
                <div className="text-center mt-8">
                    <Button className="py-4 px-16 mx-4" type="button" disabled={formState == 'submitting'} onClick={handlePreview}>プレビュー確認</Button>
                    <Button className="py-4 px-16 mx-4" type="button" disabled={formState == 'submitting'} onClick={handlePreview}>保存</Button>
                </div>
            </div>
        </>
    );
};

export default MaterialCreateForm;