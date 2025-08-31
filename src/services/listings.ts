import Samsung from "../assets/SamsungA56.png";
import iphone from "../assets/iphone12.png";
import spark from "../assets/spark40c.png";
import yukon from "../assets/yukon.png";
import jeep from "../assets/jeep.png";
import villa from "../assets/villa.png";
import apartment from "../assets/apartment.png";

const listings = [
  {
    id: "1",
    title: "Tecno spark 40c 8/256gb grey",
    description: "Brand New Tecno spark 40c 8/256gb grey",
    image: spark,
    price: 114,
    seller: {
      name: "Class",
      verified: true,
      phone: "+961 71 123 456",
      email: "class.store@example.com",
    },
    location: { en: "Mar Elias", ar: "مار إلياس" },
    category: "phones",
  },
  {
    id: "2",
    title: "iphone 12 pro 256gb",
    description: "iphone 12 pro 256gb open box",
    image: iphone,
    price: 362,
    seller: {
      name: "Najem Starcall",
      verified: true,
      phone: "+961 76 234 567",
      email: "najem.starcall@example.com",
    },
    location: { en: "Mar Elias", ar: "مار إلياس" },
    category: "phones",
  },
  {
    id: "3",
    title: "Samsung A56",
    image: Samsung,
    description: "Used Samsung A56",
    price: 256,
    seller: {
      name: "Mahmoud Itani",
      verified: false,
      phone: "+961 70 345 678",
      email: "mahmoud.itani@example.com",
    },
    location: { en: "Tareeq Aljdeede", ar: "طريق الجديده" },
    category: "phones",
  },
  {
    id: "4",
    title: "GMC Yukon 2016",
    description: "Used GMC Yukon 2016 for sale",
    image: yukon,
    price: 35000,
    seller: {
      name: "Masoud Balsam",
      verified: false,
      phone: "+961 3 456 789",
      email: "masoud.balsam@example.com",
    },
    location: { en: "Aamchit", ar: "عمشيت" },
    category: "cars",
  },
  {
    id: "5",
    title: "Jeep Grand Cherokee V6 2018 Altitude Clean Carfax",
    description:
      "Jeep Grand Cherokee V6 2018 Altitude \nClean Carfax \n0 Accidents \n0 Mechanical Faults",
    image: jeep,
    price: 24800,
    seller: {
      name: "Nader Motors",
      verified: true,
      phone: "+961 71 567 890",
      email: "nader.motors@example.com",
    },
    location: { en: "Jbeil", ar: "جبيل" },
    category: "cars",
  },
  {
    id: "6",
    title: "Luxury Villa",
    description: "~1,800 m² (19,375 ft²) area 3 Floors 3 bedrooms 3 toilets",
    image: villa,
    price: 370000,
    seller: {
      name: "Karam Real Estate",
      verified: true,
      phone: "+961 76 678 901",
      email: "karam.realestate@example.com",
    },
    location: { en: "Sahel Alma", ar: " سهل علما" },
    category: "apartments",
  },
  {
    id: "7",
    title: "Modern Apartment in Beirut",
    description:
      "120 m² apartment, 2 bedrooms, 2 bathrooms, fully furnished with sea view. Located in Ain El Mreisseh.",
    image: apartment,
    price: 180000,
    seller: {
      name: "Beirut Living",
      verified: false,
      phone: "+961 71 789 012",
      email: "beirut.living@example.com",
    },
    location: { en: "Ain El Mreisseh", ar: "عين المريسة" },
    category: "apartments",
  },
];

export const getListings = (query: string = "") => {
  return !query
    ? listings
    : listings.filter((listing) =>
        listing.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
};

export const getListingsByCategory = (query: string = "") => {
  return listings.filter((listing) => listing.category === query);
};

export const getListingById = (id: string) => {
  return listings.find((listing) => listing.id === id);
};
