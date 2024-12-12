import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check } from "lucide-react"

function MultiSelectField({ item, handleInputChange, propertyInfo }) {
    const [selectedItems, setSelectedItems] = useState([])

    useEffect(() => {
        // Set initial values when editing
        if (propertyInfo && propertyInfo[item.name]) {
            setSelectedItems(propertyInfo[item.name])
        }
    }, [propertyInfo, item.name])

    const handleSelect = (value) => {
        let updatedSelection
        if (selectedItems.includes(value)) {
            updatedSelection = selectedItems.filter(item => item !== value)
        } else {
            updatedSelection = [...selectedItems, value]
        }
        setSelectedItems(updatedSelection)
        handleInputChange(item.name, updatedSelection)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal">
                    {selectedItems.length === 0 
                        ? "Select options..." 
                        : `${selectedItems.length} selected`}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <ScrollArea className="h-[200px] p-2">
                    {item.options.map((option) => (
                        <div
                            key={option}
                            className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                            onClick={() => handleSelect(option)}
                        >
                            <Checkbox 
                                checked={selectedItems.includes(option)}
                                onCheckedChange={() => handleSelect(option)}
                            />
                            <span>{option}</span>
                            {selectedItems.includes(option) && (
                                <Check className="h-4 w-4 ml-auto" />
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}

export default MultiSelectField 