import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          환영합니다
        </h1>
        <p className="text-xl mb-8 text-gray-300">당신의 여정을 시작하세요</p>
      </div>
      <div className="space-y-4 w-full max-w-xs">
        <Link
          href="/create-account"
          className="btn-primary block text-center py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 bg-blue-600 hover:bg-blue-700"
        >
          회원가입
        </Link>
        <Link
          href="/login"
          className="btn-secondary block text-center py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
        >
          로그인
        </Link>
      </div>
    </main>
  );
}
