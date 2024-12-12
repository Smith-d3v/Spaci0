import React from 'react'
import { TbFileDescription } from "react-icons/tb";
import { MdTitle, MdCategory, MdOutlineNewReleases, MdHomeWork, 
         MdLocationCity, MdLocalOffer, MdHandshake, MdPayments, 
         MdDateRange, MdAttachMoney, MdBusinessCenter, 
         MdLocalParking, MdChair, MdOutdoorGrill } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { PiResizeDuotone } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { FaHandshakeSimple } from "react-icons/fa6";

const iconMap = {
    MdTitle: <MdTitle />,
    MdCategory: <MdCategory />,
    FaMapLocationDot: <FaMapLocationDot />,
    PiResizeDuotone: <PiResizeDuotone />,
    MdOutlineNewReleases: <MdOutlineNewReleases />,
    MdLocalOffer: <MdLocalOffer />,
    GiMoneyStack: <GiMoneyStack />,
    MdDateRange: <MdDateRange />,
    TbFileDescription: <TbFileDescription />,
    MdHomeWork: <MdHomeWork />,
    MdLocationCity: <MdLocationCity />,
    MdHandshake: <FaHandshakeSimple />,
    MdPayments: <MdPayments />,
    MdAttachMoney: <MdAttachMoney />,
    MdBusinessCenter: <MdBusinessCenter />,
    MdLocalParking: <MdLocalParking />,
    MdChair: <MdChair />,
    MdOutdoorGrill: <MdOutdoorGrill />
};

function IconField({icon}) {
  return (
    <div className='text-primary bg-slate-200 p-1.5 rounded-full'>
      {iconMap[icon] || <MdCategory />}
    </div>
  )
}

export default IconField