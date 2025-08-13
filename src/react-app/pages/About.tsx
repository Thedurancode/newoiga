import { Users, Zap, Award, Heart, Calendar, MapPin } from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import Footer from '@/react-app/components/Footer';
import { Link } from 'react-router';

export default function About() {
  const stats = [
    { number: '10,000+', label: 'Events Promoted' },
    { number: '500+', label: 'Partner Venues' },
    { number: '1M+', label: 'Event Attendees' },
    { number: '50+', label: 'Cities Covered' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Events',
      description: 'We believe every event deserves an audience and every audience deserves an amazing experience.'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'Using cutting-edge technology to connect event organizers with their perfect audience.'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Building stronger communities by bringing people together through unforgettable experiences.'
    },
    {
      icon: Award,
      title: 'Excellence Driven',
      description: 'Committed to delivering exceptional results for every venue and event we promote.'
    }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About 
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> OigaEvents</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to transform how people discover and experience events, 
              connecting amazing venues with passionate audiences worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Founded in 2020, OigaEvents emerged from a simple observation: too many amazing events 
                were struggling to find their audience, while people were missing out on experiences 
                they would love.
              </p>
              <p>
                We started as a small team of event enthusiasts and tech innovators who believed 
                there had to be a better way to connect venues, organizers, and attendees. Today, 
                we've grown into a trusted platform that helps thousands of events reach their 
                perfect audience.
              </p>
              <p>
                Our platform combines intelligent event discovery with comprehensive marketing 
                support, ensuring every event gets the visibility it deserves while helping 
                people discover experiences that enrich their lives.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=600&fit=crop" 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Calendar className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The principles that guide everything we do and every decision we make.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-lg mr-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{value.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl p-12 text-center border border-blue-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of venues and event organizers who trust us to help them reach their audience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/work-with-us" 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200 inline-flex items-center justify-center"
            >
              <MapPin size={20} className="mr-2" />
              Submit Your Venue
            </Link>
            <Link 
              to="/events" 
              className="bg-gray-800 text-blue-400 border-2 border-blue-400 px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 hover:border-blue-300 transition-all duration-200 inline-flex items-center justify-center"
            >
              <Calendar size={20} className="mr-2" />
              Browse Events
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
