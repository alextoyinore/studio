"use client";

import { logout } from "@/app/login/actions";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <button onClick={handleLogout} className="w-full flex items-center">
      <LogOut className="mr-2" />
      <span>Logout</span>
    </button>
  );
}
