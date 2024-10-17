import { LoginForm } from "@/app/components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen inset-0 pt-[60.8px] fixed container flex flex-col flex-grow mx-auto px-4 sm:px-0 xl:max-w-7xl">
      <div className="flex h-full items-center justify-center">
        <div className="absolute animate-spin animate-duration-[3000ms] w-10 h-40 blur-2xl bg-red-500 rounded-full" />
        <div className="absolute animate-spin animate-reverse animate-duration-[3000ms] w-10 h-40 blur-2xl bg-red-500 rounded-full" />
        <LoginForm />
      </div>
    </div>
  );
}
