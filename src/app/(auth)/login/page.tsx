"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import Image from "next/image";
import { Envelope, Lock, Eye, EyeClosed } from "@gravity-ui/icons";

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setErrorMsg("");
    setLoading(true);
    try {
      await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
        fetchOptions: {
          onError: (ctx) => {
            setErrorMsg(ctx.error.message || "Invalid credentials. Please try again.");
            setLoading(false);
          },
          onSuccess: () => {
            setLoading(false);
            router.push("/");
          }
        }
      });
    } catch (err: any) {
      setErrorMsg("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google") => {
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (err) {
      console.error("Social login failed", err);
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col justify-between">
      {/* Login Container */}
      <main className="flex-grow flex items-center justify-center p-6">
        {/* Auth Card */}
        <div className="bg-surface-container-lowest w-full max-w-[440px] rounded-2xl shadow-[0_4px_20px_rgba(10,37,64,0.05)] overflow-hidden p-6 md:p-8 border border-outline-variant/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(10,37,64,0.08)]">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 mb-4 relative">
              <Image
                alt="NestFind Logo"
                className="object-contain"
                fill
                priority
                src="https://lh3.googleusercontent.com/aida/AP1WRLuC7aeE-A47qGeUoQuP0iai-m3BX7uJvbBqmqJ8YShza8Pq3Y2jJJxsKPOr04GzPCRgEbWm2my2i77taDicQ4RFSrvvLtma17fxej_54PuDqU7Qb5wTlMLm-QhP1b50522JELl_-9Tcip41iUc9HNwVjoUTGSCUz0DJNjt6Zjl_Q0DtPjXjHpQ3WfQJ8jGmMOo0Z7QMYrp9pTOE2AsQBk-nxYT6Lr1RY3p4WTyFUHfQaQif_g2XYFgOYsiC"
              />
            </div>
            <h1 className="text-2xl font-bold text-primary tracking-tight font-sans">
              NestFind
            </h1>
            <p className="text-sm text-on-surface-variant mt-1 font-light">
              Reliability. Clarity. Architectural Precision.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs mb-4 border border-red-150">
              {errorMsg}
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="space-y-1">
              <label
                className="block text-xs font-semibold text-on-surface-variant px-1 uppercase tracking-wider"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <Envelope className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  {...register("email", { required: true })}
                  className="w-full pl-12 pr-4 py-3 bg-background border border-outline-variant rounded-xl text-sm font-sans focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-on-surface placeholder:text-outline/50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label
                  className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  className="text-xs text-secondary hover:underline transition-all"
                  href="#"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  {...register("password", { required: true })}
                  className="w-full pl-12 pr-12 py-3 bg-background border border-outline-variant rounded-xl text-sm font-sans focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-on-surface placeholder:text-outline/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors flex items-center justify-center"
                >
                  {showPassword ? (
                    <EyeClosed className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary-container text-primary font-semibold py-3.5 rounded-xl shadow-sm hover:brightness-105 active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Social Links */}
          <div className="mt-6 flex flex-col items-center">
            <div className="w-full flex items-center mb-4">
              <div className="flex-1 h-[1px] bg-outline-variant/60"></div>
              <span className="px-4 text-[10px] font-semibold text-outline uppercase tracking-wider">
                Or login with
              </span>
              <div className="flex-1 h-[1px] bg-outline-variant/60"></div>
            </div>
            
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="w-full py-3 border border-outline-variant rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer bg-transparent"
            >
              <Image
                className="w-5 h-5 mr-2"
                alt="Google"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtyud7weRO52XtYefeQ-K8IhkjCl2foHkfi43TbHH8VNjgRg8c0WSJDbMPMKHMR_6fUXEgNCCo9kflipU6Swatiqy742DltUR3xKYXBVXDgBfrkTdWW79J04ng4DwLZxZvAqAKEIdJPQxh7f4uo7nSfbotdWoELAcZllRW17jI5-G73KhSks9a0Jl7PaLbO29GHNsnfwyH1eTZu3fBKCEs9CjuVlYjb8vM0mCSAxp3MacSwbd0ql4k_A"
                width={20}
                height={20}
              />
              <span className="text-xs font-semibold text-primary">Google</span>
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-xs text-on-surface-variant font-medium">
              Don&apos;t have an account?{" "}
              <Link
                className="text-primary font-bold hover:underline decoration-secondary-container decoration-2 underline-offset-4"
                href="/register"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Reduced Footer */}
      <footer className="w-full bg-surface-container-lowest py-4 px-6 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
          <p className="text-on-surface-variant font-medium">
            © 2026 NestFind. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              Privacy Policy
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              Terms of Service
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              Help Center
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
