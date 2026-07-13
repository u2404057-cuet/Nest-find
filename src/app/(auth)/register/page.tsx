"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import Image from "next/image";
import { Envelope, Lock, Eye, EyeClosed, Person, Briefcase, ArrowRight } from "@gravity-ui/icons";

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

    try {
      await (signUp.email as any)({
        email: data.email,
        password: data.password,
        name: data.fullName,
        role: data.role,
        callbackURL: "/",
        fetchOptions: {
          onError: (ctx: any) => {
            setErrorMsg(ctx.error.message || "Registration failed. Please try again.");
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
      {/* Global Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-fixed/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-secondary-fixed/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Registration Content Shell */}
      <main className="flex-grow flex items-center justify-center px-4 py-16 relative z-10">
        <div className="w-full max-w-[480px] bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_rgba(10,37,64,0.05)] border border-outline-variant/30 transition-all">
          
          {/* Branding Header */}
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

          {/* Registration Form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Role Selection (Segmented Control) */}
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

            {/* Full Name */}
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
                  {...register("fullName", { required: true })}
                  className="w-full pl-12 pr-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-sans outline-none text-on-surface placeholder:text-outline/50"
                />
              </div>
            </div>

            {/* Email Address */}
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
                  {...register("email", { required: true })}
                  className="w-full pl-12 pr-4 py-3 border border-outline-variant bg-surface rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-sans outline-none text-on-surface placeholder:text-outline/50"
                />
              </div>
            </div>

            {/* Password */}
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

            {/* CTA Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-white transition-all active:scale-[0.98] py-3.5 rounded-xl text-sm font-bold shadow-sm flex items-center justify-center cursor-pointer disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>

          {/* Social Links */}
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
              <Image
                className="w-5 h-5 mr-2"
                alt="Google"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtyud7weRO52XtYefeQ-K8IhkjCl2foHkfi43TbHH8VNjgRg8c0WSJDbMPMKHMR_6fUXEgNCCo9kflipU6Swatiqy742DltUR3xKYXBVXDgBfrkTdWW79J04ng4DwLZxZvAqAKEIdJPQxh7f4uo7nSfbotdWoELAcZllRW17jI5-G73KhSks9a0Jl7PaLbO29GHNsnfwyH1eTZu3fBKCEs9CjuVlYjb8vM0mCSAxp3MacSwbd0ql4k_A"
                width={20}
                height={20}
              />
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

      {/* Simple Footer */}
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
