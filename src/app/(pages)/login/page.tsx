import { LoginForm } from "@/app/components/LoginForm";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { Session } from "next-auth";

// import { LoginForm } from "@/app/components/LoginForm";

export default function Login() {
//   const session: Session | null = await getServerSession();

//   if (session) redirect("/");

  return (
    <div className="min-h-screen inset-0 pt-[60.8px] fixed container flex flex-col flex-grow mx-auto px-4 sm:px-0 xl:max-w-7xl">
      <div className="flex h-full items-center justify-center">
        {/* komponen merah */}
       <LoginForm/>
      </div>
    </div>
  );
}
