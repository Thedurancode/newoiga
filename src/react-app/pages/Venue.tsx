import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { MapPin, Phone, ExternalLink, Calendar, Clock, ArrowLeft } from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import Footer from '@/react-app/components/Footer';
import type { Venue, Event } from '@/shared/types';

export default function VenuePage() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchVenue();
      fetchVenueEvents();
    }
  }, [id]);

  const fetchVenue = async () => {
    try {
      const response = await fetch(`/api/venues/${id}`);
      const venueData = await response.json();
      setVenue(venueData);
    } catch (error) {
      console.error('Error fetching venue:', error);
    }
  };

  const fetchVenueEvents = async () => {
    try {
      const response = await fetch(`/api/venues/${id}/events`);
      const eventData = await response.json();
      setEvents(eventData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching venue events:', error);
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

  if (loading || !venue) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse text-blue-400">Loading venue...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <Link 
          to="/venues" 
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Venues
        </Link>

        {/* Venue Header */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-700">
          {venue.image_url && (
            <div className="h-64 bg-gradient-to-r from-blue-400 to-cyan-400 relative">
              <img 
                src={venue.image_url} 
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
          )}
          
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white">{venue.name}</h1>
              </div>
              {venue.logo_url && (
                <div className="bg-white rounded-xl p-4 shadow-xl border border-gray-200">
                  <img 
                    src={venue.logo_url} 
                    alt={`${venue.name} logo`}
                    className="h-16 lg:h-20 w-auto object-contain max-w-[200px]"
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {venue.address && venue.city && (
                <div className="flex items-start">
                  <MapPin size={20} className="mr-3 mt-1 text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Address</div>
                    <div className="text-gray-300">{venue.address}</div>
                    <div className="text-gray-300">{venue.city}</div>
                  </div>
                </div>
              )}
              
              {venue.phone && (
                <div className="flex items-center">
                  <Phone size={20} className="mr-3 text-blue-400" />
                  <div>
                    <div className="font-semibold text-white">Phone</div>
                    <div className="text-gray-300">{venue.phone}</div>
                  </div>
                </div>
              )}
            </div>
            
            {venue.description && (
              <div className="mb-6">
                <h3 className="font-semibold text-white mb-2">About</h3>
                <p className="text-gray-300 leading-relaxed">{venue.description}</p>
              </div>
            )}
            
            {venue.website && (
              <a 
                href={venue.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold"
              >
                <ExternalLink size={20} className="mr-2" />
                Visit Website
              </a>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Upcoming Events</h2>
          
          {events.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No upcoming events at this venue.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden group border border-gray-700"
                >
                  {event.image_url && (
                    <div className="h-40 bg-gradient-to-r from-blue-400 to-cyan-400 relative overflow-hidden">
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-400 mb-3">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm">{formatDate(event.start_date_time)}</span>
                    </div>
                    
                    {event.description && (
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <Link 
                        to={`/events/${event.id}`}
                        className="text-blue-400 hover:text-blue-300 font-semibold text-sm"
                      >
                        Learn More →
                      </Link>
                      
                      {event.price && (
                        <span className="text-lg font-bold text-green-600">
                          ${event.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
