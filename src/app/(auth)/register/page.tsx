"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import Image from "next/image";
import { Envelope, Lock, Eye, EyeClosed, Person, Briefcase, ArrowRight } from "@gravity-ui/icons";
import logoImg from "@/assets/logo.png";
import { toast } from "@heroui/react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      role: "buyer",
      fullName: "",
      email: "",
      password: "",
    }
  });

  const selectedRole = watch("role");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setErrorMsg("");
    setLoading(true);

    if (data.password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      setLoading(false);
      toast("Password must be at least 8 characters.");
      return;
    }

    try {
      await (signUp.email as any)({
        email: data.email,
        password: data.password,
        name: data.fullName,
        role: data.role,
        callbackURL: "/",
        fetchOptions: {
          onError: (ctx: any) => {
            const errMsg = ctx.error.message || "Registration failed. Please try again.";
            setErrorMsg(errMsg);
            setLoading(false);
            toast(errMsg);
          },
          onSuccess: () => {
            setLoading(false);
            toast("Account created successfully!");
            router.push("/");
          }
        }
      });
    } catch (err: any) {
      setErrorMsg("An unexpected error occurred. Please try again.");
      setLoading(false);
      toast("An unexpected error occurred.");
    }
  };

  const handleSocialSignUp = async (provider: "google") => {
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
    <div className="bg-background text-on-background min-h-screen flex flex-col justify-between relative overflow-hidden">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-fixed/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-secondary-fixed/20 blur-[120px] rounded-full"></div>
      </div>

      <main className="flex-grow flex items-center justify-center px-4 py-16 relative z-10">
        <div className="w-full max-w-[480px] bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(10,37,64,0.05)] border border-outline-variant/30 transition-all">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 mb-4 relative">
              <Image
                alt="NestFind Logo"
                className="object-contain"
                fill
                priority
                sizes="64px"
                src={logoImg}
              />
            </div>
            <h1 className="text-2xl font-bold text-primary tracking-tight font-sans">
              Create Account
            </h1>
            <p className="text-sm text-on-surface-variant mt-1 font-light">
              Join NestFind&apos;s premium real estate network
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs mb-4 border border-red-150">
              {errorMsg}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="space-y-1 pb-1">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1">
                I am a...
              </label>
              <div className="flex p-1 bg-surface-container rounded-xl gap-1">
                <div className="flex-1">
                  <input
                    type="radio"
                    id="role-buyer"
                    value="buyer"
                    {...register("role")}
                    className="hidden"
                  />
                  <label
                    htmlFor="role-buyer"
                    className={`flex items-center justify-center py-2.5 cursor-pointer rounded-lg text-xs font-semibold transition-all ${
                      selectedRole === "buyer"
                        ? "bg-white text-primary shadow-sm"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    <Person className="w-4 h-4 mr-2" />
                    Buyer
                  </label>
                </div>
                <div className="flex-1">
                  <input
                    type="radio"
                    id="role-agent"
                    value="agent"
                    {...register("role")}
                    className="hidden"
                  />
                  <label
                    htmlFor="role-agent"
                    className={`flex items-center justify-center py-2.5 cursor-pointer rounded-lg text-xs font-semibold transition-all ${
                      selectedRole === "agent"
                        ? "bg-white text-primary shadow-sm"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Agent
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label
                className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Person className="text-outline w-5 h-5 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  suppressHydrationWarning
                  {...register("fullName", { required: true })}
                  className="w-full pl-12 pr-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-sans outline-none text-on-surface placeholder:text-outline/50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Envelope className="text-outline w-5 h-5 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  suppressHydrationWarning
                  {...register("email", { required: true })}
                  className="w-full pl-12 pr-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-sans outline-none text-on-surface placeholder:text-outline/50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block px-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="text-outline w-5 h-5 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  required
                  suppressHydrationWarning
                  {...register("password", { required: true, minLength: 8 })}
                  className="w-full pl-12 pr-[48px] py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-sans outline-none text-on-surface placeholder:text-outline/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface transition-colors justify-center"
                >
                  {showPassword ? (
                    <EyeClosed className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-white transition-all active:scale-[0.98] py-3.5 rounded-xl text-sm font-bold shadow-sm flex items-center justify-center cursor-pointer disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center">
            <div className="w-full flex items-center mb-4">
              <div className="flex-1 h-[1px] bg-outline-variant/60"></div>
              <span className="px-4 text-[10px] font-semibold text-outline uppercase tracking-wider">
                Or register with
              </span>
              <div className="flex-1 h-[1px] bg-outline-variant/60"></div>
            </div>
            
            <button
              type="button"
              onClick={() => handleSocialSignUp("google")}
              className="w-full py-3 border border-outline-variant rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer bg-transparent"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-xs font-semibold text-primary">Google</span>
            </button>

            <div className="mt-6 text-center">
              <p className="text-xs text-on-surface-variant font-medium">
                Already have an account?{" "}
                <Link className="text-primary font-bold hover:underline ml-1" href="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-4 border-t border-outline-variant/10 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
          <p className="text-on-surface-variant font-medium">
            © 2026 NestFind. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              Help Center
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              Safety
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
