"use client";
import { HiBars3 } from "react-icons/hi2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoCloseSharp } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiFilmReelBold } from "react-icons/pi";
import { FaCircleUser } from "react-icons/fa6";
import { GiStarFormation } from "react-icons/gi";
import { HiHome } from "react-icons/hi2";

const navbarMenu = [
  {
    title: "Home",
    href: "/",
    component: <HiHome className="h-[18px] w-[18px]" />,
  },
  {
    title: "Popular",
    href: "/popular",
    component: <GiStarFormation className="h-[18px] w-[18px]" />,
  },
  {
    title: "Profile",
    href: "/profile",
    component: <FaCircleUser className="h-[18px] w-[18px]" />,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 w-full flex-none font-sans font-semibold text-sm bg-black/50 border-b border-[#363636]/50 backdrop-blur">
      <div className="container mx-auto px-4 xl:max-w-7xl ">
        <div className="flex lg:grid lg:grid-cols-3 h-[60px] items-center">
          <div className="flex">
            <Link href={"/"} className="flex items-center justify-center gap-2">
              <PiFilmReelBold className="h-8 w-8 text-[#E50914] bg-white rounded-full" />
              <span className=" font-extrabold text-xl">
                <span className="text-[#E50914]">MOVIES</span>app
              </span>
            </Link>
          </div>
          <div className="hidden lg:flex justify-center lg:self-stretch w-full">
            <div className="grid grid-cols-3 gap-x-6">
              {navbarMenu?.map((d, i) => {
                return (
                  <Link
                    key={i}
                    href={d.href}
                    className={`${
                      pathname === d.href
                        ? "font-bold text-[#E50914] border-[#E50914]"
                        : "border-transparent hover:border-[#E50914]"
                    } relative flex justify-center items-center pt-px -mb-px gap-x-2 border-b-2 transition-all duration-200 ease-out`}
                  >
                    {d.component}
                    <h1>{d.title}</h1>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex flex-grow justify-end">
            <div className="flex">
              <Menu>
                {({ open }) => (
                  <>
                    <MenuButton className="p-2 lg:hidden active:scale-90 transition-all duration-300 ease-out">
                      {open ? (
                        <IoCloseSharp className="h-6 w-6" />
                      ) : (
                        <HiBars3 className="h-6 w-6" />
                      )}
                    </MenuButton>
                    <MenuItems
                      transition
                      modal={false}
                      anchor="bottom"
                      className="fixed w-[180px] mt-[18px] -ml-2 z-10 rounded-xl border border-[#212121] bg-[#1C1C1C] p-1 text-sm/6 text-white transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                      <div className="flex flex-col gap-1">
                        {navbarMenu.map((d) => {
                          return (
                            <MenuItem key={d.title}>
                              <Link
                                href={d.href}
                                className={`${
                                  pathname === d.href ? "bg-white/10" : ""
                                } group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 transition-colors`}
                              >
                                {d.title}
                              </Link>
                            </MenuItem>
                          );
                        })}
                      </div>
                      <div className="my-1 h-px bg-white/5" />
                      <div className="flex flex-col gap-1">
                        <MenuItem>
                          <Link
                            href={`/login`}
                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 transition-colors"
                          >
                            Login
                          </Link>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </>
                )}
              </Menu>
            </div>
            <div className="hidden lg:flex lg:space-x-3">
              <Menu>
                {({ open }) => (
                  <>
                    <MenuButton className="flex justify-center items-center px-4 py-2 gap-x-2 border border-[#535353]/50 bg-transparent hover:text-[#E50914] hover:font-semibold hover:bg-[#1C1C1C]/50 active:scale-95 rounded-lg transition-all duration-300 ease-in-out">
                      <h1 className="text-nowrap">Menu</h1>
                      <MdKeyboardArrowDown
                        className={`${
                          open ? "rotate-180" : ""
                        } h-4 w-4 transition-transform duration-200`}
                      />
                    </MenuButton>
                    <MenuItems
                      transition
                      modal={false}
                      anchor="bottom"
                      className="fixed w-[180px] mt-[18px] -ml-2 z-10 rounded-xl border border-[#212121] bg-[#1C1C1C] p-1 text-sm/6 text-white transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                      <div className=" flex flex-col gap-1">
                        <MenuItem>
                          <Link
                            href={"/login"}
                            className={`${
                              pathname === "/login" ? "bg-white/10" : ""
                            } group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 transition-colors`}
                          >
                            Login
                          </Link>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
