"use server";

import { auth, signIn, signOut } from "@/app/auth";
import { z } from "zod";
import { loginSchema, signupSchema } from "@/actions/authSchema";

export async function login(formData) {
  try {
    const data = Object.fromEntries(formData);
    const validatedData = loginSchema.parse(data);

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    const errorMessage =
      error.message || "An unexpected error occurred during login.";
    return { success: false, error: errorMessage };
  }
}

//export const signup = async (username, birthdate, email, password) => {};

export async function signup(formData) {
  try {
    const data = Object.fromEntries(formData);
    const validatedData = signupSchema.parse(data);

    const response = await fetch(`${process.env.API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: validatedData.email,
        password: validatedData.password,
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message || "Registration failed.");
    }

    return {
      success: true,
      message: "Registration successful! You can now log in.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    console.error("Signup server action error:", error);
    return {
      success: false,
      error:
        error.message ||
        "An unexpected server error occurred during registration.",
    };
  }
}

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
