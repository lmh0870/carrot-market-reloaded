"use server";

import { revalidatePath } from "next/cache";
import { createAccountSchema } from "./schema";
import { CreateAccountFormData, FormState } from "./types";

export async function createAccount(
  prevState: FormState,
  formData: CreateAccountFormData
): Promise<FormState> {
  try {
    const validatedData = createAccountSchema.parse(formData);

    // 여기에 실제 계정 생성 로직을 구현합니다.
    // 예: 데이터베이스에 사용자 정보 저장
    console.log("계정 생성:", validatedData);

    // 성공적으로 계정이 생성되었다고 가정
    revalidatePath("/create-account");
    return { message: "계정이 성공적으로 생성되었습니다.", error: null };
  } catch (error) {
    console.error("계정 생성 중 오류 발생:", error);
    if (error instanceof Error) {
      return { message: null, error: error.message };
    }
    return { message: null, error: "계정 생성 중 오류가 발생했습니다." };
  }
}
