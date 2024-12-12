import React from 'react'
import Header from '../components/Header'
import MyListing from './components/MyListing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Inbox from './components/Inbox'

export default function Profile() {
  return (
    <div>
        <Header/>
        <div className='px-10 md:px-20 my-10'>
          <Tabs defaultValue="my-listings" className="w-full">
          <TabsList className='w-full flex justify-start'>
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>

          </TabsList>
          <TabsContent value="my-listings">
            <MyListing/>
          </TabsContent>
          <TabsContent value="inbox"><Inbox/></TabsContent>
          </Tabs>
        </div>
    </div>
  )
}
