import homeIcon from '../assets/icons/home.png'
import roomIcon from '../assets/icons/room.png'
import officeIcon from '../assets/icons/office.png'
import buildingIcon from '../assets/icons/office-building.png'
import garageIcon from '../assets/icons/garage.png'
import storageIcon from '../assets/icons/storage.png'
import landIcon from '../assets/icons/land (2).png'

const Condition=[
    {
       id:1,
       name:'Excellent'
    },
    {
        id:2,
        name:'Good'
    },
    {
        id:3,
        name:'Average'
    },
    {
        id:4,
        name:'Fair'
        },
        {
            id:5,
            name:'Poor'
    }
]

const Budget=[
    {
       id:1,
       name:'< 1,000,000 '
    },
    {
        id:2,
        name:'< 10,000,000 '
    },
    {
        id:3,
        name:'< 100,000,000'
    },
    {
        id:4,
        name:'100,000,000+'
    },
]

const Location = [
    { id: 1, name: 'Agege' },
    { id: 2, name: 'Ajeromi-Ifelodun' },
    { id: 3, name: 'Alimosho' },
    { id: 4, name: 'Amuwo-Odofin' },
    { id: 5, name: 'Apapa' },
    { id: 6, name: 'Badagry' },
    { id: 7, name: 'Epe' },
    { id: 8, name: 'Eti-Osa' },
    { id: 9, name: 'Ibeju-Lekki' },
    { id: 10, name: 'Ifako-Ijaiye' },
    { id: 11, name: 'Ikeja' },
    { id: 12, name: 'Ikorodu' },
    { id: 13, name: 'Kosofe' },
    { id: 14, name: 'Lagos Island' },
    { id: 15, name: 'Lagos Mainland' },
    { id: 16, name: 'Mushin' },
    { id: 17, name: 'Ojo' },
    { id: 18, name: 'Oshodi-Isolo' },
    { id: 19, name: 'Shomolu' },
    { id: 20, name: 'Surulere' }
  ]

  const Category =[
    {
        id: 1,
        name: 'Home',
        icon: homeIcon
    },
    {
        id:2,
        name:'Room',
        icon: roomIcon
    },
    {
        id:3,
        name:'Office',
        icon: officeIcon
    },
    {
        id:4,
        name:'Commercial Building',
        icon: buildingIcon
    },
    {
        id:5,
        name:'Garage',
        icon: garageIcon
    },
    {
        id:6,
        name:'Storage Room',
        icon: storageIcon
    },
    {
        id:7,
        name:'Land',
        icon: landIcon
    },
]

export default{
    Condition,
    Budget,
    Location,
    Category
}
