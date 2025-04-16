"use client";
import { Home } from "@geist-ui/icons";
import { User } from "@geist-ui/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

enum SelectedRoute {
  HOME = "home",
  PROFILE = "profile",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [selectedIcon, setSelectedIcon] = useState<SelectedRoute>(
    SelectedRoute.HOME
  );

  const handleIconClick = (route: SelectedRoute) => {
    setSelectedIcon(route);
    router.push(`/auth/${route}`);
  };

  return (
    <div className="flex-1 flex flex-row ">
      <div className="flex flex-col h-screen w-20 bg-neutral-900 justify-start items-center p-6 gap-8 sticky top-0">
        <Home
          size={32}
          onClick={() => handleIconClick(SelectedRoute.HOME)}
          className={`hover:opacity-70 cursor-pointer transition-colors-opacity ${
            selectedIcon === SelectedRoute.HOME
              ? "stroke-primary-500"
              : "stroke-neutral-50"
          }`}
        />
        <User
          size={32}
          onClick={() => handleIconClick(SelectedRoute.PROFILE)}
          className={`hover:opacity-70 cursor-pointer transition-colors-opacity ${
            selectedIcon === SelectedRoute.PROFILE
              ? "stroke-primary-500"
              : "stroke-neutral-50"
          }`}
        />
      </div>
      {children}
    </div>
  );
}
