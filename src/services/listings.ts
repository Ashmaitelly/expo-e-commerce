import Samsung from "../assets/SamsungA56.png";
import iphone from "../assets/iphone12.png";
import spark from "../assets/spark40c.png";
import yukon from "../assets/yukon.png";
import jeep from "../assets/jeep.png";
import villa from "../assets/villa.png";

const listings = [
  {
    id: "1",
    title: "Tecno spark 40c 8/256gb grey",
    description: "Brand New Tecno spark 40c 8/256gb grey",
    image: spark,
    price: 114,
    seller: { name: "Class", verified: true },
    location: { en: "Mar Elias", ar: "مار إلياس" },
    category: "phone",
  },
  {
    id: "2",
    title: "iphone 12 pro 256gb",
    description: "iphone 12 pro 256gb open box",
    image: iphone,
    price: 362,
    seller: { name: "Najem Starcall", verified: true },
    location: { en: "Mar Elias", ar: "مار إلياس" },
    category: "phone",
  },
  {
    id: "3",
    title: "Samsung A56",
    image: Samsung,
    description: "Used Samsung A56",
    price: 256,
    seller: { name: "Mahmoud Itani", verified: false },
    location: { en: "Tareeq Aljdeede, Beirut", ar: "طريق الجديده" },
    category: "phone",
  },
  {
    id: "4",
    title: "GMC Yukon 2016",
    description: "Used GMC Yukon 2016 for sale",
    image: yukon,
    price: 35000,
    seller: { name: "Masoud Balsam", verified: false },
    location: { en: "Aamchit", ar: "عمشيت" },
    category: "car",
  },
  {
    id: "5",
    title: "Jeep Grand Cherokee V6 2018 Altitude Clean Carfax",
    description:
      "Jeep Grand Cherokee V6 2018 Altitude \nClean Carfax \n0 Accidents \n0 Mechanical Faults",
    image: jeep,
    price: 24800,
    seller: { name: "Nader Motors", verified: true },
    location: { en: "Jbeil", ar: "جبيل" },
    category: "car",
  },
  {
    id: "6",
    title: "Luxury Villa",
    description: "~1,800 m² (19,375 ft²) area 3 Floors 3 bedrooms 3 toilets",
    image: villa,
    price: 370000,
    seller: { name: "Karam Real Estate", verified: true },
    location: { en: "Sahel Alma", ar: " سهل علما" },
    category: "apartment",
  },
];

export const getListings = (query: string = "") => {
  return query
    ? listings
    : listings.filter(
        (listing) =>
          listing.title.includes(query) || listing.category === "query"
      );
};

export const getListingById = (id: string) => {
  return listings.find((listing) => listing.id === id);
};
