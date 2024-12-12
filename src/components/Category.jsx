import React from 'react';
import { Link } from 'react-router-dom';

// Import the icons directly
import homeIcon from '../assets/icons/home.png';
import roomIcon from '../assets/icons/room.png';
import officeIcon from '../assets/icons/office.png';
import officeBuildingIcon from '../assets/icons/office-building.png';
import garageIcon from '../assets/icons/garage.png';
import storageIcon from '../assets/icons/storage.png';
import landIcon from '../assets/icons/land (2).png';

const Category = [
    {
        id: 1,
        name: 'Home',
        icon: homeIcon,
    },
    {
        id: 2,
        name: 'Room',
        icon: roomIcon,
    },
    {
        id: 3,
        name: 'Office',
        icon: officeIcon,
    },
    {
        id: 4,
        name: 'Commercial Building',
        icon: officeBuildingIcon,
    },
    {
        id: 5,
        name: 'Garage',
        icon: garageIcon,
    },
    {
        id: 6,
        name: 'Storage Room',
        icon: storageIcon,
    },
    {
        id: 7,
        name: 'Land',
        icon: landIcon,
    },
];

function CategoryComponent() {
    return (
        <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-8 text-black">Browse By Type</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 px-20">
                {Category.map((category, index) => (
                    <Link to={'/search/' + category.name} key={index}>
                        <div className="items-center flex flex-col hover:shadow-sm cursor-pointer">
                            <img src={category.icon} alt={category.name} width={35} height={35} />
                            <h2 className="mt-2 text-black">{category.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CategoryComponent;
