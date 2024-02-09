'use client'

import Image from "next/image";
import Container from "../components/Container";
import TextShadow from "../components/TextShadow";
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Button from "../components/Button";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/user");
  };
  return (
    <main className="min-h-screen">
        <Container>
            <h1><TextShadow className="text-xl">ログイン</TextShadow></h1>
            <div className="max-w-sm mx-auto mt-8">
              <form onSubmit={onSubmit}>
                <div className="md:flex justify-center items-center mb-4">
                  <Label htmlFor="email" className="mr-4 w-28 shrink-0">メールアドレス</Label>
                  <Input id="email" className="w-full" />
                </div>
                <div className="md:flex justify-center items-center">
                  <Label htmlFor="passward" className="mr-4 w-28 shrink-0">パスワード</Label>
                  <Input id="passward" type="password" className="w-full" />
                </div>
                <div className="text-center mt-8">
                  <Button className="py-4 px-16">ログイン</Button>
                </div>
              </form>
            </div>
        </Container>
    </main>
  );
}
