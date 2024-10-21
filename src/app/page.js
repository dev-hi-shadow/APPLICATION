"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect } from "react";

const page = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    router.push("/blogs");
  }, [router]);

  return null;
};

export default page;
