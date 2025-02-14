import { useNavigate } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-[#9747FF] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-24 w-24 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center gap-2 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-[#5516b3] transition-colors duration-200">
          <Home className="h-5 w-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
