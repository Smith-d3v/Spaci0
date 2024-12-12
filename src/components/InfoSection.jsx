import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function InfoSection() {
  const navigate = useNavigate()

  return (
    <div>
        <section>
            <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                <div className="relative z-10 lg:py-16">
                    <div className="relative h-64 sm:h-80 lg:h-full">
                    <img
                        alt=""
                        src="https://www.xbdesign.com/wp-content/uploads/2022/12/8.-Metropolitan-Towers-1.jpg"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    </div>
                </div>

                <div className="relative flex items-center bg-gray-100">
                    <span
                    className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"
                    ></span>

                    <div className="p-8 sm:p-16 lg:p-24">
                    <h2 className="text-2xl font-bold sm:text-3xl">
                        Trusted Listings, Tailored to Your Needs
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Finding the perfect space—whether a home, office, or land—can be challenging. That's why we're here to make it simpler, safer, and stress-free.
                    </p>

                    <p className="mt-8 text-gray-600">
                        Let us help you find a place you'll love. Browse our listings now or get in touch for more details.
                    </p>

                    <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          navigate('/contact')
                        }}
                        className="mt-8 inline-block rounded border border-black bg-black px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-gray-800 shadow-md shadow-gray-400"
                    >
                        Get in Touch
                    </a>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default InfoSection