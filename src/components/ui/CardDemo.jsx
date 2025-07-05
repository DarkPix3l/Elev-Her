"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "@/actions/authSchema";

import {
  login,
  signup,
  loginWithGoogle,
} from "@/actions/auth";

import { useAuthModalStore } from '@/store/authModalStore';

export function CardDemo({ onAuthSuccess }) {
  const [isLoginView, setIsLoginView] = useState(true);

  const { isOpen, shouldRender, closeModal } = useAuthModalStore();

  const currentSchema = isLoginView ? loginSchema : signupSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!shouldRender) return null;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      let res;
      if (isLoginView) {
        res = await login(formData);
      } else {
        res = await signup(formData);
      }
      
console.log({res});

      if (res?.success) {
        //Getting the welcome messge from the
        onAuthSuccess?.(data.email.split("@")[0]);
       
        if (isLoginView) {
          closeModal();
        } else {
          alert(res.message || "Registration successful! Please log in.");
          setIsLoginView(true);
        }
        reset();
      }
    } catch (err) {
      console.error("Authentication error:", err);
    }
  };

  return (
    <div
      className={`p-9 absolute top-0 left-0 flex items-center justify-center z-20 w-screen h-screen ${
        isOpen ? "animate-fade-in" : "animate-fade-out"
      }`}
    >
      <Card
        className={`w-sm md:w-md lg:w-lg ${
          isOpen ? "animate-slide-up" : "animate-slide-down"
        } z-20 `}
      >
        <CardHeader>
          <CardTitle>{isLoginView ? "Login to your account" : "Create a new account"}</CardTitle>
          <CardAction>
            <Button variant="link" onClick={() => setIsLoginView(!isLoginView)} disabled={isSubmitting}>
              {isLoginView ? "Sign Up" : "Back to Login"}
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  {...register("password")}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : isLoginView ? (
                  "Login"
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={loginWithGoogle}
            disabled={isSubmitting}
          >
            Login with Google
          </Button>

          <Button variant="ghost" className="w-full" onClick={closeModal} disabled={isSubmitting}>
            Close
          </Button>
        </CardFooter>
      </Card>
      <div
        className="bg-black/80 w-screen h-screen absolute z-10 blur-sm"
        style={{
          backgroundImage: `url('/Vector2.png')`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
}