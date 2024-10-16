"use client";
import Link from "next/link";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { TbLoader } from "react-icons/tb";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const loginHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email.trim() && !password.trim()) {
      setError("Form cannot be empty");
      setIsLoading(false);
      return;
    } else if (!email.trim()) {
      setError("Email cannot be empty");
      setIsLoading(false);
      return;
    } else if (!password.trim()) {
      setError("Password cannot be empty");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Email invalid");
      setIsLoading(false);
      return;
    }

    router.push("/");
    // try {
    //   const res = await signIn("credentials", {
    //     email,
    //     password,
    //     redirect: false,
    //   });

    //   if (res?.error) {
    //     setError(res.error);
    //     setIsLoading(false);
    //     return;
    //   } else if (res?.ok) {
    //     router.replace("/");
    //     setIsLoading(false);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   setError("An unexpected error occured");
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="sm:p-10 rounded-2xl">
      <div className="p-5 bg-white/10 rounded-2xl shadow-2xl ">
        <h1 className=" text-xl font-bold mb-5 text-center">Login</h1>
        <form onSubmit={loginHandler} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Email"
            className="min-w-[250px] sm:w-[350px] outline-none px-6 py-2 bg-black/50 focus:ring focus:ring-red-600 rounded-lg"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="min-w-[250px] sm:w-[350px] outline-none px-6 py-2 bg-black/50 focus:ring focus:ring-red-600 rounded-lg"
          />
          <button
            className={` ${
              isLoading ? "bg-[#E50914]/80 animate-pulse" : ""
            } flex justify-center items-center bg-[#E50914] px-6 py-2 text-white font-bold hover:bg-[#E50914]/80 active:scale-95 rounded-lg transition-all`}
          >
            {isLoading ? <TbLoader className=" animate-spin" /> : "Login"}
          </button>
          {error && (
            <div className="min-w-[250px] sm:w-[350px] flex px-3 py-1 w-fit text-white text-sm text-wrap bg-red-500 rounded-md">
              {error}
            </div>
          )}
        </form>
        <h1 className="py-3 text-center">Or</h1>
        <Link
          href={"/"}
          className={`w-full flex justify-center items-center bg-green-600 px-6 py-2 text-white font-bold hover:bg-green-600/80 active:scale-95 rounded-lg transition-all`}
        >
          Continue as Guest
        </Link>
      </div>
    </div>
  );
};
