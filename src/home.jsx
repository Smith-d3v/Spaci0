import { SignInButton } from '@clerk/clerk-react'
import React from 'react'
import { Button } from './components/ui/button'
import Header from './components/header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchedProperty from './components/MostSearchedProperty'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'

function Home() {
  return (
    <div>
        {/* Header */}
        <Header/>
        {/* Hero */}
        <Hero/>
        {/* Category */}
        <Category/>
        {/* Most Searched Property */}
        <MostSearchedProperty/>
        {/* Info Section */}
        <InfoSection/>
        {/* Footer */}
        <Footer/>

    </div>
  )
}

export default Home