"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useUserLevelMutation } from "@/hooks/service/mutations/useUserMutation";
import { useCallback, useState } from "react";
import { queryKeys } from "@/queryKeys";
import { ErrorMessage } from "@hookform/error-message";

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

export default function View() {
  const [isModify, setIsModify] = useState<boolean>(false);
  const { data: users } = useQuery({ ...queryKeys.user.list() });

  const handleClickModifyMode = useCallback((modify: boolean) => {
    setIsModify(modify);
  }, []);

  return (
    <main className="px-2.5 py-10 max-w-6xl lg:max-w-6xl mx-auto">
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
    </main>
  );
}
