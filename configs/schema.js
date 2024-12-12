import { pgTable, serial, varchar, json, integer, boolean } from 'drizzle-orm/pg-core'

export const PropertyListing=pgTable('propertyListing',{
    id:serial('id').primaryKey(),
    listingTitle:varchar('listingTitle').notNull(),
    category:varchar('category').notNull(),
    location:varchar('location').notNull(),
    sizeArea:varchar('sizeArea'),
    condition:varchar('condition'),
    offerType:varchar('offerType').notNull(),
    price:varchar('price').notNull(),
    availabilityDate:varchar('availabilityDate'),
    listingDescription:varchar('listingDescription').notNull(),
    amenities:json('amenities'),
    createdBy:varchar('createdBy').notNull(),
    userName:varchar('userName').notNull().default('Smith_d3vs'),
    userImageUrl:varchar('userImageUrl').default('https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg'),
    postedOn:varchar('postedOn'),
    buildingAge: varchar('buildingAge'),
    nearbyFacilities: json('nearbyFacilities'),
    depositRequired: boolean('depositRequired'),
    paymentTerms: varchar('paymentTerms'),
    priceNegotiable: boolean('priceNegotiable')
});

export const PropertyImages=pgTable('propertyimages',{
    id:serial('id').primaryKey(),
    imageUrl:varchar('imageUrl').notNull(),
    propertyListingId:integer('propertyListingId').references(()=>PropertyListing.id)
});

export const ContactSubmissions = pgTable('contactsubmissions', {
    id: serial('id').primaryKey(),
    firstName: varchar('firstName').notNull(),
    lastName: varchar('lastName').notNull(),
    email: varchar('email').notNull(),
    phone: varchar('phone'),
    interest: varchar('interest').notNull(),
    message: varchar('message').notNull(),
    submittedOn: varchar('submittedOn').notNull()
});
