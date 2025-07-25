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
import { loginSchema } from "@/actions/authSchema";
import { login, signup, loginWithGoogle } from "@/actions/auth";
import { useAuthModalStore } from "@/store/authModalStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CardDemo() {
  const [isLoginView, setIsLoginView] = useState(true);

  const { isOpen, shouldRender, closeModal } = useAuthModalStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
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
      const res = await login(data);
      if (res?.success) {
        toast.success("Signed in successfully!", { id: "signup-success" });
        closeModal();
        router.refresh();
      }
    } catch (err) {
      console.error("Authentication failed", err);
      toast.error(err || "Failed to register", { id: "signup-error" });
    }
  };

  const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
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
          <CardTitle>Login to your account</CardTitle>
          <CardAction>
            <Button
              variant="link"
              onClick={() => setIsLoginView(!isLoginView)}
              disabled={isSubmitting}
            ></Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          {/* i am passing signup as parameter of handleSubmit, because of the validation. here's still manual, for now, in the login <Form> will be used*/}
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
                  autoComplete="email"
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
                  autoComplete="password"
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
                ) : (
                  "Login"
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

      {/* Backdrop */}
      <div
        className="bg-black/80 w-screen h-screen absolute z-10 blur"
        style={{
          backgroundImage: `url(${baseURL}/Vector2.png)`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
}
