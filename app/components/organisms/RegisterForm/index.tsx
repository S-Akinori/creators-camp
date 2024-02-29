import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import Input from "@/app/components/Form/Input";
import Label from "@/app/components/Form/Label";
import Button from "@/app/components/atoms/Button";

const RegisterForm = () => {
    const createUser = async (formData: FormData) => {
        'use server'

        const rawFormData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
        }

        try {
            const res = await fetch(process.env.API_URL + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rawFormData),

            })
            const json = await res.json()
            console.log(json.data)
        } catch {
            console.log('error')
        }
    }

    return (
        <Container>
            <h1><TextShadow className="text-xl">登録</TextShadow></h1>
            <div className="max-w-sm mx-auto mt-8">
                <form action={createUser}>
                    <div className="md:flex justify-center items-center mb-4">
                        <Label htmlFor="name" className="mr-4 w-28 shrink-0">名前</Label>
                        <Input id="name" name="name" className="w-full" />
                    </div>
                    <div className="md:flex justify-center items-center mb-4">
                        <Label htmlFor="email" className="mr-4 w-28 shrink-0">メールアドレス</Label>
                        <Input id="email" name="email" className="w-full" />
                    </div>
                    <div className="md:flex justify-center items-center">
                        <Label htmlFor="passward" className="mr-4 w-28 shrink-0">パスワード</Label>
                        <Input id="passward" name="password" type="password" className="w-full" />
                    </div>
                    <div className="text-center mt-8">
                        <Button className="py-4 px-16">ユーザー登録</Button>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default RegisterForm