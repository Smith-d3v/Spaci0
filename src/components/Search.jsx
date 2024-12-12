import React from 'react'
import { useState } from 'react';
import { Separator } from "@/components/ui/separator"
import { IoIosSearch } from "react-icons/io";
import Data from '@/Shared/Data'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"  
import { Link } from 'react-router-dom';
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useSearchParams } from 'react-router-dom';


function Search() {
    const [searchParams] = useSearchParams();
    const [condition, setCondition] = useState(searchParams.get('condition') || '');
    const [budget, setBudget] = useState(Number(searchParams.get('budget')) || 0);
    const [location, setLocation] = useState(searchParams.get('location') || '');

    const handleSearch = () => {
        const params = new URLSearchParams();
        
        if (condition) {
            params.append('condition', condition);
        }
        
        if (budget > 0) {
            params.append('maxPrice', budget.toString());
        }
        
        if (location && typeof location === 'string' && location.trim()) {
            params.append('location', location.trim());
        }

        const searchQuery = params.toString();
        return searchQuery ? `/search?${searchQuery}` : '/search';
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            window.location.href = handleSearch();
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='p-2 md:p-5 bg-white rounded-md 
                md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center
                w-full'>
                <Select onValueChange={(value) => setCondition(value)}>
                    <SelectTrigger 
                        className='outline-none md:border-none w-full shadow-none text-lg'
                        onKeyUp={handleKeyPress}
                    >
                        <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                        {Data.Condition.map((item, index) => (
                            <SelectItem key={index} value={item.name}>{item.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Separator orientation="vertical" className='hidden md:block'/>

                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Budget"
                        className="w-full p-2 text-lg outline-none"
                        value={budget ? `₦${budget.toLocaleString()}` : ''}
                        onChange={(e) => {
                            // Remove all non-numeric characters and parse as integer
                            const numericValue = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
                            setBudget(isNaN(numericValue) ? 0 : numericValue);
                        }}
                        onKeyUp={handleKeyPress}
                    />
                </div>

                <Separator orientation="vertical" className='hidden md:block'/>
                
                <input 
                    type="text"
                    placeholder="Location"
                    className="w-full p-2 text-lg outline-none"
                    value={location || ''}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyUp={handleKeyPress}
                />

                <Link to={handleSearch()}>
                    <div>
                        <IoIosSearch className='text-[50px] text-white bg-primary rounded-full p-3 hover:scale-105 transition-all cursor-pointer' />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Search