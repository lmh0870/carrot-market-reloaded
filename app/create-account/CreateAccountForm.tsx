"use client";

import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createAccount } from "./actions";
import { FormState, CreateAccountFormData } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

const initialState: FormState = {
  message: null,
  error: null,
};

const schema = z
  .object({
    username: z.string().min(3, "사용자 이름은 3글자 이상이어야 합니다."),
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    password: z.string().min(8, "비밀번호는 8글자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn-primary w-full py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      disabled={pending}
    >
      {pending ? "처리 중..." : "회원가입"}
    </button>
  );
}

function ErrorMessage({ error }: { error: string | null }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mt-4"
          role="alert"
        >
          <p className="font-bold">오류</p>
          <p>{error}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SuccessMessage({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mt-4"
          role="alert"
        >
          <p className="font-bold">성공</p>
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function CreateAccountForm() {
  const [state, formAction] = useFormState(createAccount, initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string) => {
    try {
      schema.pick({ [name]: true }).parse({ [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      schema.parse(data);
      formAction(data as CreateAccountFormData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium mb-2 text-gray-300"
        >
          사용자 이름
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          className="input-field w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="사용자 이름을 입력하세요"
          onChange={(e) => validateField("username", e.target.value)}
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2 text-gray-300"
        >
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="input-field w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="이메일을 입력하세요"
          onChange={(e) => validateField("email", e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium mb-2 text-gray-300"
        >
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="input-field w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => validateField("password", e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium mb-2 text-gray-300"
        >
          비밀번호 확인
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          className="input-field w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="비밀번호를 다시 입력하세요"
          onChange={(e) => validateField("confirmPassword", e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      <SubmitButton />
      <ErrorMessage error={state.error} />
      <SuccessMessage message={state.message} />
    </motion.form>
  );
}
