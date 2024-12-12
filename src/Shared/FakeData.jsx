import { faker } from "@faker-js/faker/locale/en_NG";

function createRandomePropertyList() {
    return {
        title: faker.lorem.words(3) , 
        location: faker.location.streetAddress() + ", Lagos, Nigeria",
        size: `${faker.number.int({ min: 50, max: 500 })} sqm`, 
        image: 'https://propertydome.com/wp-content/uploads/2020/12/Secure-estates.jpg',
        price: faker.finance.amount(500000, 50000000, 0, '₦') 
    };
}

const propertyList = faker.helpers.multiple(createRandomePropertyList, {
    count: 10
});

export default {
    propertyList
};
