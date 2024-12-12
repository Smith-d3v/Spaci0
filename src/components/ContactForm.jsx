import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { db } from '../../configs'
import { ContactSubmissions } from '../../configs/schema'

function ContactForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    phoneCode: '+1',
    message: ''
  })

  const countryCodes = [
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await db.insert(ContactSubmissions).values({
        ...formData,
        phone: formData.phone ? `${formData.phoneCode}${formData.phone}` : null,
        submittedOn: new Date().toISOString()
      })
      
      toast.success('Message sent!')
      navigate('/')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to send message')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="h-screen bg-gradient-to-br from-yellow-50 via-gray-50 to-purple-50 py-4">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4">
          <h1 className="text-lg font-bold text-gray-900">Contact Form</h1>
          <p className="text-xs text-gray-600 mb-3">Get in touch with us</p>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="block text-gray-900 text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                  <p className="mt-0.5 text-xs text-gray-500">First Name</p>
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                  <p className="mt-0.5 text-xs text-gray-500">Last Name</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
              <p className="mt-0.5 text-xs text-gray-500">Please enter your email so we can revert to you</p>
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-medium">
                Phone
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent pl-[6.5rem]"
                  placeholder="Enter phone number"
                />
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <select
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleChange}
                    className="h-full rounded-l-md border-r border-gray-300 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-0 text-sm appearance-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  >
                    {countryCodes.map((country) => (
                      <option 
                        key={`${country.code}-${country.country}`} 
                        value={country.code}
                        className="flex items-center gap-2"
                      >
                        <span role="img" aria-label={country.country} className="mr-2">
                          {country.flag}
                        </span>
                        {country.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="mt-0.5 text-xs text-gray-500">(Optional)</p>
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-medium">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                required
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-1.5 px-6 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm