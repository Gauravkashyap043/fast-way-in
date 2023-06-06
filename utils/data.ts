import cycle from "../assets/images/cycle.png";
import iphone from "../assets/images/iphone.png";
import headphone1 from "../assets/images/headphone1.png";
import headphone2 from "../assets/images/headphone2.png";
import headphone3 from "../assets/images/headphone3.png";
import headphone4 from "../assets/images/headphone4.png";
interface ipillsButtonData {
    id:number,
    name:string;
  }
export const cardFavItems = [
    {
        id: 1,
        name: "Apple iphome 14 pro max (256gb) - Deep Purple",
        type: "fav",
        image:
            iphone,
        isFavorite: true,
        itemDescription: "With this HP Printer by your side, you can print, scan, and copy allyour",
        rating: 4,
        availableOn: [
            {
                name: "amazon",
                image:
                    iphone,
                redirectLink: "amazon site link",
            },
            {
                name: "amazon",
                image: "https://",
                redirectLink: "amazon site link",
            },
        ],
    },
    {
        id: 2,
        name: "Apple iphome 14 pro (512gb) - Dark red",
        type: "fav",
        image:
            iphone,
        isFavorite: false,
        itemDescription: "With this HP Printer by your side, you can print, scan,  all your",
        rating: 4,
        availableOn: [
            {
                name: "amazon",
                image:
                    iphone,
                redirectLink: "amazon site link",
            },
            {
                name: "amazon",
                image: "https://",
                redirectLink: "amazon site link",
            },
        ],
    },
    {
        id: 3,
        name: "Apple iphome 14 pro max (256gb) - Deep Purple",
        type: "fav",
        image:
            iphone,
        isFavorite: false,
        itemDescription: "With this HP Printer by your side, you can print, scan, and copy all your",
        rating: 4,
        availableOn: [
            {
                name: "amazon",
                image:"",
                redirectLink: "amazon site link",
            },
            {
                name: "amazon",
                image: "https://",
                redirectLink: "amazon site link",
            },
        ],
    },
    {
        id: 4,
        name: "Apple iphome 11 (256gb) - alice blue",
        type: "fav",
        image:iphone,
        isFavorite: true,
        itemDescription: "With this HP Printer by your side, you can print, scan, and copy all your",
        rating: 4,
        availableOn: [
            {
                name: "amazon",
                image:'',
                redirectLink: "amazon site link",
            },
            {
                name: "amazon",
                image: "https://",
                redirectLink: "amazon site link",
            },
        ],
    },
    {
        id: 5,
        name: "Apple iphome 12 pro max (256gb) - Deep Yellow",
        type: "fav",
        image:iphone,
        isFavorite: true,
        itemDescription: "With this HP Printer by your side, you can print, scan, and copy all your",
        rating: 4,
        availableOn: [
            {
                name: "amazon",
                image:'',
                redirectLink: "amazon site link",
            },
            {
                name: "amazon",
                image: "https://",
                redirectLink: "amazon site link",
            },
        ],
    },
    {
        id: 6,
        name: "Apple iphome 13 pro max (256gb) - Deep green",
        type: "fav",
        image:iphone,
        isFavorite: true,
        itemDescription: "With this HP Printer by your side, you can print, scan, and copy all your",
        rating: 4,
        availableOn: [
            {
                name: "amazon",
                image:'',
                redirectLink: "amazon site link",
            },
            {
                name: "amazon",
                image: "https://",
                redirectLink: "amazon site link",
            },
        ],
    },
];

export const categoryItems = [
    { id: 1, type: 'category', img: cycle, name: "Cycle" },
    { id: 2, type: 'category', img: headphone1, name: "Toys" },
    { id: 3, type: 'category', img: headphone2, name: "Bikes" },
    { id: 4, type: 'category', img: headphone3, name: "Clothes" },
    { id: 5, type: 'category', img: headphone4, name: "Fashion" },
    { id: 6, type: 'category', img: cycle, name: "Kitchen" },
    { id: 7, type: 'category', img: headphone1, name: "Home Decor" },
    { id: 8, type: 'category', img: headphone2, name: "Electrical" },
    { id: 9, type: 'category', img: headphone3, name: "Light & Bulb" },
    { id: 10, type: 'category', img: headphone4, name: "Item 10" },
    { id: 11, type: 'category', img: cycle, name: "Item 11" },
];

export const imageData : any= [headphone1,headphone2,headphone3,headphone4]

export const pillButtonData : ipillsButtonData[] = [
    {id:1,name:"All"},
    {id:2,name:"electronics"},
    {id:3,name:"jewelery"},
    {id:4,name:"men's clothing"},
    {id:5,name:"women's clothing"},
    {id:6,name:"smartphones"},
    {id:7,name:"Clothing"},
    {id:8,name:"Grooming"},
    {id:9,name:"Kitchen"},
]

