import { getApp } from "../appConfig.js";
import request from 'supertest';
import { v4 as uuid } from 'uuid';

const app = getApp()

//this line must be replaced when the user and shop CRUDs are completed
const shopId = '654c0a5ada8e9efaeeae025a'

const productCategoryToCreate = {
    description: 'product category description'
}

const productToCreate = {
    name: 'product name',
    description: 'product description',
    price: '2000',
    shop: shopId,
    allowsVariations: 'true',
    maxVariations: '3'
}

const productToUpdate = {
    name: 'product name updated',
    description: 'product description updated',
    price: '2500',
    validSince: '2030-01-01'
}

const productExcededNameLength = {
    name: 'product name longer than it should',
    description: 'product description',
    price: '2000',
    shop: shopId,
    allowsVariations: 'true',
    maxVariations: '3'
}

const paymentTypeToCreate={
    description: 'payment type description'
}

const paymentTypeToUpdate={
    description: 'payment type description updated'
}


describe('integration test of product', ()=>{
    test('should create, update, delete and retrieve a product instance', async ()=>{
        const productCategoryRespose = await request(app).post('/api/productCategories').send(productCategoryToCreate).expect(201)
        await request(app).get('/api/productCategories/'+productCategoryRespose.body.data.id).expect(200)

        const productCreationRespose = 
        await request(app)
        .post('/api/products')
        .field("name", productToCreate.name)
        .field("description", productToCreate.description)
        .field("price", productToCreate.price)
        .field("shop", productToCreate.shop)
        .field("productCategory", productCategoryRespose.body.data.id)
        .field("allowsVariations", productToCreate.allowsVariations)
        .field("maxVariations", productToCreate.maxVariations)
        .attach("photo",'src/shared/assets/productExampleImage1.jpg')
        .expect(201)

        await request(app).get('/api/products/'+productCreationRespose.body.data.id+'/~').expect(200)

        await request(app)
        .put('/api/products/'+productCreationRespose.body.data.id)
        .field("name", productToUpdate.name)
        .field("description", productToUpdate.description)
        .field("price", productToUpdate.price)
        .field("validSince", productToUpdate.validSince)
        .attach("photo",'src/shared/assets/productExampleImage2.jpg')
        .expect(200)

        await request(app).delete('/api/products/'+productCreationRespose.body.data.id).expect(200)
        await request(app).get('/api/products/'+productCreationRespose.body.data.id+'/~').expect(404)
        
        await request(app).delete('/api/productCategories/'+productCategoryRespose.body.data.id).expect(200)
        await request(app).get('/api/productCategories/'+productCategoryRespose.body.data.id).expect(404)
    })

    test('should receive a 400 in get due to sending an unvalid id',async ()=>{
        await request(app).get('/api/products/'+'exampleString'+'/~').expect(400)
    })

    //The test of the string length is done just once because both post and put use the same function to validate it
    test('should receive a 400 in post due to exceding the string length of name', async ()=>{
        const productCategoryRespose = await request(app).post('/api/productCategories').send(productCategoryToCreate).expect(201)
        await request(app).get('/api/productCategories/'+productCategoryRespose.body.data.id).expect(200)

        await request(app)
        .post('/api/products')
        .field("name", productExcededNameLength.name)
        .field("description", productExcededNameLength.description)
        .field("price", productExcededNameLength.price)
        .field("shop", productExcededNameLength.shop)
        .field("productCategory", productCategoryRespose.body.data.id)
        .field("allowsVariations", productExcededNameLength.allowsVariations)
        .field("maxVariations", productExcededNameLength.maxVariations)
        .attach("photo",'src/shared/assets/productExampleImage1.jpg')
        .expect(400)

        await request(app).delete('/api/productCategories/'+productCategoryRespose.body.data.id).expect(200)
        await request(app).get('/api/productCategories/'+productCategoryRespose.body.data.id).expect(404)
    })
})


describe('integration test of paymentType', ()=>{
    test('should create, update, delete and retrieve a payment type instance', async ()=>{
        const paymentTypeRespose = await request(app).post('/api/paymentTypes').send(paymentTypeToCreate).expect(201)
        await request(app).get('/api/paymentTypes/'+paymentTypeRespose.body.data.id).expect(200)

        await request(app).put('/api/paymentTypes/'+paymentTypeRespose.body.data.id).send(paymentTypeToUpdate).expect(200)

        const paymentTypeUpdatedRespose = await request(app).get('/api/paymentTypes/'+paymentTypeRespose.body.data.id).expect(200)
        expect(paymentTypeUpdatedRespose.body.data.description).toEqual(paymentTypeToUpdate.description)

        await request(app).delete('/api/paymentTypes/'+paymentTypeRespose.body.data.id).expect(200)
        await request(app).get('/api/paymentTypes/'+paymentTypeRespose.body.data.id).expect(404)
    })

    test('should receive a 400 in get due to sending an unvalid id', async ()=>{
        await request(app).get('/api/paymentTypes/'+'exampleString').expect(400)
    })

    test('should receive a 404 in get due to sending an non existing id', async ()=>{
        const randomId = uuid().toString().replace('-','').replace('-','').replace('-','').replace('-','').slice(0,24) //uuid4 has four '-' on its generated random identifier
        await request(app).get('/api/paymentTypes/'+randomId).expect(404)
    })
})