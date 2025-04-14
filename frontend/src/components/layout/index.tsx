import React from "react";
import { ReactComponent as Logo } from "../svg/Logo.svg";
import { ReactComponent as Contact } from "../svg/Contact.svg";
import { ReactComponent as Organization } from "../svg/Organization.svg";
import { Link, useLocation } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="flex h-screen bg-[#fdf2f8]">
      <aside className="w-64 bg-[#cf97b6] shadow-lg hidden md:block border-r border-[#e5e7eb]">
        <div className="h-[70px] flex items-center justify-center bg-[#aa2c71]">
          <Logo className="w-28 h-auto fill-[#f9a8d4]" />
        </div>
        <nav className="p-10 text-[#1f2937] text-lg flex flex-col gap-5">
          <Link
            to="/organizations"
            className={`${
              path.includes("/organizations")
                ? "text-[#be185d]"
                : "hover:text-[#d53999]"
            } flex items-center gap-2`}
          >
            <Organization className="w-4 fill-[#fd328e] animate-pulse" />
            Organizations
          </Link>
          <Link
            to="/contacts"
            className={`${
              path.includes("/contacts")
                ? "text-[#be185d]"
                : "hover:text-[#d53999]"
            } flex gap-2`}
          >
            <Contact className="w-4 fill-[#fd328e] animate-pulse" />
            Contacts
          </Link>
        </nav>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="h-[70px] bg-[#be185d] border-b flex items-center px-12 justify-between">
          <div className="text-base font-normal text-[#f9a8d4]">
            Faisal Corporation
          </div>
        </header>
        <main className="p-6 md:p-12 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
