"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createAccount } from "./actions";
import { FormState, CreateAccountFormData } from "./types";
// import { motion } from "framer-motion";

const initialState: FormState = {
  message: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? "처리 중..." : "회원가입"}
    </button>
  );
}

export default function CreateAccountForm() {
  const [state, formAction] = useFormState(createAccount, initialState);

  return (
    <motion.form
      action={(formData: FormData) =>
        formAction(formData as unknown as CreateAccountFormData)
      }
      className="form-layout"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label htmlFor="username" className="label-style">
          사용자 이름
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          className="input-field"
          placeholder="사용자 이름을 입력하세요"
        />
      </div>
      <div>
        <label htmlFor="email" className="label-style">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="input-field"
          placeholder="이메일을 입력하세요"
        />
      </div>
      <div>
        <label htmlFor="password" className="label-style">
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="input-field"
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="label-style">
          비밀번호 확인
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          className="input-field"
          placeholder="비밀번호를 다시 입력하세요"
        />
      </div>
      <SubmitButton />
      {state.error && <p className="error-message">{state.error}</p>}
      {state.message && <p className="success-message">{state.message}</p>}
    </motion.form>
  );
}
