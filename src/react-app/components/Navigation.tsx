import { Link, useLocation } from "react-router";
import { Calendar, MapPin, Home, Menu, X, Users, Briefcase, Video } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-gray-900/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center py-2">
            <img 
              src="https://mocha-cdn.com/019889c0-e36b-78be-8a97-5e6e4fda143a/OIGA-EVENTS-LOGO.png" 
              alt="Oiga Events" 
              className="h-16 md:h-20 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/') 
                  ? 'bg-blue-900/50 text-blue-300' 
                  : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link 
              to="/events" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/events') 
                  ? 'bg-blue-900/50 text-blue-300' 
                  : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              <Calendar size={20} />
              <span>Events</span>
            </Link>
            <Link 
              to="/videos" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/videos') 
                  ? 'bg-blue-900/50 text-blue-300' 
                  : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              <Video size={20} />
              <span>Videos</span>
            </Link>
            <Link 
              to="/venues" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/venues') 
                  ? 'bg-blue-900/50 text-blue-300' 
                  : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              <MapPin size={20} />
              <span>Venues</span>
            </Link>
            <Link 
              to="/about" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/about') 
                  ? 'bg-blue-900/50 text-blue-300' 
                  : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              <Users size={20} />
              <span>About</span>
            </Link>
            <Link 
              to="/work-with-us" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/work-with-us') 
                  ? 'bg-blue-900/50 text-blue-300' 
                  : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
              }`}
            >
              <Briefcase size={20} />
              <span>Work With Us</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                  isActive('/') 
                    ? 'bg-blue-900/50 text-blue-300' 
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                }`}
              >
                <Home size={20} />
                <span className="font-medium">Home</span>
              </Link>
              <Link 
                to="/events" 
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                  isActive('/events') 
                    ? 'bg-blue-900/50 text-blue-300' 
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                }`}
              >
                <Calendar size={20} />
                <span className="font-medium">Events</span>
              </Link>
              <Link 
                to="/videos" 
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                  isActive('/videos') 
                    ? 'bg-blue-900/50 text-blue-300' 
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                }`}
              >
                <Video size={20} />
                <span className="font-medium">Videos</span>
              </Link>
              <Link 
                to="/venues" 
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                  isActive('/venues') 
                    ? 'bg-blue-900/50 text-blue-300' 
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                }`}
              >
                <MapPin size={20} />
                <span className="font-medium">Venues</span>
              </Link>
              <Link 
                to="/about" 
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                  isActive('/about') 
                    ? 'bg-blue-900/50 text-blue-300' 
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                }`}
              >
                <Users size={20} />
                <span className="font-medium">About</span>
              </Link>
              <Link 
                to="/work-with-us" 
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                  isActive('/work-with-us') 
                    ? 'bg-blue-900/50 text-blue-300' 
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                }`}
              >
                <Briefcase size={20} />
                <span className="font-medium">Work With Us</span>
              </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
