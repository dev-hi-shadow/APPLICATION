"use client";
import { useLogoutMutation } from "@/Services/API/auth";
import { Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Navbar = () => {
  const [
    logout,
    { isError, isLoading, isSuccess: LogoutSucces, isUninitialized },
  ] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    await logout().unwrap();
  };
  useEffect(() => {
    if (LogoutSucces && localStorage.getItem("accessToken")) {
      localStorage.removeItem("accessToken");
      router.push("/");
    }
  }, [LogoutSucces]);

  return (
    <>
      <header className="px-2 navbar   flex justify-between	" >
 
        <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
           <span className="h1 m-0">Growth-Guru</span>
        </div>
        <div className="flex justify-center gap-5">
          <Link onClick={()=>router.push("/blogs")} className="nav-link">Blogs</Link>
          <Link onClick={()=>router.push("/categories")} className="nav-link">Categories</Link>
          <Link onClick={()=>router.push("/sub-categories")}className="nav-link">Sub-Categories</Link> 
         </div>
        <div className="navbar-nav flex-row order-md-last">
 
          <div className="nav-item dropdown">
            <Link
              href="#"
              className="nav-link d-flex lh-1 text-reset p-0"
              data-bs-toggle="dropdown"
              aria-label="Open user menu"
            >
              <span className="avatar avatar-sm"></span>
              <div className="d-none d-xl-block ps-2">
                <div>Dunn Slane</div>
                <div className="mt-1 small text-secondary">Research Nurse</div>
              </div>
            </Link>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <Link onClick={handleLogout} className="dropdown-item">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
