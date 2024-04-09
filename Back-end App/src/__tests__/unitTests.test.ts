import { validator } from '../shared/validator.js';

const mockedOrderToCreateValid = {
    dateTimeOrder: new Date(),
    totalAmount: 5000,
    client: '654c059cda8e9efaeeae024d', //example id
    paymentType: '65f5e82ff4367290fb137232', //example id
    lineItems: [
        {
            quantity: 2,
            product: {
                allowsVariations: true,
                maxVariations: 3
            },
            productVariationArrays: [
                {
                    productVariations: [
                        '65c5d96c8b0ab4ed16874ad8', //example id
                        '65c5d96c8b0ab4ed16874ad7' //example id
                    ]
                },
                {
                    productVariations: [
                        '65c5d96c8b0ab4ed16874ad8'
                    ]
                }
            ]
        },
        {
            quantity: 1,
            product: {
                allowsVariations: true,
                maxVariations: 3
            },
            productVariationArrays: [
                {
                    productVariations: [
                        '65c5d96c8b0ab4ed16874ad8', //example id
                        '65c5d96c8b0ab4ed16874ad7', //example id
                        '65c5d96c8b0ab4ed16874ad6' //example id
                    ]
                }
            ]
        },
        {
            quantity: 2,
            product: {
                allowsVariations: false
            },
            productVariationArrays: []
        }
    ]
}
const mockedOrderToCreateInvalid = {
    dateTimeOrder: new Date(),
    totalAmount: 5000,
    client: '654c059cda8e9efaeeae024d', //example id
    paymentType: '65f5e82ff4367290fb137232', //example id
    lineItems: [
        {
            quantity: 3, //WRONG QUANTITY --> it should be 2 
            product: {
                allowsVariations: true,
                maxVariations: 3
            },
            productVariationArrays: [
                {
                    productVariations: [
                        '65c5d96c8b0ab4ed16874ad8', //example id
                        '65c5d96c8b0ab4ed16874ad7' //example id
                    ]
                },
                {
                    productVariations: [
                        '65c5d96c8b0ab4ed16874ad8'
                    ]
                }
            ]
        },
        {
            quantity: 1,
            product: {
                allowsVariations: false, //WRONG --> does not allow variations but still were provided
            },
            productVariationArrays: [
                {
                    productVariations: [
                        '65c5d96c8b0ab4ed16874ad8', //example id
                        '65c5d96c8b0ab4ed16874ad7', //example id
                        '65c5d96c8b0ab4ed16874ad6' //example id
                    ]
                }
            ]
        }
    ]
}

describe('unit test of validateVariationsAndQuantities()', ()=>{
    test('should return true because the quantity property of each lineitem equals to each amount of arrays of product variations', ()=>{
        const validatorResponse = validator.validateVariationsAndQuantities(mockedOrderToCreateValid)
        expect(validatorResponse.isValid).toEqual(true)
    })
    test('should return false because at least one quantity property of any lineitem does not equal to its amount of arrays of product variations', ()=>{
        const validatorResponse = validator.validateVariationsAndQuantities(mockedOrderToCreateInvalid)
        expect(validatorResponse.isValid).toEqual(false)
    })
})

describe('unit test of validateVariationsSize()', ()=>{
    test('should return true because no variations are provided if the product does not allow them', ()=>{
        const validatorResponse = validator.validateVariationsSize(mockedOrderToCreateValid)
        expect(validatorResponse.isValid).toEqual(true)
    })
    test('should return false because at least one product that does not allow variations was provided with at least one of them', ()=>{
        const validatorResponse = validator.validateVariationsSize(mockedOrderToCreateInvalid)
        expect(validatorResponse.isValid).toEqual(false)
    })
})

describe('unit test of validatePriceAmount() test', () => {
    test('should return false because the string passed is not a number', () =>
    {
        const validatorResponse = validator.validatePriceAmount('test value') 
        expect(validatorResponse.isValid).toEqual(false)
    })
    test('should return false because the string passed is a negative number', () => 
    {
        const validatorResponse = validator.validatePriceAmount('-24') 
        expect(validatorResponse.isValid).toEqual(false)
    })
    test('should return true because the string passed is a number higher than 0', () =>
    {
        const validatorResponse = validator.validatePriceAmount('24') 
        expect(validatorResponse.isValid).toEqual(true)
    })
})

describe('unit test of validateMaxCharLength', () => {
    test('should return false because the string length is higher than the maxLength provided', () => 
    {
        const validatorResponse = validator.validateMaxCharLength('undefinedislife',9)
        expect(validatorResponse.isValid).toEqual(false)
    })
    test('should return true because the string length is equal to the maxLength provided', () => 
    {
        const validatorResponse = validator.validateMaxCharLength('undefined',9)
        expect(validatorResponse.isValid).toEqual(true)
    })
    test('should return true because the string length is lower than the maxLength provided', () => 
    {
        const validatorResponse = validator.validateMaxCharLength('undefined',10)
        expect(validatorResponse.isValid).toEqual(true)
    })
})




