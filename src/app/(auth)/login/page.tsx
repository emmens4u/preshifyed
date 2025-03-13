"use client";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { validateEmail } from "@/utils/util";
import { useForm } from "react-hook-form";
import { LoginData } from "@/interfaces/auth.model";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    setLoading(true);
    console.log(data);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col mx-auto justify-center items-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your detains to log in
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Input
            type="email"
            placeholder="Email"
            className="mb-4 input-box"
            aria-label="email"
            {...register("email", {
              required: "Email is required",
              validate: (value) => validateEmail(value) || "Invalid email",
            })}
          />
          {errors && (
            <p className="text-red-500 text-sm pb-2.5">
              {errors.email?.message}
            </p>
          )}
          <Input
            type="password"
            placeholder="Password"
            className="mb-4 input-box"
            aria-label="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors && (
            <p className="text-red-500 text-sm pb-2.5">
              {errors.password?.message}
            </p>
          )}
          <Button className="btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          <p className="text-xs text-slate-700 mt-4">
            Don&#39;t have an account ?
            <Link href="/signup" className="hover:underline text-primary">
              {" "}
              Register
            </Link>
            <br />
            <Link
              href="/forgot-password"
              className="hover:underline text-primary"
            >
              Forgot Password ?
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
