import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"  

function Dropdownfield({item,handleInputChange,propertyInfo}) {
  return (
    <div>
        <Select onValueChange={(value)=>handleInputChange(item.name,value)} required={item?.required}
        defaultValue={propertyInfo?.[item?.name]}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder={propertyInfo?.[item?.name]?propertyInfo?.[item?.name]:item?.label} />
        </SelectTrigger>
        <SelectContent>
            {item?.options?.map((option,index)=>(
                <SelectItem value={option}>{option}</SelectItem>
            ))}
        </SelectContent>
        </Select>
    </div>
  )
}

export default Dropdownfield