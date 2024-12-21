"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useUserLevelMutation } from "@/entities/user/api/useUserMutation";
import { useCallback, useState } from "react";
import { queryKeys } from "shared/lib/queryKeys";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from "@ui/src/components/atom/Button";
import { Input } from "@ui/src/components/atom/Input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@ui/src/components/organism/Card";
import ProfileImage from "@ui/src/components/atom/ProfileImage";

interface UserModifyFormProps {
  uid: number;
  handleClickModifyMode: (uid: number | null) => void;
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
              handleClickModifyMode(null);
            },
          },
        );
    },
    [userLevelMutation.isPending],
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSubmitModify)}
        className="flex flex-col gap-4"
      >
        <Input
          {...register("level", { required: "This is required." })}
          type="text"
          placeholder="please enter a level"
          onChange={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
        />
        <ErrorMessage
          errors={errors}
          name="level"
          render={({ message }) => (
            <p className="text-red-600 py-1">{message}</p>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit">확인</Button>
          <Button
            variant="destructive"
            onClick={() => handleClickModifyMode(null)}
          >
            취소
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default function View() {
  const [modifyNumber, setIsModifyNumber] = useState<null | number>(null);
  const { data: users } = useQuery({ ...queryKeys.user.list() });

  const handleClickModifyMode = useCallback((uid: number | null) => {
    setIsModifyNumber(uid);
  }, []);

  return (
    <main className="px-2.5 py-10 max-w-6xl lg:max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">계정 관리</h1>

      <article className="my-2">
        <h2 className="text-2xl font-bold mb-4">유저 리스트</h2>
        <section className="flex flex-wrap gap-4">
          {users?.map((user) => (
            <Card key={user.username} className="min-w-[320px]">
              <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                  <ProfileImage
                    src={user.profileImage}
                    width={30}
                    height={30}
                  />
                  {user.username}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <p>email: {user.email}</p>
                </CardDescription>
              </CardContent>
              <CardFooter>
                <p className="flex gap-4 items-center">
                  level:
                  {modifyNumber === user.uid ? (
                    <UserModifyForm
                      uid={user.uid}
                      handleClickModifyMode={handleClickModifyMode}
                    />
                  ) : (
                    <>
                      {user.level}
                      <div>
                        <Button
                          variant="secondary"
                          onClick={() => handleClickModifyMode(user.uid)}
                        >
                          수정
                        </Button>
                      </div>
                    </>
                  )}
                </p>
              </CardFooter>
            </Card>
          ))}
        </section>
      </article>
    </main>
  );
}
