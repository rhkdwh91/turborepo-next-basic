"use client";

import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/queryKeys";
import { useCallback } from "react";
import { useReceiptWriterApplication } from "@/hooks/service/mutations/useWriterApplication";

export default function View() {
  const methods = useForm();
  const { data } = useQuery(queryKeys.categories.list());
  const receiptWriterApplicationMutation = useReceiptWriterApplication();

  const categoryWatch = methods.watch("category");
  const reasonWatch = methods.watch("reason");

  const onSubmit = useCallback(
    (form: FieldValues) => {
      if (!receiptWriterApplicationMutation.isPending)
        receiptWriterApplicationMutation.mutate({
          content: JSON.stringify(form),
        });
    },
    [receiptWriterApplicationMutation],
  );

  return (
    <main className="max-w-[1160px] mx-auto pt-[50px] pb-[100px]">
      <h1 className="font-bold text-2xl mb-3">작가신청</h1>
      <FormProvider {...methods}>
        <form
          className="w-[500px] block"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <em className="block mb-4 text-gray-800 not-italic">
            작성할 이야기의 카테고리를 선택해주세요
          </em>
          <select
            {...methods.register("category", { required: "This is required." })}
          >
            {data?.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
            <option value="category_add">카테고리 추가 신청</option>
          </select>
          {categoryWatch === "category_add" && (
            <input
              className="my-2 p-2 w-[500px] border border-gray-200 rounded-md text-sm leading-tight text-black"
              type="text"
              placeholder="신청할 카테고리 이름을 적어주세요"
              {...methods.register("category_add", {
                required: "This is required.",
              })}
            />
          )}
          <em className="block mb-4 text-gray-800 not-italic">
            KLOG 에서 어떤 이야기를 써내려가고 싶으세요? (1500자 이내로
            작성해주세요.)
          </em>
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
