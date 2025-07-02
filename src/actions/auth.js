"use server";

import { auth, signIn, signOut } from "@/app/auth";
import { redirect } from "next/dist/server/api-utils";

export const signup = async (username, birthdate, email, password) => {};

export const login = async (email, password) => {
  await signIn("credentials", {
    email,
    password,
    redirect: false,
  }).then((res) => {
    if (res?.ok) {
      redirect("/dashboard");
    } else {
      console.error("Login failed", res?.error);
	  redirect("/");
    }
  });
};

export const loginWithGoogle = async () => {
  await signIn("google", { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const isAuthenticated = async () => {
  let session = await auth();
  console.log(session);
  return session?.user;
};
