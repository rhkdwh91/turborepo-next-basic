"use client";
import { useCallback, useState } from "react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/queryKeys";
import {
  useTagCreateMutation,
  useTagDeleteMutation,
} from "@/hooks/service/mutations/useTagMutation";
import { confirmModal } from "@repo/ui/components/organism/ConfirmModal";
import { useUserLevelMutation } from "@/hooks/service/mutations/useUserMutation";
import {
  useCategoryCreateMutation,
  useCategoryDeleteMutation,
} from "@/hooks/service/mutations/useCategoryMutation";

interface UserModifyFormProps {
  uid: number;
  handleClickModifyMode: (value: boolean) => void;
}

function UserModifyForm({ uid, handleClickModifyMode }: UserModifyFormProps) {
  const queryClient = useQueryClient();
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const userLevelMutation = useUserLevelMutation();

  const handleSubmitModify = useCallback(
    (form: FieldValues) => {
      if (!userLevelMutation.isPending)
        userLevelMutation.mutate(
          { level: form.level, uid },
          {
            onSuccess: async () => {
              await queryClient.refetchQueries({
                queryKey: queryKeys.user.list().queryKey,
              });
              handleClickModifyMode(false);
            },
          },
        );
    },
    [userLevelMutation.isPending],
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSubmitModify)}>
        <input
          {...register("level", { required: "This is required." })}
          type="text"
          placeholder="please enter a level"
          className="border-2 border-gray-400 block rounded py-2 px-4"
          onChange={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
        />
        <ErrorMessage
          errors={errors}
          name="level"
          render={({ message }) => (
            <p className="text-red-600 py-1">{message}</p>
          )}
        />

        <div>
          <button
            type="submit"
            className="border-2 py-1 px-4 rounded-full bg-sky-600 mx-2 text-white cursor-pointer hover:bg-sky-700"
          >
            확인
          </button>
          <button
            className="border-2 py-1 px-4 rounded-full bg-sky-600 mx-2 text-white cursor-pointer hover:bg-sky-700"
            onClick={() => handleClickModifyMode(false)}
          >
            취소
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

function UserManage() {
  const [isModify, setIsModify] = useState<boolean>(false);
  const { data: users } = useQuery({ ...queryKeys.user.list() });

  const handleClickModifyMode = useCallback((modify: boolean) => {
    setIsModify(modify);
  }, []);

  return (
    <section className="my-4">
      <h2 className="text-2xl font-bold">계정 관리</h2>

      <article className="my-2 p-5">
        <h3 className="text-xl font-bold">유저 리스트</h3>
        {users?.map((user) => (
          <div
            key={user.username}
            className="m-2 border-2 border-gray-500 bg-white p-4 inline-block text-black rounded"
          >
            <p>email: {user.email}</p>
            <p>username: {user.username}</p>
            <p>
              level:
              {isModify ? (
                <UserModifyForm
                  uid={user.uid}
                  handleClickModifyMode={handleClickModifyMode}
                />
              ) : (
                <>
                  {user.level}
                  <div>
                    <button
                      className="border-2 py-1 px-4 rounded-full bg-sky-600 mx-2 text-white cursor-pointer hover:bg-sky-700"
                      onClick={() => handleClickModifyMode(true)}
                    >
                      수정
                    </button>
                  </div>
                </>
              )}
            </p>
          </div>
        ))}
      </article>
    </section>
  );
}

function CategoryManage() {
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
            <button
              type="submit"
              className="border-2 py-1 px-4 rounded-full bg-amber-200 my-2"
            >
              생성
            </button>
          </article>
        </form>
      </FormProvider>
      <article className="my-2 p-5">
        <h3 className="text-xl font-bold">카테고리 리스트</h3>
        {categories?.map((category) => (
          <div
            key={category.name}
            className="m-2 border-2 border-blue-400 bg-blue-600 p-2 inline-block rounded-full text-amber-50"
          >
            {category.value}
            <button
              className="border-2 py-1 px-4 rounded-full bg-amber-200 mx-2 text-black"
              onClick={() => handleClickDelete(category.name)}
            >
              제거
            </button>
          </div>
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
            <button
              type="submit"
              className="border-2 py-1 px-4 rounded-full bg-amber-200 my-2"
            >
              생성
            </button>
          </article>
        </form>
      </FormProvider>
      <article className="my-2 p-5">
        <h3 className="text-xl font-bold">태그 리스트</h3>
        {tags?.map((tag) => (
          <div
            key={tag.name}
            className="m-2 border-2 border-blue-400 bg-blue-600 p-2 inline-block rounded-full text-amber-50"
          >
            {tag.value}
            <button
              className="border-2 py-1 px-4 rounded-full bg-amber-200 mx-2 text-black"
              onClick={() => handleClickDelete(tag.name)}
            >
              제거
            </button>
          </div>
        ))}
      </article>
    </section>
  );
}

export default function View() {
  return (
    <main className="px-2.5">
      <h1 className="text-5xl font-bold pb-3">Admin</h1>
      <UserManage />
      <CategoryManage />
      <TagManage />
    </main>
  );
}
