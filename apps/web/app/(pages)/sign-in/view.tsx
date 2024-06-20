"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
} from "@chakra-ui/react";

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
    <main className={styles.main}>
      <div className={styles.layout}>
        <FormLabel marginY={2}>
          username
          <Input
            pr="4.5rem"
            placeholder="Enter username"
            name="username"
            onChange={handleChangeInput}
            value={form.username}
          />
        </FormLabel>
        <FormLabel marginY={2}>
          password
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              onChange={handleChangeInput}
              value={form.password}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClickPasswordShow}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormLabel>
        <Flex gap={2} marginY={4} justifyContent="flex-end">
          <Button
            onClick={handleClickSignIn}
            isDisabled={signInUserMutation.isPending}
          >
            SignIn
          </Button>
          <div>
            <Button onClick={handleClickSignInGoogle}>
              <img
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                alt="google logo"
              />
              &nbsp; Google
            </Button>
          </div>
          {/*
          <Button
            onClick={handleClickSignUp}
            isDisabled={createUserMutation.isPending}
          >
            SignUp
          </Button>*/}
        </Flex>
      </div>
    </main>
  );
}
