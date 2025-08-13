import { useState, useEffect } from 'react';
import { Calendar, MapPin, Edit3, Trash2, Plus, Save, X, TrendingUp, Star, BarChart3, Building2, Phone, Globe, Users } from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import Footer from '@/react-app/components/Footer';
import type { Event, Venue } from '@/shared/types';

interface EventForm {
  title: string;
  description: string;
  venue_id: number;
  start_date_time: string;
  end_date_time: string;
  price: number | null;
  image_url: string;
  ticket_url: string;
  is_featured: boolean;
  is_special: boolean;
}

interface VenueForm {
  name: string;
  description: string;
  address: string;
  city: string;
  image_url: string;
  logo_url: string;
  website: string;
  phone: string;
}

interface Stats {
  totalEvents: number;
  featuredEvents: number;
  totalVenues: number;
  upcomingEvents: number;
}

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [stats, setStats] = useState<Stats>({ totalEvents: 0, featuredEvents: 0, totalVenues: 0, upcomingEvents: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'events' | 'venues'>('events');
  const [showPastEvents, setShowPastEvents] = useState(false);
  
  // Event state
  const [editingEvent, setEditingEvent] = useState<number | null>(null);
  const [showCreateEventForm, setShowCreateEventForm] = useState(false);
  const [eventFormData, setEventFormData] = useState<EventForm>({
    title: '',
    description: '',
    venue_id: 0,
    start_date_time: '',
    end_date_time: '',
    price: null,
    image_url: '',
    ticket_url: '',
    is_featured: false,
    is_special: false
  });

  // Venue state
  const [editingVenue, setEditingVenue] = useState<number | null>(null);
  const [showCreateVenueForm, setShowCreateVenueForm] = useState(false);
  const [venueFormData, setVenueFormData] = useState<VenueForm>({
    name: '',
    description: '',
    address: '',
    city: '',
    image_url: '',
    logo_url: '',
    website: '',
    phone: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, venuesRes] = await Promise.all([
        fetch('/api/events/all'),
        fetch('/api/venues')
      ]);
      
      const eventsData = await eventsRes.json();
      const venuesData = await venuesRes.json();
      
      setEvents(eventsData);
      setVenues(venuesData);
      
      // Calculate stats
      const now = new Date();
      const upcoming = eventsData.filter((event: Event) => new Date(event.start_date_time) >= now);
      const featured = eventsData.filter((event: Event) => event.is_featured);
      
      setStats({
        totalEvents: eventsData.length,
        featuredEvents: featured.length,
        totalVenues: venuesData.length,
        upcomingEvents: upcoming.length
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Event handlers
  const handleCreateEvent = async () => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...eventFormData,
          is_featured: eventFormData.is_featured ? 1 : 0,
          is_special: eventFormData.is_special ? 1 : 0
        }),
      });

      if (response.ok) {
        await fetchData();
        setShowCreateEventForm(false);
        resetEventForm();
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleUpdateEvent = async (eventId: number) => {
    try {
      const requestData = {
        ...eventFormData,
        is_featured: eventFormData.is_featured ? 1 : 0,
        is_special: eventFormData.is_special ? 1 : 0
      };
      
      console.log('Updating event with data:', requestData);
      
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Update successful:', result);
        await fetchData();
        setEditingEvent(null);
        resetEventForm();
      } else {
        console.error('Response not ok. Status:', response.status);
        const responseText = await response.text();
        console.error('Response text:', responseText);
        
        try {
          const errorData = JSON.parse(responseText);
          console.error('Parsed error data:', errorData);
          const errorMessage = errorData.error || errorData.message || JSON.stringify(errorData);
          alert('Error updating event: ' + errorMessage);
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          console.error('Raw response:', responseText);
          alert('Error updating event: ' + responseText);
        }
      }
    } catch (error) {
      console.error('Error updating event:', error);
      const errorMessage = error instanceof Error ? error.message : 'Network error occurred';
      alert('Error updating event: ' + errorMessage);
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Venue handlers
  const handleCreateVenue = async () => {
    try {
      const response = await fetch('/api/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venueFormData),
      });

      if (response.ok) {
        await fetchData();
        setShowCreateVenueForm(false);
        resetVenueForm();
      } else {
        try {
          const errorData = await response.json();
          console.error('Error creating venue:', errorData);
          const errorMessage = errorData.error || errorData.message || JSON.stringify(errorData);
          alert('Error creating venue: ' + errorMessage);
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          alert('Error creating venue: Server returned an invalid response');
        }
      }
    } catch (error) {
      console.error('Error creating venue:', error);
      const errorMessage = error instanceof Error ? error.message : 'Network error occurred';
      alert('Error creating venue: ' + errorMessage);
    }
  };

  const handleUpdateVenue = async (venueId: number) => {
    try {
      const response = await fetch(`/api/venues/${venueId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venueFormData),
      });

      if (response.ok) {
        await fetchData();
        setEditingVenue(null);
        resetVenueForm();
      } else {
        try {
          const errorData = await response.json();
          console.error('Error updating venue:', errorData);
          const errorMessage = errorData.error || errorData.message || JSON.stringify(errorData);
          alert('Error updating venue: ' + errorMessage);
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          alert('Error updating venue: Server returned an invalid response');
        }
      }
    } catch (error) {
      console.error('Error updating venue:', error);
      const errorMessage = error instanceof Error ? error.message : 'Network error occurred';
      alert('Error updating venue: ' + errorMessage);
    }
  };

  const handleDeleteVenue = async (venueId: number) => {
    if (!confirm('Are you sure you want to delete this venue?')) {
      return;
    }

    try {
      const response = await fetch(`/api/venues/${venueId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
      } else {
        try {
          const errorData = await response.json();
          const errorMessage = errorData.error || errorData.message || 'Error deleting venue';
          alert(errorMessage);
        } catch (parseError) {
          alert('Error deleting venue - Server returned an invalid response');
        }
      }
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  const startEditEvent = (event: Event) => {
    setEditingEvent(event.id);
    setEventFormData({
      title: event.title,
      description: event.description || '',
      venue_id: event.venue_id,
      start_date_time: event.start_date_time,
      end_date_time: event.end_date_time || '',
      price: event.price,
      image_url: event.image_url || '',
      ticket_url: event.ticket_url || '',
      is_featured: Boolean(event.is_featured),
      is_special: Boolean(event.is_special)
    });
  };

  const startEditVenue = (venue: Venue) => {
    setEditingVenue(venue.id);
    setVenueFormData({
      name: venue.name,
      description: venue.description || '',
      address: venue.address || '',
      city: venue.city || '',
      image_url: venue.image_url || '',
      logo_url: venue.logo_url || '',
      website: venue.website || '',
      phone: venue.phone || ''
    });
  };

  const cancelEdit = () => {
    setEditingEvent(null);
    setEditingVenue(null);
    setShowCreateEventForm(false);
    setShowCreateVenueForm(false);
    resetEventForm();
    resetVenueForm();
  };

  const resetEventForm = () => {
    setEventFormData({
      title: '',
      description: '',
      venue_id: 0,
      start_date_time: '',
      end_date_time: '',
      price: null,
      image_url: '',
      ticket_url: '',
      is_featured: false,
      is_special: false
    });
  };

  const resetVenueForm = () => {
    setVenueFormData({
      name: '',
      description: '',
      address: '',
      city: '',
      image_url: '',
      logo_url: '',
      website: '',
      phone: ''
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.start_date_time) >= now)
    .sort((a, b) => new Date(a.start_date_time).getTime() - new Date(b.start_date_time).getTime());
  const pastEvents = events.filter(event => new Date(event.start_date_time) < now)
    .sort((a, b) => new Date(b.start_date_time).getTime() - new Date(a.start_date_time).getTime());

  const displayEvents = showPastEvents ? pastEvents : upcomingEvents;

  // Helper function to check if event is past
  const isEventPast = (event: Event) => new Date(event.start_date_time) < now;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-blue-400 text-lg font-medium">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex flex-col">
      <Navigation />
      
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-6 lg:py-8 flex-1 overflow-x-hidden">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="mb-3 sm:mb-4 lg:mb-6">
            <div className="text-center sm:text-left mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent mb-2 leading-tight">
                Admin Dashboard
              </h1>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-400">Manage your events and venues</p>
            </div>
            
            {/* Responsive button layout */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
              <button
                onClick={() => setShowCreateEventForm(true)}
                className="flex-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center group"
              >
                <Plus size={16} className="mr-1.5 sm:mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Add Event
              </button>
              <button
                onClick={() => setShowCreateVenueForm(true)}
                className="flex-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:shadow-xl hover:shadow-emerald-500/30 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center group"
              >
                <Plus size={16} className="mr-1.5 sm:mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Add Venue
              </button>
            </div>
          </div>

          {/* Stats Cards - Responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
            {stats.totalEvents > 0 && (
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-blue-400 font-medium text-xs uppercase tracking-wide truncate">Total Events</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-1 sm:mt-2">{stats.totalEvents}</p>
                  </div>
                  <div className="bg-blue-500/20 p-2 sm:p-3 rounded-lg flex-shrink-0 ml-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </div>
                </div>
              </div>
            )}

            {stats.upcomingEvents > 0 && (
              <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-emerald-400 font-medium text-xs uppercase tracking-wide truncate">Upcoming</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-1 sm:mt-2">{stats.upcomingEvents}</p>
                  </div>
                  <div className="bg-emerald-500/20 p-2 sm:p-3 rounded-lg flex-shrink-0 ml-2">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  </div>
                </div>
              </div>
            )}

            {stats.featuredEvents > 0 && (
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-purple-400 font-medium text-xs uppercase tracking-wide truncate">Featured</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-1 sm:mt-2">{stats.featuredEvents}</p>
                  </div>
                  <div className="bg-purple-500/20 p-2 sm:p-3 rounded-lg flex-shrink-0 ml-2">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  </div>
                </div>
              </div>
            )}

            {stats.totalVenues > 0 && (
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-orange-400 font-medium text-xs uppercase tracking-wide truncate">Venues</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-1 sm:mt-2">{stats.totalVenues}</p>
                  </div>
                  <div className="bg-orange-500/20 p-2 sm:p-3 rounded-lg flex-shrink-0 ml-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation - Responsive */}
        <div className="flex mb-4 sm:mb-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg sm:rounded-xl p-1">
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 flex items-center justify-center px-2 sm:px-3 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 text-xs sm:text-sm ${
              activeTab === 'events'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span>Events</span>
          </button>
          <button
            onClick={() => setActiveTab('venues')}
            className={`flex-1 flex items-center justify-center px-2 sm:px-3 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 text-xs sm:text-sm ${
              activeTab === 'venues'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span>Venues</span>
          </button>
        </div>

        {/* Create Event Form Modal - Responsive */}
        {showCreateEventForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-2 sm:p-4 overflow-y-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl border border-gray-600/50 shadow-2xl w-full max-w-2xl lg:max-w-4xl my-2 sm:my-4 max-h-screen overflow-hidden">
              <div className="p-3 sm:p-4 border-b border-gray-700/50">
                <div className="flex justify-between items-center">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Create New Event
                  </h3>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-400 hover:text-white p-1.5 sm:p-2 rounded-lg hover:bg-gray-700/50 transition-all"
                  >
                    <X size={18} className="sm:hidden" />
                    <X size={20} className="hidden sm:block" />
                  </button>
                </div>
              </div>
              <div className="p-3 sm:p-4 max-h-[70vh] sm:max-h-[80vh] overflow-y-auto">
                <EventForm 
                  formData={eventFormData}
                  setFormData={setEventFormData}
                  venues={venues}
                  onSubmit={handleCreateEvent}
                  onCancel={cancelEdit}
                  isEditing={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* Create Venue Form Modal - Responsive */}
        {showCreateVenueForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-2 sm:p-4 overflow-y-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl border border-gray-600/50 shadow-2xl w-full max-w-2xl lg:max-w-4xl my-2 sm:my-4 max-h-screen overflow-hidden">
              <div className="p-3 sm:p-4 border-b border-gray-700/50">
                <div className="flex justify-between items-center">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Create New Venue
                  </h3>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-400 hover:text-white p-1.5 sm:p-2 rounded-lg hover:bg-gray-700/50 transition-all"
                  >
                    <X size={18} className="sm:hidden" />
                    <X size={20} className="hidden sm:block" />
                  </button>
                </div>
              </div>
              <div className="p-3 sm:p-4 max-h-[70vh] sm:max-h-[80vh] overflow-y-auto">
                <VenueForm 
                  formData={venueFormData}
                  setFormData={setVenueFormData}
                  onSubmit={handleCreateVenue}
                  onCancel={cancelEdit}
                  isEditing={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* Events Management */}
        {activeTab === 'events' && (
          <div className="w-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-700/50">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
                      <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-white">Event Management</h2>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    {events.length} total events
                  </div>
                </div>
                
                {/* Toggle between upcoming and past events */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-300">
                      Showing: <span className="font-semibold text-white">
                        {showPastEvents ? `Past Events (${pastEvents.length})` : `Upcoming Events (${upcomingEvents.length})`}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPastEvents(!showPastEvents)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      showPastEvents
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    }`}
                  >
                    {showPastEvents ? 'Show Upcoming' : 'Show Past Events'}
                  </button>
                </div>
              </div>
            </div>

            {displayEvents.length === 0 ? (
              <div className="p-4 sm:p-6 lg:p-8 xl:p-12 text-center">
                <Calendar className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-gray-500 mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
                  {showPastEvents ? 'No past events found' : 'No upcoming events found'}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {showPastEvents ? 'Switch to upcoming events or create new events' : 'Click "Add Event" to get started'}
                </p>
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block sm:hidden">
                  <div className="space-y-3 p-3">
                    {displayEvents.map((event) => (
                      <div key={event.id} className={`${isEventPast(event) ? 'bg-yellow-900/20 border-yellow-600/30' : 'bg-gray-800/30 border-gray-700/30'} rounded-xl p-3 border`}>
                        {editingEvent === event.id ? (
                          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-3 border border-gray-600/50">
                            <EventForm 
                              formData={eventFormData}
                              setFormData={setEventFormData}
                              venues={venues}
                              onSubmit={() => handleUpdateEvent(event.id)}
                              onCancel={cancelEdit}
                              isEditing={true}
                            />
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              {event.image_url ? (
                                <div className="w-12 h-12 rounded-lg overflow-hidden ring-2 ring-gray-600/50 flex-shrink-0">
                                  <img 
                                    src={event.image_url} 
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                  <Calendar className="w-5 h-5 text-blue-400" />
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-white truncate">{event.title}</div>
                                <div className="text-xs text-gray-400 truncate">{event.venue_name}</div>
                                <div className="text-xs text-gray-500 mt-1">{formatDateTime(event.start_date_time)}</div>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                              {event.is_featured && (
                                <div className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-900/30 to-pink-900/30 text-purple-300 border border-purple-500/30">
                                  <Star size={8} className="mr-1" />
                                  Featured
                                </div>
                              )}
                              {event.is_special && (
                                <div className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-orange-900/30 to-yellow-900/30 text-orange-300 border border-orange-500/30">
                                  <Star size={8} className="mr-1" />
                                  Special
                                </div>
                              )}
                                {event.price ? (
                                  <div className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-emerald-900/30 text-emerald-400 border border-emerald-500/30">
                                    ${event.price}
                                  </div>
                                ) : (
                                  <div className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-gray-700/50 text-gray-400 border border-gray-600/50">
                                    Free
                                  </div>
                                )}
                              <div className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold ${
                                new Date(event.start_date_time) > new Date()
                                  ? 'bg-blue-900/30 text-blue-400 border border-blue-500/30'
                                  : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
                              }`}>
                                {new Date(event.start_date_time) > new Date() ? 'Upcoming' : 'Past'}
                              </div>
                            </div>

                            <div className="flex gap-2 pt-2 border-t border-gray-700/50">
                              <button
                                onClick={() => startEditEvent(event)}
                                className="flex-1 text-blue-400 hover:text-blue-300 px-3 py-2 rounded-lg hover:bg-blue-900/20 transition-all duration-200 text-xs font-medium flex items-center justify-center"
                              >
                                <Edit3 size={12} className="mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="flex-1 text-red-400 hover:text-red-300 px-3 py-2 rounded-lg hover:bg-red-900/20 transition-all duration-200 text-xs font-medium flex items-center justify-center"
                              >
                                <Trash2 size={12} className="mr-1" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Desktop Table View */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                  <thead>
                      <tr className="bg-gradient-to-r from-gray-700/50 to-gray-800/50">
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Event</th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider hidden md:table-cell">Venue</th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider hidden lg:table-cell">Schedule</th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider hidden lg:table-cell">Price</th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider hidden md:table-cell">Status</th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                  <tbody>
                    {displayEvents.map((event, index) => (
                      <tr key={event.id} className={`${
                        isEventPast(event) 
                          ? 'bg-yellow-900/20 hover:bg-yellow-800/30 border-b border-yellow-600/30' 
                          : `${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-700/20'} hover:bg-blue-900/20 border-b border-gray-700/30`
                      } transition-all duration-200`}>
                        {editingEvent === event.id ? (
                            <td colSpan={6} className="p-3 sm:p-4 lg:p-6">
                              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-3 sm:p-4 lg:p-6 border border-gray-600/50">
                                <EventForm 
                                  formData={eventFormData}
                                  setFormData={setEventFormData}
                                  venues={venues}
                                  onSubmit={() => handleUpdateEvent(event.id)}
                                  onCancel={cancelEdit}
                                  isEditing={true}
                                />
                              </div>
                            </td>
                        ) : (
                          <>
                            <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4">
                              <div className="flex items-center">
                                {event.image_url ? (
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl overflow-hidden mr-2 sm:mr-3 lg:mr-4 ring-2 ring-gray-600/50 flex-shrink-0">
                                    <img 
                                      src={event.image_url} 
                                      alt={event.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mr-2 sm:mr-3 lg:mr-4 flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-blue-400" />
                                  </div>
                                )}
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs sm:text-sm font-semibold text-white truncate">{event.title}</div>
                                  <div className="text-xs text-gray-400 sm:hidden truncate">{event.venue_name}</div>
                                  <div className="text-xs text-gray-400 hidden sm:block line-clamp-2 mt-1">{event.description || 'No description'}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 hidden md:table-cell">
                              <div className="flex items-center">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 mr-2 sm:mr-3 flex-shrink-0"></div>
                                <div className="min-w-0">
                                  <div className="text-xs sm:text-sm font-medium text-white truncate">{event.venue_name}</div>
                                  <div className="text-xs text-gray-400 truncate">{event.venue_city || 'Unknown location'}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 hidden lg:table-cell">
                              <div className="text-xs sm:text-sm text-gray-300">
                                <div className="font-medium">{formatDateTime(event.start_date_time)}</div>
                                {event.end_date_time && (
                                  <div className="text-xs text-gray-500">Ends: {formatDateTime(event.end_date_time)}</div>
                                )}
                              </div>
                            </td>
                            <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 hidden lg:table-cell">
                              {event.price ? (
                                <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-900/30 text-emerald-400 border border-emerald-500/30">
                                  ${event.price}
                                </div>
                              ) : (
                                <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-lg text-xs font-semibold bg-gray-700/50 text-gray-400 border border-gray-600/50">
                                  Free
                                </div>
                              )}
                            </td>
                            <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 hidden md:table-cell">
                              <div className="flex flex-col space-y-1">
                                {event.is_featured && (
                                  <div className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-900/30 to-pink-900/30 text-purple-300 border border-purple-500/30 w-fit">
                                    <Star size={8} className="mr-1" />
                                    Featured
                                  </div>
                                )}
                                {event.is_special && (
                                  <div className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-orange-900/30 to-yellow-900/30 text-orange-300 border border-orange-500/30 w-fit">
                                    <Star size={8} className="mr-1" />
                                    Special
                                  </div>
                                )}
                                <div className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold w-fit ${
                                  new Date(event.start_date_time) > new Date()
                                    ? 'bg-blue-900/30 text-blue-400 border border-blue-500/30'
                                    : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
                                }`}>
                                  {new Date(event.start_date_time) > new Date() ? 'Upcoming' : 'Past'}
                                </div>
                              </div>
                            </td>
                            <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4">
                              <div className="flex items-center justify-end gap-1 sm:gap-2">
                                <button
                                  onClick={() => startEditEvent(event)}
                                  className="text-blue-400 hover:text-blue-300 p-1.5 sm:p-2 rounded-lg hover:bg-blue-900/20 transition-all duration-200 group"
                                >
                                  <Edit3 size={12} className="sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="text-red-400 hover:text-red-300 p-1.5 sm:p-2 rounded-lg hover:bg-red-900/20 transition-all duration-200 group"
                                >
                                  <Trash2 size={12} className="sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* Venues Management */}
        {activeTab === 'venues' && (
          <div className="w-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-700/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-white">Venue Management</h2>
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {venues.length} total venues
                </div>
              </div>
            </div>

            {venues.length === 0 ? (
              <div className="p-4 sm:p-6 lg:p-8 xl:p-12 text-center">
                <Building2 className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-gray-500 mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg">No venues created yet</p>
                <p className="text-gray-500 text-xs sm:text-sm">Click "Add Venue" to get started</p>
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block sm:hidden">
                  <div className="space-y-3 p-3">
                    {venues.map((venue) => {
                      const venueEvents = events.filter(event => event.venue_id === venue.id);
                      return (
                        <div key={venue.id} className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/30">
                          {editingVenue === venue.id ? (
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-3 border border-gray-600/50">
                              <VenueForm 
                                formData={venueFormData}
                                setFormData={setVenueFormData}
                                onSubmit={() => handleUpdateVenue(venue.id)}
                                onCancel={cancelEdit}
                                isEditing={true}
                              />
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3">
                                {venue.image_url ? (
                                  <div className="w-12 h-12 rounded-lg overflow-hidden ring-2 ring-gray-600/50 flex-shrink-0">
                                    <img 
                                      src={venue.image_url} 
                                      alt={venue.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                                    <Building2 className="w-5 h-5 text-emerald-400" />
                                  </div>
                                )}
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-semibold text-white truncate">{venue.name}</div>
                                  <div className="text-xs text-gray-400 truncate">{venue.city}</div>
                                  <div className="text-xs text-gray-500 truncate">{venue.address}</div>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1">
                                <div className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-emerald-900/30 text-emerald-400 border border-emerald-500/30">
                                  <Users size={10} className="mr-1" />
                                  {venueEvents.length} events
                                </div>
                                {venue.phone && (
                                  <div className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-gray-700/50 text-gray-400 border border-gray-600/50">
                                    <Phone size={10} className="mr-1" />
                                    Phone
                                  </div>
                                )}
                                {venue.website && (
                                  <div className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-gray-700/50 text-gray-400 border border-gray-600/50">
                                    <Globe size={10} className="mr-1" />
                                    Website
                                  </div>
                                )}
                              </div>

                              <div className="flex gap-2 pt-2 border-t border-gray-700/50">
                                <button
                                  onClick={() => startEditVenue(venue)}
                                  className="flex-1 text-emerald-400 hover:text-emerald-300 px-3 py-2 rounded-lg hover:bg-emerald-900/20 transition-all duration-200 text-xs font-medium flex items-center justify-center"
                                >
                                  <Edit3 size={12} className="mr-1" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteVenue(venue.id)}
                                  disabled={venueEvents.length > 0}
                                  className={`flex-1 px-3 py-2 rounded-lg transition-all duration-200 text-xs font-medium flex items-center justify-center ${
                                    venueEvents.length > 0 
                                      ? 'text-gray-500 cursor-not-allowed' 
                                      : 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
                                  }`}
                                >
                                  <Trash2 size={12} className="mr-1" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Desktop Table View */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                  <thead>
                      <tr className="bg-gradient-to-r from-gray-700/50 to-gray-800/50">
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Venue</th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider hidden lg:table-cell">Location</th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider hidden xl:table-cell">Contact</th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider hidden md:table-cell">Events</th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                  <tbody>
                    {venues.map((venue, index) => {
                      const venueEvents = events.filter(event => event.venue_id === venue.id);
                      return (
                        <tr key={venue.id} className={`${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-700/20'} hover:bg-emerald-900/20 transition-all duration-200 border-b border-gray-700/30`}>
                          {editingVenue === venue.id ? (
                            <td colSpan={5} className="p-3 sm:p-4 lg:p-6">
                              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-3 sm:p-4 lg:p-6 border border-gray-600/50">
                                <VenueForm 
                                  formData={venueFormData}
                                  setFormData={setVenueFormData}
                                  onSubmit={() => handleUpdateVenue(venue.id)}
                                  onCancel={cancelEdit}
                                  isEditing={true}
                                />
                              </div>
                            </td>
                          ) : (
                            <>
                              <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4">
                                <div className="flex items-center">
                                  {venue.image_url ? (
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl overflow-hidden mr-2 sm:mr-3 lg:mr-4 ring-2 ring-gray-600/50 flex-shrink-0">
                                      <img 
                                        src={venue.image_url} 
                                        alt={venue.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mr-2 sm:mr-3 lg:mr-4 flex items-center justify-center flex-shrink-0">
                                      <Building2 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-emerald-400" />
                                    </div>
                                  )}
                                  <div className="min-w-0 flex-1">
                                    <div className="text-xs sm:text-sm font-semibold text-white truncate">{venue.name}</div>
                                    <div className="text-xs text-gray-400 sm:hidden truncate">{venue.city}</div>
                                    <div className="text-xs text-gray-400 hidden sm:block line-clamp-2 mt-1">{venue.description || 'No description'}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 hidden lg:table-cell">
                                <div className="flex items-center">
                                  <MapPin size={12} className="sm:w-4 sm:h-4 mr-2 text-emerald-400 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <div className="text-xs sm:text-sm text-gray-300 truncate">{venue.city || 'Unknown city'}</div>
                                    <div className="text-xs text-gray-500 truncate">{venue.address || 'No address'}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 hidden xl:table-cell">
                                <div className="space-y-1">
                                  {venue.phone && (
                                    <div className="flex items-center text-xs text-gray-400">
                                      <Phone size={10} className="sm:w-3 sm:h-3 mr-2 text-emerald-400" />
                                      <span className="truncate">{venue.phone}</span>
                                    </div>
                                  )}
                                  {venue.website && (
                                    <div className="flex items-center text-xs text-gray-400">
                                      <Globe size={10} className="sm:w-3 sm:h-3 mr-2 text-emerald-400" />
                                      <span className="truncate">Website</span>
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 hidden md:table-cell">
                                <div className="flex items-center">
                                  <Users size={12} className="sm:w-4 sm:h-4 mr-2 text-emerald-400" />
                                  <span className="text-xs sm:text-sm font-semibold text-white">{venueEvents.length}</span>
                                  <span className="text-xs text-gray-400 ml-1">events</span>
                                </div>
                              </td>
                              <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4">
                              <div className="flex items-center justify-end gap-1 sm:gap-2">
                                <button
                                  onClick={() => startEditVenue(venue)}
                                  className="text-emerald-400 hover:text-emerald-300 p-1.5 sm:p-2 rounded-lg hover:bg-emerald-900/20 transition-all duration-200 group"
                                >
                                  <Edit3 size={12} className="sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                  onClick={() => handleDeleteVenue(venue.id)}
                                  disabled={venueEvents.length > 0}
                                  className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 group ${
                                    venueEvents.length > 0 
                                      ? 'text-gray-500 cursor-not-allowed' 
                                      : 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
                                  }`}
                                  title={venueEvents.length > 0 ? 'Cannot delete venue with existing events' : 'Delete venue'}
                                >
                                  <Trash2 size={12} className={`sm:w-4 sm:h-4 group-hover:scale-110 transition-transform ${venueEvents.length > 0 ? 'opacity-50' : ''}`} />
                                </button>
                              </div>
                            </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

interface EventFormProps {
  formData: EventForm;
  setFormData: (data: EventForm) => void;
  venues: Venue[];
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

function EventForm({ formData, setFormData, venues, onSubmit, onCancel, isEditing }: EventFormProps) {
  const handleInputChange = (field: keyof EventForm, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-gray-300">
            Event Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
            placeholder="Enter event title"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            Venue *
          </label>
          <select
            value={formData.venue_id}
            onChange={(e) => handleInputChange('venue_id', parseInt(e.target.value))}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
            required
          >
            <option value={0}>Select a venue</option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            Start Date & Time *
          </label>
          <input
            type="datetime-local"
            value={formData.start_date_time}
            onChange={(e) => handleInputChange('start_date_time', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            value={formData.end_date_time}
            onChange={(e) => handleInputChange('end_date_time', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.price || ''}
            onChange={(e) => handleInputChange('price', e.target.value ? parseFloat(e.target.value) : null)}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            Event Image
          </label>
          <div className="flex gap-3">
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => handleInputChange('image_url', e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
              placeholder="Image URL or upload file"
            />
              <label className="px-4 py-3 bg-gradient-to-r from-blue-600/50 to-cyan-500/50 border border-blue-500/30 rounded-xl hover:border-blue-400/50 cursor-pointer transition-all flex items-center relative overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const label = e.currentTarget.parentElement;
                      label?.classList.add('uploading');
                      try {
                        const formData = new FormData();
                        formData.append('file', file);
                        const response = await fetch('/api/events/upload-image', {
                          method: 'POST',
                          body: formData
                        });
                        
                        if (!response.ok) throw new Error('Upload failed');
                        
                        const { url } = await response.json();
                        handleInputChange('image_url', url);
                        label?.classList.add('upload-success');
                        setTimeout(() => label?.classList.remove('upload-success'), 2000);
                      } catch (error) {
                        label?.classList.add('upload-error');
                        setTimeout(() => label?.classList.remove('upload-error'), 2000);
                        console.error('Upload error:', error);
                      } finally {
                        label?.classList.remove('uploading');
                      }
                    }
                  }}
                  className="hidden"
                />
                <span className="text-sm font-medium text-blue-300 relative z-10">Upload</span>
                <span className="absolute inset-0 bg-blue-600/50 transition-all duration-300 scale-x-0 origin-left uploading:scale-x-100"></span>
                <span className="absolute inset-0 bg-emerald-600/80 opacity-0 transition-opacity duration-300 upload-success:opacity-100 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">✓ Uploaded</span>
                </span>
                <span className="absolute inset-0 bg-red-600/80 opacity-0 transition-opacity duration-300 upload-error:opacity-100 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Upload Failed</span>
                </span>
              </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            Ticket URL
          </label>
          <input
            type="url"
            value={formData.ticket_url}
            onChange={(e) => handleInputChange('ticket_url', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
            placeholder="https://tickets.example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm resize-none"
            placeholder="Event description"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => handleInputChange('is_featured', e.target.checked)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-md border-2 mr-3 transition-all duration-200 ${
              formData.is_featured 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400' 
                : 'border-gray-500 group-hover:border-purple-400'
            }`}>
              {formData.is_featured && (
                <Star size={12} className="text-white m-0.5" />
              )}
            </div>
            <div>
              <span className="text-sm font-semibold text-purple-300">Featured Event</span>
              <div className="text-xs text-gray-400">Show this event prominently on the homepage</div>
            </div>
          </label>
        </div>

        <div className="space-y-2">
          <label className="flex items-center p-4 bg-gradient-to-r from-orange-900/20 to-yellow-900/20 rounded-xl border border-orange-500/30 hover:border-orange-400/50 transition-all cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.is_special}
              onChange={(e) => handleInputChange('is_special', e.target.checked)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-md border-2 mr-3 transition-all duration-200 ${
              formData.is_special 
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 border-orange-400' 
                : 'border-gray-500 group-hover:border-orange-400'
            }`}>
              {formData.is_special && (
                <Star size={12} className="text-white m-0.5" />
              )}
            </div>
            <div>
              <span className="text-sm font-semibold text-orange-300">Special Event</span>
              <div className="text-xs text-gray-400">Show this event in the special events section</div>
            </div>
          </label>
        </div>
      </div>

      {/* Responsive form buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-gray-700/50">
        <button
          onClick={onSubmit}
          disabled={!formData.title || !formData.venue_id || !formData.start_date_time}
          className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none order-2 sm:order-1"
        >
          <Save size={14} className="sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          {isEditing ? 'Update Event' : 'Create Event'}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700/50 border border-gray-600/50 text-white rounded-lg sm:rounded-xl text-sm sm:text-base hover:bg-gray-600/50 hover:border-gray-500/50 transition-all duration-200 flex items-center justify-center font-medium order-1 sm:order-2"
        >
          <X size={14} className="sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
}

interface VenueFormProps {
  formData: VenueForm;
  setFormData: (data: VenueForm) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

function VenueForm({ formData, setFormData, onSubmit, onCancel, isEditing }: VenueFormProps) {
  const handleInputChange = (field: keyof VenueForm, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            Venue Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all backdrop-blur-sm"
            placeholder="Enter venue name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all backdrop-blur-sm"
            placeholder="Enter city"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all backdrop-blur-sm"
            placeholder="Enter street address"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all backdrop-blur-sm"
            placeholder="Enter phone number"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            Website
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all backdrop-blur-sm"
            placeholder="https://example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            Image URL
          </label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => handleInputChange('image_url', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all backdrop-blur-sm"
            placeholder="https://example.com/venue.jpg"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            Logo URL
          </label>
          <input
            type="url"
            value={formData.logo_url}
            onChange={(e) => handleInputChange('logo_url', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all backdrop-blur-sm"
            placeholder="https://example.com/logo.png"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-300">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all backdrop-blur-sm resize-none"
            placeholder="Venue description"
          />
        </div>
      </div>

      {/* Responsive form buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-gray-700/50">
        <button
          onClick={onSubmit}
          disabled={!formData.name}
          className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:shadow-xl hover:shadow-emerald-500/30 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none order-2 sm:order-1"
        >
          <Save size={14} className="sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          {isEditing ? 'Update Venue' : 'Create Venue'}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700/50 border border-gray-600/50 text-white rounded-lg sm:rounded-xl text-sm sm:text-base hover:bg-gray-600/50 hover:border-gray-500/50 transition-all duration-200 flex items-center justify-center font-medium order-1 sm:order-2"
        >
          <X size={14} className="sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
}
