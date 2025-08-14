import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { MapPin, Phone, ExternalLink, Calendar, ArrowLeft, Ticket } from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import Footer from '@/react-app/components/Footer';
import type { Event } from '@/shared/types';

export default function EventPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${id}`);
      const eventData = await response.json();
      setEvent(eventData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching event:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse text-blue-400">Loading event...</div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Event not found.</p>
            <Link to="/events" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <Link 
          to="/events" 
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Events
        </Link>

        {/* Event Flyer */}
        {event.image_url && (
          <div className="mb-8 flex justify-center">
            <div className="max-w-md w-full">
              <img 
                src={event.image_url} 
                alt={event.title}
                className="w-full aspect-square object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Event Header */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-700">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-white mb-6">{event.title}</h1>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              <div className="flex items-start">
                <Calendar size={24} className="mr-3 mt-1 text-blue-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white text-lg">Date & Time</div>
                  <div className="text-gray-300">{formatDate(event.start_date_time)}</div>
                  <div className="text-gray-300">{formatTime(event.start_date_time)}</div>
                  {event.end_date_time && (
                    <div className="text-sm text-gray-400 mt-1">
                      Ends: {formatTime(event.end_date_time)}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin size={24} className="mr-3 mt-1 text-blue-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white text-lg">Venue</div>
                  <Link 
                    to={`/venues/${event.venue_id}`}
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    {event.venue_name}
                  </Link>
                  {event.venue_address && (
                    <div className="text-gray-400 text-sm mt-1">
                      <div>{event.venue_address}</div>
                      {event.venue_city && <div>{event.venue_city}</div>}
                    </div>
                  )}
                </div>
              </div>
              
              {event.price && (
                <div className="flex items-start">
                  <Ticket size={24} className="mr-3 mt-1 text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white text-lg">Price</div>
                    <div className="text-2xl font-bold text-green-600">${event.price}</div>
                  </div>
                </div>
              )}
            </div>
            
            {event.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
                <p className="text-gray-300 leading-relaxed text-lg">{event.description}</p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4">
              {event.ticket_url && (
                <a 
                  href={event.ticket_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200 inline-flex items-center"
                >
                  <Ticket size={20} className="mr-2" />
                  Get Tickets
                </a>
              )}
              
              <Link 
                to={`/venues/${event.venue_id}`}
                className="bg-gray-700 text-blue-400 border-2 border-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 hover:border-blue-300 transition-all duration-200"
              >
                View Venue
              </Link>
            </div>
          </div>
        </div>


      </div>
      
      <Footer />
    </div>
  );
}
