"use client";
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
import useUserMutation from "hooks/mutation/useUserMutation";

import styles from "./page.module.css";
import { UserForm } from "../../types/user";

export default function View() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<UserForm>({
    username: "",
    password: "",
  });
  const { signInUserMutation, createUserMutation } = useUserMutation();

  const handleClickPasswordShow = () => setShow(!show);
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleClickSignIn = () => {
    if (form.username.length > 4 && form.password.length > 6) {
      return signInUserMutation.mutate(form);
    }
    alert("Invalid Value");
  };
  const handleClickSignUp = () => {
    if (form.username.length > 4 && form.password.length > 6) {
      return createUserMutation.mutate(form);
    }
    alert("Invalid Value");
  };

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <FormLabel marginY={2} textColor="white">
          username
          <Input
            pr="4.5rem"
            placeholder="Enter username"
            name="username"
            onChange={handleChangeInput}
            value={form.username}
          />
        </FormLabel>
        <FormLabel marginY={2} textColor="white">
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
        <Flex gap="20px" marginY={4} justifyContent="flex-end">
          <Button onClick={handleClickSignIn}>SignIn</Button>
          <Button onClick={handleClickSignUp}>SignUp</Button>
        </Flex>
      </div>
    </main>
  );
}
