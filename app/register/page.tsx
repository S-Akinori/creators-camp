import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/Button";

export default function RegisterPage() {
  return (
    <main className="min-h-screen">
        <Container>
            <h1><TextShadow className="text-xl">登録</TextShadow></h1>
            <div className="max-w-sm mx-auto mt-8">
              <form action="">
                <div className="md:flex justify-center items-center mb-4">
                  <Label htmlFor="email" className="mr-4 w-28 shrink-0">メールアドレス</Label>
                  <Input id="email" className="w-full" />
                </div>
                <div className="md:flex justify-center items-center">
                  <Label htmlFor="passward" className="mr-4 w-28 shrink-0">パスワード</Label>
                  <Input id="passward" type="password" className="w-full" />
                </div>
                <div className="text-center mt-8">
                  <Button className="py-4 px-16">ユーザー登録</Button>
                </div>
              </form>
            </div>
        </Container>
    </main>
  );
}
