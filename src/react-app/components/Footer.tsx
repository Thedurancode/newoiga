import { Link } from "react-router";
import { Calendar, MapPin, Home, Mail, Phone, ExternalLink, Users, Briefcase, Video } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <div className="h-16 md:h-20 flex items-center">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  OIGA EVENTS
                </span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Discover amazing events and venues in your city. From concerts to conferences, 
              we connect you with unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="Twitter"
              >
                <ExternalLink size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="Facebook"
              >
                <ExternalLink size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="Instagram"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2"
                >
                  <Home size={16} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/events" 
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2"
                >
                  <Calendar size={16} />
                  <span>Events</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/videos" 
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2"
                >
                  <Video size={16} />
                  <span>Videos</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/venues" 
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2"
                >
                  <MapPin size={16} />
                  <span>Venues</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2"
                >
                  <Users size={16} />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/work-with-us" 
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2"
                >
                  <Briefcase size={16} />
                  <span>Work With Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-center space-x-2">
                <Mail size={16} />
                <span>hello@oigaevents.com</span>
              </li>
              <li className="text-gray-300 flex items-center space-x-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="text-gray-300">
                <div className="flex items-start space-x-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <div>
                    <div>123 Event Street</div>
                    <div>San Francisco, CA 94105</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} OigaEvents. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
