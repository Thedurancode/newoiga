import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { MapPin, Phone, ExternalLink } from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import Footer from '@/react-app/components/Footer';
import type { Venue } from '@/shared/types';

export default function Venues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await fetch('/api/venues');
      const venueData = await response.json();
      setVenues(venueData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching venues:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse text-blue-400">Loading venues...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Venues We Work With</h1>

        </div>

        {venues.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No venues available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden group border border-gray-700"
              >
                {venue.image_url && (
                  <div className="h-48 bg-black relative overflow-hidden">
                    <img
                      src={venue.image_url}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors flex-1">
                      {venue.name}
                    </h3>
                    {venue.logo_url && (
                      <div className="bg-white rounded-lg p-2 shadow-lg flex-shrink-0">
                        <img
                          src={venue.logo_url}
                          alt={`${venue.name} logo`}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {venue.address && venue.city && (
                    <div className="flex items-start text-gray-400 mb-3">
                      <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                      <div className="text-sm">
                        <div>{venue.address}</div>
                        <div>{venue.city}</div>
                      </div>
                    </div>
                  )}

                  {venue.phone && (
                    <div className="flex items-center text-gray-400 mb-3">
                      <Phone size={16} className="mr-2" />
                      <span className="text-sm">{venue.phone}</span>
                    </div>
                  )}

                  {venue.description && (
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {venue.description}
                    </p>
                  )}

                  <div className="flex justify-between items-center">
                    <Link
                      to={`/venues/${venue.id}`}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200"
                    >
                      View Events
                    </Link>

                    {venue.website && (
                      <a
                        href={venue.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 p-2"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
