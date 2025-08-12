import { useState } from 'react';
import { Megaphone, Star, CheckCircle, Send, Building2, Music, Users } from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import Footer from '@/react-app/components/Footer';

export default function WorkWithUs() {
  const [activeTab, setActiveTab] = useState<'venue' | 'event'>('venue');
  const [venueForm, setVenueForm] = useState({
    name: '',
    email: '',
    phone: '',
    venueName: '',
    venueAddress: '',
    venueCity: '',
    venueWebsite: '',
    venueDescription: '',
    capacity: '',
    venueType: ''
  });
  
  const [eventForm, setEventForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventTitle: '',
    eventDate: '',
    eventDescription: '',
    venueName: '',
    ticketPrice: '',
    eventType: '',
    expectedAttendees: ''
  });

  const benefits = [
    {
      icon: Megaphone,
      title: 'Full Marketing Support',
      description: 'We handle all your marketing needs - from social media campaigns to targeted advertising, ensuring maximum visibility for your events.'
    },
    {
      icon: Users,
      title: 'Audience Reach',
      description: 'Tap into our network of over 1 million event enthusiasts actively looking for their next amazing experience.'
    },
    {
      icon: Star,
      title: 'Premium Promotion',
      description: 'Featured placement on our homepage, email newsletters, and social media channels to maximize your event exposure.'
    },
    {
      icon: CheckCircle,
      title: 'No Upfront Costs',
      description: 'We only succeed when you do. Our revenue-sharing model means no upfront marketing costs for you.'
    }
  ];

  const handleVenueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Venue submission:', venueForm);
    alert('Thank you for your submission! We\'ll be in touch within 24 hours.');
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Event submission:', eventForm);
    alert('Thank you for your submission! We\'ll be in touch within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Work With
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Partner with OigaEvents and let us handle the marketing while you focus on creating 
              amazing experiences. We'll bring the audience to you.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Partner With Us?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We take care of the marketing so you can focus on what you do best - creating incredible events and experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-lg mr-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Get Started Today</h2>
          <p className="text-xl text-gray-300">
            Submit your venue or event details and we'll handle the rest
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setActiveTab('venue')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                activeTab === 'venue'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Building2 size={20} />
              <span>Submit Venue</span>
            </button>
            <button
              onClick={() => setActiveTab('event')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                activeTab === 'event'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Music size={20} />
              <span>Submit Event</span>
            </button>
          </div>
        </div>

        {/* Venue Form */}
        {activeTab === 'venue' && (
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center mb-6">
              <Building2 className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">Venue Partnership</h3>
            </div>
            <form onSubmit={handleVenueSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={venueForm.name}
                    onChange={(e) => setVenueForm({...venueForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={venueForm.email}
                    onChange={(e) => setVenueForm({...venueForm, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={venueForm.phone}
                    onChange={(e) => setVenueForm({...venueForm, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Venue Type</label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={venueForm.venueType}
                    onChange={(e) => setVenueForm({...venueForm, venueType: e.target.value})}
                  >
                    <option value="">Select venue type</option>
                    <option value="concert-hall">Concert Hall</option>
                    <option value="theater">Theater</option>
                    <option value="club">Club/Lounge</option>
                    <option value="conference-center">Conference Center</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="gallery">Gallery</option>
                    <option value="outdoor">Outdoor Space</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Venue Name *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  value={venueForm.venueName}
                  onChange={(e) => setVenueForm({...venueForm, venueName: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Address *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={venueForm.venueAddress}
                    onChange={(e) => setVenueForm({...venueForm, venueAddress: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">City *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={venueForm.venueCity}
                    onChange={(e) => setVenueForm({...venueForm, venueCity: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Website</label>
                  <input
                    type="url"
                    placeholder="https://"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={venueForm.venueWebsite}
                    onChange={(e) => setVenueForm({...venueForm, venueWebsite: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Capacity</label>
                  <input
                    type="number"
                    placeholder="Max number of guests"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={venueForm.capacity}
                    onChange={(e) => setVenueForm({...venueForm, capacity: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Venue Description *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your venue, its unique features, and what makes it special..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  value={venueForm.venueDescription}
                  onChange={(e) => setVenueForm({...venueForm, venueDescription: e.target.value})}
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
              >
                <Send size={20} className="mr-2" />
                Submit Venue for Partnership
              </button>
            </form>
          </div>
        )}

        {/* Event Form */}
        {activeTab === 'event' && (
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center mb-6">
              <Music className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">Event Promotion</h3>
            </div>
            <form onSubmit={handleEventSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={eventForm.name}
                    onChange={(e) => setEventForm({...eventForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={eventForm.email}
                    onChange={(e) => setEventForm({...eventForm, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={eventForm.phone}
                    onChange={(e) => setEventForm({...eventForm, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Event Type</label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={eventForm.eventType}
                    onChange={(e) => setEventForm({...eventForm, eventType: e.target.value})}
                  >
                    <option value="">Select event type</option>
                    <option value="concert">Concert</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="party">Party/Social</option>
                    <option value="exhibition">Exhibition</option>
                    <option value="theater">Theater/Show</option>
                    <option value="sports">Sports</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Event Title *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  value={eventForm.eventTitle}
                  onChange={(e) => setEventForm({...eventForm, eventTitle: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Event Date *</label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={eventForm.eventDate}
                    onChange={(e) => setEventForm({...eventForm, eventDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Venue Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Where will this event take place?"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={eventForm.venueName}
                    onChange={(e) => setEventForm({...eventForm, venueName: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Ticket Price</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Leave blank if free"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={eventForm.ticketPrice}
                    onChange={(e) => setEventForm({...eventForm, ticketPrice: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Expected Attendees</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="How many people do you expect?"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    value={eventForm.expectedAttendees}
                    onChange={(e) => setEventForm({...eventForm, expectedAttendees: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Event Description *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your event, its purpose, target audience, and what makes it special..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  value={eventForm.eventDescription}
                  onChange={(e) => setEventForm({...eventForm, eventDescription: e.target.value})}
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
              >
                <Send size={20} className="mr-2" />
                Submit Event for Promotion
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Marketing Promise Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-12 text-center border border-purple-500/20">
          <Megaphone className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            We Handle The Marketing
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Once you partner with us, our dedicated marketing team creates targeted campaigns, 
            manages social media promotion, and leverages our extensive network to ensure your 
            venue or event reaches the right audience at the right time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h4 className="font-bold text-white mb-2">Social Media Campaigns</h4>
              <p className="text-gray-300 text-sm">Targeted posts across all major platforms</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h4 className="font-bold text-white mb-2">Email Marketing</h4>
              <p className="text-gray-300 text-sm">Reach our subscriber base of event enthusiasts</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h4 className="font-bold text-white mb-2">Featured Listings</h4>
              <p className="text-gray-300 text-sm">Premium placement on our platform</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
