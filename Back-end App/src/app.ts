import express from 'express';
import { shopTypeRouter } from './shopType/shopType.routes.js';
import { paymentTypeRouter } from './paymentType/paymentType.routes.js';
import { productCategoryRouter } from './productCategory/productCategory.routes.js';
import { commissionRouter } from './commission/commission.routes.js';
import { userTypeRouter } from './userType/userType.routes.js';
import { RequestContext } from '@mikro-orm/core';
import { orm } from './shared/orm.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { productRouter } from './product/product.routes.js';
import { orderRouter } from './order/order.routes.js';
import { shopRouter } from './shop/shop.routes.js';
import { productVariationRouter } from './productVariation/productVariation.routes.js';
import { reviewRouter } from './review/review.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(cors());

app.use(express.json());



//middleware that serves the images in the src/shared/assets folder
app.use('/assets', express.static(path.join(__dirname, '../src/shared/assets')))

app.use((req, res, next) => {
    RequestContext.create(orm.em, next)
})

app.use('/api/shopTypes', shopTypeRouter);
app.use('/api/paymentTypes', paymentTypeRouter);
app.use('/api/productCategories', productCategoryRouter);
app.use('/api/commissions', commissionRouter);
app.use('/api/userTypes', userTypeRouter);
app.use('/api/products', productRouter);
app.use('/api/shops', shopRouter);
app.use('/api/order', orderRouter);
app.use('/api/productVariations', productVariationRouter);
app.use('/api/reviews', reviewRouter)

app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/')
})


