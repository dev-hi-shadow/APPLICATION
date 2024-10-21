import { useGetCategoriesQuery } from "@/Services/API/Category";
import React, { useEffect } from "react";
import _ from "lodash";
import Link from "next/link";

const Subbar = () => {
  const { data, isSuccess, isLoading } = useGetCategoriesQuery();

  useEffect(() => {}, [isSuccess]);

  return (
    <>
      <header className="navbar-expand-md">
        <div className="px-2  navbar">
          <div className="row flex-fill justify-center align-items-center">
            {_.map(data?.data?.rows || [], (category) => {
               return (
                <div className="col-auto px-1" key={category?.id}>
                  <Link href="#">{category?.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </header>
    </>
  );
};

export default Subbar;
