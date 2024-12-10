"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@ui/src/components/atom/Input";
import { Button } from "@ui/src/components/atom/Button";

import useUserMutation from "@/entities/user/api/useUserMutation";

// import styles from "./page.module.css";
import { UserForm } from "types/user";
import { toast } from "kyz-toast";

export default function View() {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [form, setForm] = useState<UserForm>({
    username: "",
    password: "",
  });
  const { signInUserMutation } = useUserMutation();

  const handleClickPasswordShow = () => setShow(!show);
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleClickSignIn = async () => {
    if (form.username.length < 3 || form.password.length < 6) {
      return toast.error("Invalid Value!");
    }
    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });
    if (res?.status === 401 || !res) {
      return toast.error("Failed login user!");
    }
    toast.success("login success");
    router.push("/");
  };

  const handleClickSignInGoogle = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: process.env.NEXT_PUBLIC_API_URL,
    });
  };
  /*
  const handleClickSignUp = () => {
    if (form.username.length > 4 && form.password.length > 6) {
      return createUserMutation.mutate(form);
    }
    toast.error("Invalid Value!");
  };*/

  return (
    <main className="max-w-6xl mx-auto h-[calc(100vh-230px)]">
      <div className="flex items-center gap-4 flex-col w-2xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <label className="w-52">
          <span>username</span>
          <Input
            className="w-[100%]"
            placeholder="Enter username"
            name="username"
            onChange={handleChangeInput}
            value={form.username}
          />
        </label>
        <label className="w-52">
          <span>password</span>
          <div className="flex items-center gap-2">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              onChange={handleChangeInput}
              value={form.password}
            />
            <span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClickPasswordShow}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </span>
          </div>
        </label>
        <div className="w-52 flex items-center gap-2 justify-end">
          <Button variant="outline" onClick={handleClickSignInGoogle}>
            Google
          </Button>
          <Button
            variant="outline"
            onClick={handleClickSignIn}
            disabled={signInUserMutation.isPending}
          >
            SignIn
          </Button>
          {/*
          <Button
            onClick={handleClickSignUp}
            isDisabled={createUserMutation.isPending}
          >
            SignUp
          </Button>*/}
        </div>
      </div>
    </main>
  );
}
