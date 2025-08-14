import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import Footer from '@/react-app/components/Footer';
import type { Event } from '@/shared/types';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const eventData = await response.json();
      setEvents(eventData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
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
          <div className="animate-pulse text-blue-400">Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">All Events</h1>
          <p className="text-xl text-gray-300">Discover events happening near you</p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No events available yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="group block"
              >
                <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden border border-gray-700">
                  <div className="md:flex">
                    <div className="md:w-1/3 md:min-h-64 bg-gradient-to-r from-blue-400 to-cyan-400 relative overflow-hidden flex items-center justify-center">
                      {event.image_url ? (
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400/20 to-cyan-400/20">
                          <div className="text-center text-blue-300">
                            <Calendar size={48} className="mx-auto mb-2 opacity-50" />
                            <p className="text-sm font-medium opacity-75">Event Image</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6 md:w-2/3">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {event.title}
                              </h3>

                              <div className="flex items-center text-gray-400 mb-2">
                                <MapPin size={18} className="mr-2" />
                                <span>{event.venue_name}</span>
                                {event.venue_city && <span className="ml-1">• {event.venue_city}</span>}
                              </div>

                              <div className="flex items-center text-gray-400 mb-4">
                                <Clock size={18} className="mr-2" />
                                <div>
                                  <div className="font-semibold">{formatDate(event.start_date_time)}</div>
                                  <div className="text-sm">{formatTime(event.start_date_time)}</div>
                                </div>
                              </div>
                            </div>


                          </div>

                          {event.description && (
                            <p className="text-gray-300 mb-6 leading-relaxed">
                              {event.description}
                            </p>
                          )}
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
