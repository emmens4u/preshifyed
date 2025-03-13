"use client";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignupData } from "@/interfaces/auth.model";
import { validateEmail } from "@/utils/util";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>();

  const onSubmit = (data: SignupData) => {
    setLoading(true);
    console.log(data, 'signup data');
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col mx-auto justify-center items-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today to manage your expenses
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Input
            type="text"
            placeholder="Full Name"
            className="mb-4 input-box"
            aria-label="fullName"
            {...register("fullName", {
              required: "Full name is required",
            })}
          />
          {errors && (
            <p className="text-red-500 text-sm pb-2.5">
              {errors.fullName?.message}
            </p>
          )}
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
            {loading ? "Signing in..." : "Sign Up"}
          </Button>
          <p className="text-xs text-slate-700 mt-4">
            Already have an account ?
            <Link href="/login" className="hover:underline text-primary">
              {" "}
              Login
            </Link>
            <br />
            
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
