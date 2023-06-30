import { Local } from '../Interfaces/DbInterfaces';
import { Location } from '../Interfaces/MapInterfaces';

const tarjeta = [
    {
        img: 'https://assets.unileversolutions.com/recipes-v2/164562.jpg',
        name: 'La casa de la sopas',
        categorie: 'Restaurante',
        like: false
    },
    {
        img: 'https://assets.unileversolutions.com/recipes-v2/164562.jpg',
        name: 'La casa de la sopas',
        categorie: 'Restaurante',
        like: false
    },
    {
        img: 'https://assets.unileversolutions.com/recipes-v2/164562.jpg',
        name: 'La casa de la sopas',
        categorie: 'Restaurante',
        like: false
    },
    {
        img: 'https://assets.unileversolutions.com/recipes-v2/164562.jpg',
        name: 'La casa de la sopas',
        categorie: 'Restaurante',
        like: false
    },
    {
        img: 'https://assets.unileversolutions.com/recipes-v2/164562.jpg',
        name: 'La casa de la sopas',
        categorie: 'Restaurante',
        like: false
    }         
];
const locations: Location[] = [
    {
        latitude: 20.627996, 
        longitude: -103.354522
    },
    {
        latitude: 20.628526,
        longitude: -103.359988
    },
    {
        latitude: 20.629731,
        longitude: -103.352843
    },
    {
        latitude: 20.621657,
        longitude: -103.363292
    }
]
const local: Local[] = [
    {
        id: 2222,
        name: 'hola',
        location: locations[0],
        address: 'hola',
        uriImage: 'https://www.creaxid.com.mx/blog/wp-content/uploads/2017/12/Local-Marketing.jpg',
        isVerify: true,
        schedules: [
            {
                day1: 'hola',
                day2: 'hola',
                open: 'hola',
                close: 'hola',
            },
            {
                day1: 'hola',
                day2: '',
                open: 'hola',
                close: 'hola',
            },
            {
                day1: 'hola',
                day2: 'hola',
                open: 'hola',
                close: 'hola',
            }
        ],
        rate: 10,
        quantityRate: 10,
        tags: ['hola','hola','hola','hola']
    },
    {
        id: 1333,
        name: 'hola',
        location: locations[1],
        address: 'hola',
        uriImage: 'https://www.creaxid.com.mx/blog/wp-content/uploads/2017/12/Local-Marketing.jpg',
        isVerify: true,
        schedules: [
            {
                day1: 'hola',
                day2: 'hola',
                open: 'hola',
                close: 'hola',
            },
            {
                day1: 'hola',
                day2: '',
                open: 'hola',
                close: 'hola',
            },
            {
                day1: 'hola',
                day2: 'hola',
                open: 'hola',
                close: 'hola',
            }
        ],
        rate: 10,
        quantityRate: 10,
        tags: ['hola','hola','hola','hola']
    },
    {
        id: 1555,
        name: 'hola',
        location: locations[2],
        address: 'hola',
        uriImage: 'https://www.creaxid.com.mx/blog/wp-content/uploads/2017/12/Local-Marketing.jpg',
        isVerify: true,
        schedules: [
            {
                day1: 'hola',
                day2: 'hola',
                open: 'hola',
                close: 'hola',
            },
            {
                day1: 'hola',
                day2: '',
                open: 'hola',
                close: 'hola',
            },
            {
                day1: 'hola',
                day2: 'hola',
                open: 'hola',
                close: 'hola',
            }
        ],
        rate: 10,
        quantityRate: 10,
        tags: ['hola','hola','hola','hola']
    },
    {
        id: 16666,
        name: 'hola',
        location: locations[3],
        address: 'hola',
        uriImage: 'https://www.creaxid.com.mx/blog/wp-content/uploads/2017/12/Local-Marketing.jpg',
        isVerify: true,
        schedules: [
            {
                day1: 'hola',
                day2: 'hola',
                open: 'hola',
                close: 'hola',
            },
            {
                day1: 'hola',
                day2: '',
                open: 'hola',
                close: 'hola',
            },
            {
                day1: 'hola',
                day2: 'hola',
                open: 'hola',
                close: 'hola',
            }
        ],
        rate: 10,
        quantityRate: 10,
        tags: ['hola','hola','hola','hola']
    },
]
export {
    tarjeta,
    local
};