import { Shop } from '../entities/shop.entity';

export const ShopServiceMock = {
  getOne: (): Shop => {
    return {
      id: '654c0a5ada8e9efaeeae025a',
      name: 'Mongo hamburguesería',
      phoneNumber: '3419995555',
      email: 'mongohamb@gmail.com',
      logoPath:
        'https://res.cloudinary.com/dtoqjwrkv/image/upload/v1711273860/DeliverIt/shops/mongoHamburgueseriaLogo_gwske6',
      bannerPath:
        'https://res.cloudinary.com/dtoqjwrkv/image/upload/v1711273860/DeliverIt/shops/mongoHamburgueseriaBanner_vbygz3',
      openingTime: '10:00:00',
      closingTime: '23:00:00',
      shippingPrice: 500,
      totalReviews: 1,
      street: 'Alvear',
      streetNumber: '1800',
      shopType: {
        id: '65469f789358827f56498999',
        description: '',
        iconDescription: '',
      },
      owner: '654c09e2da8e9efaeeae0253',
      productVariations: [],
      stars: 4,
    };
  },
};

const products = [
  {
    id: '660039fd03c82b81da9abfa8',
    name: 'Hamburguesa con queso',
    description: 'Lechuga y tomate',
    photoPath:
      'https://res.cloudinary.com/duyb82bkr/image/upload/v1711290876/DeliverIt/products/nsjsimf7nds7n1i6agxx.jpg',
    photoId: 'DeliverIt/products/nsjsimf7nds7n1i6agxx',
    allowsVariations: false,
    shop: '654c0a5ada8e9efaeeae025a',
    productCategory: {
      id: '654c0420da8e9efaeeae0245',
      description: 'Hamburguesa',
    },
    prices: [
      {
        amount: 5500,
        validSince: '2024-03-24',
      },
    ],
  },
];
