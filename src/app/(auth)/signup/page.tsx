"use client";

import { useRegisterMutation } from "@/redux/api";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();
    const router = useRouter();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { toast } = useToast();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const form = e.currentTarget;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const contact = (form.elements.namedItem("contact") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        // Validation Checks
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
        const hasNumber = /\d/;
        const isOnlyLetters = /^[A-Za-z]+$/;

        if (isOnlyLetters.test(password)) {
            toast({
                title: "Weak Password",
                description: "Password must contain at least one number and one special character.",
                variant: "destructive",
            });
            setError("Password cannot contain only letters.");
            return;
        }

        if (contact.length !== 10) {
            toast({
                title: "Invalid Contact",
                description: "Contact number must be exactly 10 digits.",
                variant: "destructive",
            });
            setError("Contact number must be exactly 10 digits.");
            return;
        }

        if (!hasSpecialChar.test(password) || !hasNumber.test(password)) {
            setError("Include at least one number and one special character.");
            return;
        }

        try {
            await register({ name, email, contact, password }).unwrap();

            router.push("/signin");
        } catch (error: any) {
            console.error("Signup error:", error);
            setError(error?.data?.message || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8 font-body">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md">
                <div className="bg-white p-5 sm:p-7 rounded-2xl shadow-xl border border-blue-50">
                    <div className="flex flex-col items-center mb-4 sm:mb-6">
                        <div className="relative w-full max-w-[220px] sm:max-w-[260px] aspect-[280/75]">
                            <Image
                                src="/logo-wide.webp"
                                alt="Paarsh E-learning"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">Sign Up</h1>
                        <p className="text-gray-500 mt-1 text-center text-sm">
                            Join Paarsh E-learning today and start your learning journey
                        </p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-3">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-2.5 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <User size={18} />
                                </div>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Contact</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Phone size={18} />
                                </div>
                                <input
                                    name="contact"
                                    type="text"
                                    placeholder="enter 10 digit number"
                                    className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    required
                                    maxLength={10}
                                    minLength={10}
                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                    }}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Sign Up <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                        <p className="text-gray-600 font-medium text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/signin"
                                className="text-primary font-bold hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
