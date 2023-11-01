import express from 'express';
import { shopTypeRouter } from './shopType/shopType.routes.js';
import { paymentTypeRouter } from './paymentType/paymentType.routes.js';
import { productCategoryRouter } from './productCategory/productCategory.routes.js';
import { commissionRouter } from './commission/commission.routes.js';
import { userTypeRouter } from './userType/userType.routes.js';
import { RequestContext } from '@mikro-orm/core';
import { orm } from './shared/orm.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    RequestContext.create(orm.em, next)
  })

app.use('/api/shopTypes', shopTypeRouter);
app.use('/api/paymentTypes', paymentTypeRouter);
app.use('/api/productCategories', productCategoryRouter);
app.use('/api/commissions', commissionRouter);
app.use('/api/userTypes', userTypeRouter);

app.use((_, res) =>{
    return res.status(404).send({message: 'Resource not found'});
})

app.listen(3000, ()=>{
    console.log('Server running on http://localhost:3000/')
})
