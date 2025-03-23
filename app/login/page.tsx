"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Image */}
      <div className="hidden md:block relative">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
          alt="Modern office interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60">
          <div className="p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
            <p className="text-gray-300">
              Access your lease management dashboard and streamline your property operations
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Sign in form */}
      <div className="flex items-center justify-center p-8 bg-black text-white">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">SIGN IN</h1>
            <p className="text-gray-400">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="h-12 bg-transparent border-0 border-b-2 border-gray-800 rounded-none px-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="h-12 bg-transparent border-0 border-b-2 border-gray-800 rounded-none px-0 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-gray-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="text-sm text-right">
              <Link href="#" className="text-gray-400 hover:text-white">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-white/90 h-12"
            >
              LOGIN
            </Button>

            <div className="text-center text-gray-500">
              <span className="text-sm">OR</span>
            </div>

            <Link href="/register">
              <Button
                type="button"
                variant="outline"
                className="w-full border-2 border-gray-800 text-white hover:bg-white hover:text-black h-12"
              >
                REGISTER
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}