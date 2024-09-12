import Link from "next/link";
import { KakaoIcon, GoogleIcon, NaverIcon } from "./SocialIcons";
import CreateAccountForm from "./CreateAccountForm";

export default function CreateAccountPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          회원가입
        </h1>
        <CreateAccountForm />
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">이미 계정이 있으신가요? </span>
          <Link
            href="/login"
            className="text-blue-400 hover:underline font-medium"
          >
            로그인
          </Link>
        </div>

        <div className="mt-8 flex items-center">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="px-4 text-gray-500 text-sm">또는</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="p-2 rounded-full bg-yellow-400 text-black transition duration-300 ease-in-out transform hover:scale-110"
            aria-label="카카오로 가입"
          >
            <KakaoIcon className="w-6 h-6" />
          </button>
          <button
            className="p-2 rounded-full bg-white text-black transition duration-300 ease-in-out transform hover:scale-110"
            aria-label="구글로 가입"
          >
            <GoogleIcon className="w-6 h-6" />
          </button>
          <button
            className="p-2 rounded-full bg-green-500 text-white transition duration-300 ease-in-out transform hover:scale-110"
            aria-label="네이버로 가입"
          >
            <NaverIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
