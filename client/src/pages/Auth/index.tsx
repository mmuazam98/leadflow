import { Mail, Lock, User, ArrowRight } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const AuthPage: React.FC = () => {
  const { isLogin, setIsLogin, email, setEmail, password, setPassword, name, setName, handleSubmit } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6A1BE0] to-[#9747FF] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#6A1BE0]">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A1BE0] focus:border-transparent"
                  placeholder="John Doe"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A1BE0] focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A1BE0] focus:border-transparent"
                placeholder="**********"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6A1BE0] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#5516b3] transition-colors duration-200 flex items-center justify-center gap-2">
            {isLogin ? "Sign In" : "Create Account"}
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#6A1BE0] hover:text-[#5516b3] font-medium">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
