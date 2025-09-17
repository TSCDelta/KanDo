"use client";

import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import React, { useState } from "react";
import Image from "next/image";
import PasswordInput from "@/components/forms/passwordInput";
import EmailInput from "@/components/forms/emailInput";
import UsernameInput from "@/components/forms/usernameInput";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { isValidEmail } = require("@/lib/helper");

  const getPasswordError = (password: string): string | null => {
    if (password.length < 8)
      return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password))
      return "Password must include at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must include at least one lowercase letter.";
    if (!/[\d]/.test(password))
      return "Password must include at least one numeric character.";
    if (!/[\W_]/.test(password))
      return "Password must include at least one special character.";
    return null;
  };

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const error = getPasswordError(password);
    if (error) {
      setError(error);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(email, password);
      if (result && result.user) {
        await updateProfile(result.user, {
          displayName: username,
          photoURL: `https://ui-avatars.com/api/?name=${username}&background=random`,
        });
        await sendEmailVerification();
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setError("Verification email sent. Please check your inbox.");
      } else {
        setError("User creation failed.");
      }
    } catch (err) {
      setError("Registration failed: " + err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log("Registered user:", result.user);
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Google sign-up failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <main className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Create Account
        </h1>

        {error && (
          <div className="flex items-center justify-between gap-3 bg-red-100 text-red-800 border border-red-300 rounded-md px-4 py-3 text-sm shadow-sm">
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              className="text-red-800 hover:text-red-500 transition-colors"
              aria-label="Close error message"
            >
              ✕
            </button>
          </div>
        )}

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-5 text-sm sm:text-base"
        >
          <div className="flex flex-col">
            <EmailInput
              id="email"
              label="Email"
              value={email}
              onChange={setEmail}
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col">
            <UsernameInput
              id="username"
              label="Username"
              value={username}
              onChange={setUsername}
              autoComplete="username"
            />
          </div>

          <div className="flex flex-col">
            <PasswordInput
              id="password"
              label="Password"
              value={password}
              onChange={setPassword}
            />
          </div>

          <div className="flex flex-col">
            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </div>

          <button
            type="submit"
            className={`rounded-full transition-colors flex items-center justify-center font-medium h-10 sm:h-12 px-4 sm:px-5
            ${
              isValidEmail(email) && password && confirmPassword && username
                ? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
          <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
          <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
        </div>

        {/* Google Sign Up */}
        <button
          onClick={handleGoogleLogin}
          className="rounded-full border border-transparent flex items-center justify-center bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 font-medium h-10 sm:h-12 px-4 sm:px-6 w-full gap-3"
        >
          <Image src="/google.svg" alt="Google logo" width={20} height={20} />
          Sign Up with Google
        </button>

        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Log In
          </a>
        </p>
      </main>
    </div>
  );
}
