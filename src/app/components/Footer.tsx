"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <div
      className={`${pathname === "/login" ? "hidden" : ""} 
      container mx-auto xl:max-w-7xl `}
    >
      <div className="flex flex-col space-y-4 py-[25px] sm:py-[32px] lg:py-10 border-t border-[#363636]/50">
        <div className="flex justify-center">
          <div className="flex flex-col pl-6 justify-center items-center font-semibold text-left text-[12px] sm:text-sm text-white space-y-[2px]">
            <h1>&copy; 2024 MVApp. All right reserved.</h1>
            <h1>
              Built by <span className="text-[#E50914]">@hassankary</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
