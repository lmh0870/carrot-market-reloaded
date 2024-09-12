import Link from "next/link";
import { KakaoIcon, GoogleIcon, NaverIcon } from "./SocialIcons";
import CreateAccountForm from "./CreateAccountForm";

export default function CreateAccountPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">회원가입</h1>
        <CreateAccountForm />
        <div className="mt-4 text-center">
          <span>이미 계정이 있으신가요? </span>
          <Link href="/login" className="link-orange">
            로그인
          </Link>
        </div>

        <div className="mt-6 flex items-center">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="px-4 text-gray-500">또는</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button className="btn-sns" aria-label="카카오로 가입">
            <KakaoIcon className="w-6 h-6" />
          </button>
          <button className="btn-sns" aria-label="구글로 가입">
            <GoogleIcon className="w-6 h-6" />
          </button>
          <button className="btn-sns" aria-label="네이버로 가입">
            <NaverIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
