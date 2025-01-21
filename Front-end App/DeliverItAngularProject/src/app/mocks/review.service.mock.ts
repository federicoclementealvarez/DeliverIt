import { of } from 'rxjs';
import { Review } from '../entities/review.entity';
import { Shop } from '../entities/shop.entity';
import { User } from '../entities/user.entity';

const userTypeMock = {
  id: '654c059cda8e9efaeeae024d',
  description: 'client',
};

const userMockValue: User = {
  id: '654c059cda8e9efaeeae024d',
  name: 'Duke',
  surname: 'Clippy',
  street: 'Zeballos',
  streetNumber: '1450',
  creditBalance: 1000,
  email: 'info@deliverit.com',
  userType: userTypeMock,
};

const shopMockValue: Shop = {
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
  shopType: '65469f789358827f56498999',
  owner: '654c09e2da8e9efaeeae0253',
  stars: 4,
};

const review: Review = {
  id: '6600775703c82b81da9abfac',
  comment: 'Estuvieron muy ricas las hamburguesas!',
  dateTime: '2024-03-24 16:13',
  stars: 5,
  shop: shopMockValue,
  user: userMockValue,
};

export const CreateReviewServiceMock = {
  shopToReview: () => shopMockValue,
  create: jest.fn(() => of({})),
};

export const UpdateReviewServiceMock = {
  shopToReview: () => shopMockValue,
  create: jest.fn(() => of({})),
  reviewToUpdate: review,
};
