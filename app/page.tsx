"use client";

import { redirect } from "next/navigation";
import LandingPage from "./layouts/LandingPage";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function Home() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  console.log("isAuth : " + isAuthenticated);
  return isAuthenticated ? redirect("/patient") : <LandingPage />;
}
