"use client";

import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/queryKeys";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  useCategoryCreateMutation,
  useCategoryDeleteMutation,
} from "@/entities/category/model/useCategoryMutation";
import {
  useTagCreateMutation,
  useTagDeleteMutation,
  useTagUpdateCategoryMutation,
} from "@/hooks/service/mutations/useTagMutation";
import { confirmModal } from "@ui/src/components/organism/ConfirmModal";
import { Tag } from "@/types/tag";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from "@repo/ui/components/atom/Button";
import { Badge } from "@repo/ui/components/atom/Badge";

function CategoryManage() {
  const [tagUid, setTagUid] = useState("");
  const { data: categories, refetch } = useQuery({
    ...queryKeys.categories.list(),
  });
  const methods = useForm();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;
  const createMutation = useCategoryCreateMutation();
  const deleteMutation = useCategoryDeleteMutation();
  const addTagMutation = useTagUpdateCategoryMutation();

  const handleClickCreate = useCallback(
    (form: FieldValues) => {
      if (!createMutation.isPending)
        createMutation.mutate(
          { value: form.value, name: form.name },
          {
            onSuccess: async () => {
              await refetch();
              reset({
                name: "",
                value: "",
              });
            },
          },
        );
    },
    [createMutation],
  );

  const handleClickDelete = useCallback(
    (name: string) => {
      confirmModal.open({
        message: "Are you sure you want to delete this category?",
        onClickConfirm: () => {
          if (!deleteMutation.isPending) {
            deleteMutation.mutate(name, {
              onSuccess: async () => {
                await refetch();
              },
            });
          }
        },
      });
    },
    [deleteMutation],
  );

  const handleClickTag = useCallback(
    (category: Tag) => {
      addTagMutation.mutate(
        {
          categoryUid: category.uid,
          tagUid: Number(tagUid),
        },
        {
          onSuccess: () => refetch(),
        },
      );
    },
    [tagUid],
  );

  return (
    <section className="my-4">
      <h2 className="text-2xl font-bold">카테고리 관리</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleClickCreate)}>
          <article className="my-2 p-5">
            <h3 className="text-xl font-bold">카테고리 생성</h3>
            <label className="my-1 block">
              <span className="block">Name</span>
              <input
                {...register("name", { required: "This is required." })}
                type="text"
                placeholder="please enter a name"
                className="border-2 border-gray-400 block rounded py-2 px-4"
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p className="text-red-600 py-1">{message}</p>
                )}
              />
            </label>
            <label className="my-1 block">
              <span className="block">Value</span>
              <input
                {...register("value", { required: "This is required." })}
                type="text"
                placeholder="please enter a value"
                className="border-2 border-gray-400 block rounded py-2 px-4"
              />
              <ErrorMessage
                errors={errors}
                name="value"
                render={({ message }) => (
                  <p className="text-red-600 py-1">{message}</p>
                )}
              />
            </label>
            <Button type="submit">생성</Button>
          </article>
        </form>
      </FormProvider>
      <article className="my-2 p-5">
        <h3 className="text-xl font-bold">카테고리 리스트</h3>
        {categories?.map((category) => (
          <>
            <Badge key={category.name}>
              {category.value}
              <Button
                variant="ghost"
                className="ml-4"
                onClick={() => handleClickDelete(category.name)}
              >
                제거
              </Button>
            </Badge>
            <div>
              <input
                placeholder="please enter a value"
                className="border-2 border-gray-400 block rounded py-2 px-4"
                type="text"
                value={tagUid}
                onChange={(e) =>
                  setTagUid(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
              <Button type="button" onClick={() => handleClickTag(category)}>
                태그 추가
              </Button>
            </div>
            {category.tags.map((tag) => tag.name).join(", ")}
          </>
        ))}
      </article>
    </section>
  );
}

function TagManage() {
  const { data: tags, refetch } = useQuery({ ...queryKeys.tags.list() });
  const methods = useForm();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;
  const createMutation = useTagCreateMutation();
  const deleteMutation = useTagDeleteMutation();

  const handleClickCreate = useCallback(
    (form: FieldValues) => {
      if (!createMutation.isPending)
        createMutation.mutate(
          { value: form.value, name: form.name },
          {
            onSuccess: async () => {
              await refetch();
              reset({
                name: "",
                value: "",
              });
            },
          },
        );
    },
    [createMutation],
  );

  const handleClickDelete = useCallback(
    (name: string) => {
      confirmModal.open({
        message: "Are you sure you want to delete this tag?",
        onClickConfirm: () => {
          if (!deleteMutation.isPending) {
            deleteMutation.mutate(name, {
              onSuccess: async () => {
                await refetch();
              },
            });
          }
        },
      });
    },
    [deleteMutation],
  );

  return (
    <section className="my-4">
      <h2 className="text-2xl font-bold">태그 관리</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleClickCreate)}>
          <article className="my-2 p-5">
            <h3 className="text-xl font-bold">태그 생성</h3>
            <label className="my-1 block">
              <span className="block">Name</span>
              <input
                {...register("name", { required: "This is required." })}
                type="text"
                placeholder="please enter a name"
                className="border-2 border-gray-400 block rounded py-2 px-4"
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p className="text-red-600 py-1">{message}</p>
                )}
              />
            </label>
            <label className="my-1 block">
              <span className="block">Value</span>
              <input
                {...register("value", { required: "This is required." })}
                type="text"
                placeholder="please enter a value"
                className="border-2 border-gray-400 block rounded py-2 px-4"
              />
              <ErrorMessage
                errors={errors}
                name="value"
                render={({ message }) => (
                  <p className="text-red-600 py-1">{message}</p>
                )}
              />
            </label>
            <Button type="submit">생성</Button>
          </article>
        </form>
      </FormProvider>
      <article className="my-2 p-5">
        <h3 className="text-xl font-bold">태그 리스트</h3>
        {tags?.map((tag) => (
          <Badge key={tag.name}>
            ({tag.uid}) {tag.value}
            <Button
              variant="ghost"
              className="ml-2"
              onClick={() => handleClickDelete(tag.name)}
            >
              제거
            </Button>
          </Badge>
        ))}
      </article>
    </section>
  );
}

export default function View() {
  return (
    <main className="px-2.5 py-10 max-w-6xl lg:max-w-6xl mx-auto">
      <CategoryManage />
      <TagManage />
    </main>
  );
}
