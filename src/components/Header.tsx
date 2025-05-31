
import { Button } from "@/components/ui/button";
import { BookOpen, LogIn, UserPlus } from "lucide-react";

interface HeaderProps {
  isLoggedIn: boolean;
  username?: string;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

const Header = ({ isLoggedIn, username, onLogin, onSignup, onLogout }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Eagerlearn</h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {username}!</span>
                <Button variant="outline" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={onLogin}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button onClick={onSignup}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
