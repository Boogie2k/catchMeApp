"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { dm_sans } from "@/app/ui/fonts";

import Logout from "@/assets/Logout";
const sidebarContents = [
  {
    title: "users",
    icon: "",
    link: "/users",
  },
  {
    title: "swipes",
    icon: "",
    link: "/swipes",
  },
  {
    title: "reports",
    icon: "",
    link: "/reports",
  },
  {
    title: "notifications",
    icon: "",
    link: "/notifications",
  },
  {
    title: "admin_profile",
    icon: "",
    link: "/admin_profile",
  },
  {
    title: "deactivated_users",
    icon: "",
    link: "/deactivated_users",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="">
      <div className=" justify-between">
        {sidebarContents.map((content) => (
          <div className="p-30" key={content.title}>
            <Link
              className={`${dm_sans.className}   ${
                pathname == "/dashboard" + content.link
                  ? "text-red-500"
                  : "text-black"
              } text-lg `}
              href={`/dashboard${content.link}`}
            >
              {content.title}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center ">
        <Logout />{" "}
        <Link href={"/"} className="text-slate-400 text-right ml-6">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;