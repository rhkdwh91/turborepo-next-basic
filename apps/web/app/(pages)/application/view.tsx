"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";

export default function View() {
  const methods = useForm();

  const reasonWatch = methods.watch("reason");

  return (
    <main className="max-w-[1160px] mx-auto p-5">
      <h1 className="font-bold text-2xl mb-3">작가신청</h1>
      <em className="block mb-4 text-gray-800 not-italic">
        KLOG 에서 어떤 이야기를 써내려가고 싶으세요? (1500자 이내로
        작성해주세요.)
      </em>
      <FormProvider {...methods}>
        <form className="w-[500px] block">
          <textarea
            className="my-2 p-5 w-[500px] h-[500px] border border-gray-200 rounded-md text-sm leading-tight text-black"
            {...methods.register("reason", { required: true, maxLength: 1500 })}
            required
            maxLength={1500}
          />
          <div>{reasonWatch ? reasonWatch.length : 0} 자</div>
          <Button
            type="submit"
            color="white"
            bgColor="cornflowerblue"
            className="float-right"
          >
            신청
          </Button>
        </form>
      </FormProvider>
    </main>
  );
}
