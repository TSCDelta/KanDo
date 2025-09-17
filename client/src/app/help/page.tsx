"use client";

import Sidebar from "@/components/navigation/sidebar";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function PageClient() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-background text-gray-100">
      <Sidebar
        onSignOut={handleSignOut}
        userName={user?.displayName || ""}
        user={user}
      />
    </div>
  );
}
