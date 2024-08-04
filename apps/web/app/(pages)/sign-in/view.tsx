"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@ui/src/components/atom/Input";
import { Button } from "@ui/src/components/atom/Button";

import useUserMutation from "@/hooks/service/mutations/useUserMutation";

import styles from "./page.module.css";
import { UserForm } from "types/user";
import { toast } from "kyz-toast";

export default function View() {
  const router = useRouter();
  const [show, setShow] = useState(false);
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
    <main>
      <div className={styles.layout}>
        <label>
          <span>username</span>
          <Input
            placeholder="Enter username"
            name="username"
            onChange={handleChangeInput}
            value={form.username}
          />
        </label>
        <div>
          <span>password</span>
          <label>
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
          </label>
        </div>
        <div>
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
