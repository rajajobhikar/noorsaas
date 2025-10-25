"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginBlockPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 7000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="items-center justify-center h-full w-full text-center p-8">
      <h2>Hold up! You’ve already linked this email with a different login.</h2>
      <p>Stay loyal to your vibe 💅</p>
      <p>Redirecting you to login...</p>
      <div className="position relative w-150 h-150 mx-auto mt-8">
        <Image
          src="/already.png"
          alt="alreadyRegisteredEmail"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    </div>
  );
}
