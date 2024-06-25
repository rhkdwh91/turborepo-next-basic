"use client";

import { FormProvider, useForm } from "react-hook-form";

export default function View() {
  const methods = useForm();

  const reasonWatch = methods.watch("reeson");

  return (
    <main>
      <h1>작가신청</h1>
      <em>
        KLOG 에서 어떤 이야기를 써내려가고 싶으세요? (1500자 이내로
        작성해주세요.)
      </em>
      <FormProvider {...methods}>
        <form>
          <textarea
            {...methods.register("reason", { required: true, maxLength: 1500 })}
            required
          />
          <div>{(reasonWatch && reasonWatch.length) ?? 0} 자</div>
          <button>신청</button>
        </form>
      </FormProvider>
    </main>
  );
}
