import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { FaFilter } from "react-icons/fa"

const AdvancedFilter = ({ onFilterChange }) => {
    const [searchParams] = useSearchParams();
    
    // Initialize filters with current URL params
    const initialFilters = {
        location: searchParams.get('location') || '',
        category: searchParams.get('category') || '',
        condition: searchParams.get('condition') || '',
        priceRange: {
            min: searchParams.get('minPrice') || '',
            max: searchParams.get('maxPrice') || ''
        },
        buildingAge: searchParams.get('buildingAge') || '',
        nearbyFacilities: searchParams.get('nearbyFacilities') 
            ? JSON.parse(searchParams.get('nearbyFacilities')) 
            : []
    };

    const [filters, setFilters] = useState(initialFilters);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    // Reset filters when URL offerType changes
    useEffect(() => {
        setFilters(initialFilters);
    }, [searchParams.get('offerType')]);

    const resetFilters = () => {
        setFilters({
            location: '',
            category: '',
            condition: '',
            priceRange: {
                min: '',
                max: ''
            },
            buildingAge: '',
            nearbyFacilities: [],
            priceNegotiable: false
        });
    };

    const handleApplyFilters = () => {
        onFilterChange(filters);
        setIsPopoverOpen(false);
    };

    // Handle individual filter changes
    const handleFilterChange = (key, value) => {
        switch (key) {
            case 'priceRange':
                setFilters(prev => ({
                    ...prev,
                    priceRange: {
                        ...prev.priceRange,
                        ...(typeof value === 'object' ? value : {})
                    }
                }));
                break;

            case 'nearbyFacilities':
                setFilters(prev => ({
                    ...prev,
                    nearbyFacilities: Array.isArray(value) ? value : 
                        value ? [...prev.nearbyFacilities, value] :
                        prev.nearbyFacilities.filter(f => f !== value)
                }));
                break;

            case 'priceNegotiable':
                setFilters(prev => ({
                    ...prev,
                    priceNegotiable: Boolean(value)
                }));
                break;

            default:
                setFilters(prev => ({
                    ...prev,
                    [key]: value
                }));
        }
    };

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                    <FaFilter />
                    Advanced Filters
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[900px] p-6">
                <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">Advanced Filters</h2>
                    <Button 
                        variant="outline" 
                        onClick={resetFilters}
                        size="sm"
                    >
                        Reset Filters
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input 
                                placeholder="Enter location..."
                                value={filters.location}
                                onChange={(e) => handleFilterChange('location', e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select 
                                onValueChange={(value) => handleFilterChange('category', value)}
                                value={filters.category}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["Home", "Room", "Office", "Commercial Building", "Garage", "Storage Room", "Land"]
                                        .map((cat) => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Condition</Label>
                            <Select 
                                onValueChange={(value) => handleFilterChange('condition', value)}
                                value={filters.condition}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["Excellent", "Good", "Average", "Fair", "Poor"]
                                        .map((cond) => (
                                            <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Price Range (₦)</Label>
                            <div className="flex gap-2">
                                <Input 
                                    type="number"
                                    placeholder="Min"
                                    value={filters.priceRange.min}
                                    onChange={(e) => handleFilterChange('priceRange', {
                                        ...filters.priceRange,
                                        min: e.target.value
                                    })}
                                />
                                <Input 
                                    type="number"
                                    placeholder="Max"
                                    value={filters.priceRange.max}
                                    onChange={(e) => handleFilterChange('priceRange', {
                                        ...filters.priceRange,
                                        max: e.target.value
                                    })}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="priceNegotiable"
                                    checked={filters.priceNegotiable}
                                    onCheckedChange={(checked) => 
                                        handleFilterChange('priceNegotiable', checked)
                                    }
                                />
                                <label htmlFor="priceNegotiable">Price Negotiable</label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Building Age</Label>
                            <Select 
                                onValueChange={(value) => handleFilterChange('buildingAge', value)}
                                value={filters.buildingAge}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select building age" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["New (< 5 years)", "Mid-Age (5-20 years)", "Older (> 20 years)"]
                                        .map((age) => (
                                            <SelectItem key={age} value={age}>{age}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Nearby Facilities</Label>
                            <div className="space-y-2">
                                {["Schools", "Hospitals", "Parks", "Police", "Public Transportation"]
                                    .map((facility) => (
                                        <div key={facility} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={facility}
                                                checked={filters.nearbyFacilities.includes(facility)}
                                                onCheckedChange={(checked) => {
                                                    const newFacilities = checked 
                                                        ? [...filters.nearbyFacilities, facility]
                                                        : filters.nearbyFacilities.filter(f => f !== facility)
                                                    handleFilterChange('nearbyFacilities', newFacilities)
                                                }}
                                            />
                                            <label htmlFor={facility}>{facility}</label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-2">
                    <Button 
                        className="w-full"
                        onClick={handleApplyFilters}
                    >
                        Apply Filters
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default AdvancedFilter 