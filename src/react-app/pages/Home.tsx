import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Calendar, MapPin, Clock, Grid, List } from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import Footer from '@/react-app/components/Footer';
import type { Event } from '@/shared/types';

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [specialEvents, setSpecialEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const [eventsResponse, specialResponse] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/events/special')
      ]);
      const events = await eventsResponse.json();
      const special = await specialResponse.json();
      setFeaturedEvents(events.slice(0, 6)); // Show first 6 events as featured
      setSpecialEvents(special);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse text-purple-600">Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[90vh] md:min-h-[70vh] flex items-center -mt-4 md:-mt-5">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/VNoq4LR1UzE?autoplay=1&mute=1&loop=1&playlist=VNoq4LR1UzE&start=40&controls=0&modestbranding=1"
            className="absolute -top-[30px] md:-top-[10px] left-0 right-0 bottom-0 w-full h-full object-cover scale-[2.2] md:scale-125 origin-center"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8">
              Discover Amazing
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Events</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
              Find the best events and venues in your city. From concerts to conferences, 
              we have everything you need to make your next experience unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4">
              <Link 
                to="/events" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 md:py-3 rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200 text-center"
              >
                Browse Events
              </Link>
              <Link 
                to="/venues" 
                className="bg-gray-800 text-gray-200 border border-gray-600 px-8 py-4 md:py-3 rounded-lg font-semibold hover:shadow-lg hover:bg-gray-700 hover:border-gray-500 transition-all duration-200 text-center"
              >
                Explore Venues
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Special Events */}
      {specialEvents.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Special Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialEvents.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="group block"
              >
                <div className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden transform hover:scale-105 border border-orange-500/30">
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-orange-400 to-yellow-400">
                    {event.image_url ? (
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-400/20 to-yellow-400/20">
                        <div className="text-center text-orange-300">
                          <Calendar size={48} className="mx-auto mb-2 opacity-50" />
                          <p className="text-sm font-medium opacity-75">Event Image</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                        SPECIAL
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-400 mb-2">
                      <MapPin size={16} className="mr-2 flex-shrink-0" />
                      <span className="text-sm truncate">{event.venue_name}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 mb-4">
                      <Clock size={16} className="mr-2 flex-shrink-0" />
                      <span className="text-sm">{formatDate(event.start_date_time)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Events */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Grid size={18} />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <List size={18} />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>
        
        {featuredEvents.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No events available yet.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="group block"
              >
                <div className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden transform hover:scale-105 border border-gray-700">
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-400 to-cyan-400">
                    {event.image_url ? (
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400/20 to-cyan-400/20">
                        <div className="text-center text-blue-300">
                          <Calendar size={48} className="mx-auto mb-2 opacity-50" />
                          <p className="text-sm font-medium opacity-75">Event Image</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-400 mb-2">
                      <MapPin size={16} className="mr-2 flex-shrink-0" />
                      <span className="text-sm truncate">{event.venue_name}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 mb-4">
                      <Clock size={16} className="mr-2 flex-shrink-0" />
                      <span className="text-sm">{formatDate(event.start_date_time)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {featuredEvents.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="group block"
              >
                <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-700 overflow-hidden">
                  <div className="flex">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400 to-cyan-400 relative overflow-hidden flex-shrink-0 rounded-lg">
                      {event.image_url ? (
                        <img 
                          src={event.image_url} 
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400/20 to-cyan-400/20">
                          <Calendar size={20} className="text-blue-300 opacity-50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </div>
                    
                    <div className="flex-1 p-4 sm:p-6">
                      <div className="flex flex-col h-full">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                            {event.title}
                          </h3>
                          
                          <div className="flex flex-col gap-1 text-sm text-gray-400 mb-3">
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-2 flex-shrink-0" />
                              <span className="truncate">{event.venue_name}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Clock size={14} className="mr-2 flex-shrink-0" />
                              <span>{formatDate(event.start_date_time)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
