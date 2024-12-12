import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Logo - Updated to be a link */}
      <div className="absolute top-8 left-8">
        <Link to="/">
          <img 
            src="/logo.svg" 
            alt="Spacio Logo" 
            className="h-12 cursor-pointer hover:opacity-80 transition-opacity" 
          />
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Main Title */}
        <h1 className="text-6xl font-bold text-black pt-40 mb-17 text-center">About Spacio</h1>

        {/* Why We Started */}
        <section className="py-10 border-b border-gray-200">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-8">Why We Started</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Everywhere you look in Nigeria, the skyline is changing. New buildings are rising, neighborhoods are expanding, and opportunities are growing. But amid this rapid real estate boom, something was missing—a trusted platform to connect property owners with seekers.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                That's where Spacio comes in.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-12">
                We created Spacio to bridge this gap, offering a space where finding your dream property—or listing one—is seamless, secure, and stress-free.
              </p>
            </div>
            <img
              src="https://eiti.org/sites/default/files/styles/full_height_hero_desktop/public/2022-03/Nigeria_shutterstock_2059372682.jpg"
              alt="Lagos Skyline"
              className="w-full h-[600px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Our Vision */}
        <section className="py-20 border-b border-gray-200">
          <h2 className="text-4xl font-bold mb-8">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To become the most trusted platform worldwide for property rentals and purchases, setting the standard for transparency, accessibility, and exceptional service.
          </p>
        </section>

        {/* How It Works */}
        <section className="py-20 border-b border-gray-200">
          <h2 className="text-4xl font-bold mb-8">How It Works</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-gray-500">01</span>
              <p className="text-gray-700 text-lg">Explore Properties: Use our user-friendly platform to discover a wide variety of spaces</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-gray-500">02</span>
              <p className="text-gray-700 text-lg">Refined Listings: Every property goes through rigorous vetting</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-gray-500">03</span>
              <p className="text-gray-700 text-lg">Secure Connections: Chat directly with property listers</p>
            </div>
          </div>
        </section>

        {/* Why Choose Spacio */}
        <section className="py-20 border-b border-gray-200">
          <h2 className="text-4xl font-bold mb-8">Why Choose Spacio?</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-gray-500">•</span>
              <p className="text-gray-700 text-lg">Simplicity: Clean, intuitive design for easy navigation</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-gray-500">•</span>
              <p className="text-gray-700 text-lg">Inclusivity Meets Quality: Properties for all budgets</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-gray-500">•</span>
              <p className="text-gray-700 text-lg">Safety First: Vetted listings and secure communications</p>
            </div>
          </div>
        </section>

        {/* Meet the Founder - Updated image path and styling */}
        <section className="py-20 border-b border-gray-200">
          <h2 className="text-4xl font-bold mb-8">Meet the Founder</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="/IMG_0234.png"
              alt="Founder of Spacio"
              className="w-full h-[400px] object-cover object-center rounded-lg shadow-lg"
              onError={(e) => {
                console.error('Image failed to load:', e);
                e.target.onerror = null;
              }}
            />
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                Spacio is a one-person initiative, led by a passionate founder dedicated to transforming how properties are discovered and listed in Nigeria.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                But building something truly impactful requires collaboration. That's why we're looking for people who share the same vision. Whether you're a talented photographer, a software engineer, or an investor ready to add value to Spacio, we'd love to hear from you.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Together, we can redefine property discovery and create something extraordinary.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="py-20 text-center">
          <Link 
            to="/add-listing"
            className="inline-block bg-black text-white px-12 py-4 text-lg font-semibold hover:bg-gray-800 transition-colors shadow-gray-400 shadow-md"
          >
            List A Property
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About; 