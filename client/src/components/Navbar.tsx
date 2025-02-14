import useUser from "@/hooks/useUser";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logoutHandler } = useUser();

  const userName = user?.name?.split(" ")?.[0] ?? "User";

  return (
    <nav className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src="/logo.webp" className="h-10 w-10 object-contain rounded-md shadow-lg hover:shadow-xl" />
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center">
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {userName}</span>
              <button
                onClick={logoutHandler}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-[#6A1BE0] bg-white hover:bg-gray-100 transition-colors duration-200">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-200 hover:text-white focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <div className="flex flex-col space-y-3">
              <span className="text-white">Welcome, {userName}</span>
              <button
                onClick={logoutHandler}
                className="inline-flex w-min items-center px-4 py-2 rounded-lg text-sm font-medium text-[#6A1BE0] bg-white hover:bg-gray-100 transition-colors duration-200">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
