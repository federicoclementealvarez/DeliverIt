import express from 'express';
import { shopTypeRouter } from './shopType/shopType.routes.js';
import { paymentTypeRouter } from './paymentType/paymentType.routes.js';
import { productCategoryRouter } from './productCategory/productCategory.routes.js';

const app = express();
app.use(express.json());
app.use('/api/shopTypes', shopTypeRouter);
app.use('/api/paymentTypes', paymentTypeRouter);
app.use('/api/productCategories', productCategoryRouter)

app.use((_, res) =>{
    return res.status(404).send({message: 'Resource not found'});
})

app.listen(3000, ()=>{
    console.log('Server running on http://localhost:3000/')
})
