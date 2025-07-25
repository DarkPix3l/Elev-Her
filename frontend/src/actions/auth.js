import { auth, signOut } from "@/app/auth";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { loginSchema, signupSchema } from "@/actions/authSchema";

export async function login(data) {
  try {
    const validatedData = loginSchema.parse(data);

    const res = await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    if (res?.error) {
      throw new Error(res.error);
    }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
  
    return { success: false, error: error.message };
  }
}


export async function signup(data) {
  try {
    const validatedData = signupSchema.parse(data);

    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: validatedData.username,
        email: validatedData.email,
        password: validatedData.password,
        birthDate: validatedData.birthDate,
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message || "Registration failed.");
    }

    return {
      success: true,
      message: "Registration successful! You can now log in.",
      redirectTo: "/",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
   
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
  return session?.user;
};
