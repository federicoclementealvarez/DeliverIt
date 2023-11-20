import { orm } from "../shared/orm.js";
import { Order } from "./order.entity.js";
import { Request, Response} from "express";
import { validator } from "../shared/validator.js";
import { NextFunction } from "express";
// import { addByOrderId } from "../lineItem/lineItem.controller.js"; TO BE ANALYZED


const em = orm.em

export async function findAll(req: Request,res: Response)
{ 
try {
 const orders = await em.find(Order,{},{populate: ['client','delivery','paymentType','lineItems']})
 return res.status(200).json({message:'found all orders ', data: orders})
}
catch(error: any){
 return res.status(500).json({message:error.message})
}
}

export async function findOne (req: Request, res:Response)
{
 try{
    const validatorResponse = validator.validateObjectId(req.params.id)
    if(!validatorResponse.isValid){  return res.status(500).json({message: validatorResponse.message})}
    
    const order = await em.findOne(Order,req.params.id,{populate:['client','paymentType','lineItems','delivery']})
    
    if(order===null){ return res.status(404).json({message: 'Order not found'})}
    
    return res.status(200).json({message: 'Order found', body: order})}
      
  catch(error:any){
  return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})}
}

export async function add(req: Request, res: Response)
{
  try{
    const newOrder = em.create(Order,req.body)
    req.body.id = newOrder.id
    /*for (const lineItem of newOrder.lineItems){ addByOrderId(lineItem.quantity,lineItem.product.id,newOrder.id)}  TO BE ANALYZED */
    await em.flush()
    return res.status(201).json({message:'order created',data:newOrder})
  }

  catch(error:any){
    return res.status(500).json({message:error.message})
  }
}

export async function findCurrentCustomerOrders(req: Request, res: Response)
{
  try { 
    const validatorResponse = validator.validateObjectId(req.params.idCustomer)
    if(!validatorResponse.isValid){return res.status(500).json({message: validatorResponse.message})}
    const currentCustomerOrders = await em.find(Order,{},{filters:{dateTimeArrival: true,client:{par: req.params.idCustomer}},populate:['paymentType','lineItems']})
    return res.status(200).json({message:'found all current customer orders',data: currentCustomerOrders})
  }

  catch(error:any){
    return res.status(500).json({message:error.message})
  }
}

export async function findOrdersWithoutDelivery(req: Request, res: Response) 
{
  try { 
    const ordersWithoutDelivery = await em.find(Order,{},{filters:['deliveryUndefined'],populate:['client','paymentType','lineItems']})
    return res.status(200).json({message:'found all orders w/o delivery',data: ordersWithoutDelivery})
  }

  catch(error:any){
    return res.status(500).json({message:error.message})
  }
}

export async function findCurrentDeliveryOrders(req: Request, res: Response)
{
  try { 
    const validatorResponse = validator.validateObjectId(req.params.idDelivery)
    if(!validatorResponse.isValid){return res.status(500).json({message: validatorResponse.message})}
    const currentDeliveryOrders = await em.find(Order,{},{filters:{dateTimeArrival: true,delivery:{par: req.params.idDelivery}},populate:['client','paymentType','lineItems']})
    return res.status(200).json({message:'found all current delivery orders',data: currentDeliveryOrders})
  }

  catch(error:any){
    return res.status(500).json({message:error.message})
  }
}

export async function findAllByDelivery(req: Request,res: Response) //this method gets every order a single delivery boy has delivered
{ 
try {
 const orders = await em.find(Order,{},{filters:{delivery:{par: req.params.idDelivery}, dateTimeArrivalSet: true} ,populate: ['client','delivery','paymentType','lineItems']})
 return res.status(200).json({message:'found all orders ', data: orders})
}
catch(error: any){
 return res.status(500).json({message:error.message})
}
}

  export async function validateUpdate(req: Request, res: Response, next: NextFunction)
{
  const validatorResponse = validator.validateObjectId(req.params.id)
  if(!validatorResponse.isValid){return res.status(500).json({message: validatorResponse.message})}

  if (req.body.delivery!==undefined) 
  {
    const order = await em.findOne(Order,req.params.id,{filters:['deliveryUndefined']}) //race condition validation
    if (order===null){ return res.status(404).json({message: 'someone has already taken this order to deliver'})}
  }

  if (req.body.dateTimeArrival!==undefined) 
  {
    const order = await em.findOne(Order,req.params.id)
    if (order===null) {return res.status(404).json({message:'order not found'})}
  }

  next()
} 

export async function update(req:Request, res: Response) 
{
 try {
      const order = await em.findOne(Order,req.params.id) 
      if (order===null) {return}
      em.assign(order, req.body)
      await em.flush()
      res.status(200).json({ message: 'order updated', data: order})}
  
  catch (error: any) 
  {
    res.status(500).json({ message: error.message })
  }
}

/*
export async function setCompletedOrder(req:Request, res: Response) //used when the arrival time needs to be set 
{
 try {

    const validatorResponse = validator.validateObjectId(req.params.id)
    if(!validatorResponse.isValid){return res.status(500).json({message: validatorResponse.message})}
    const id = req.params.id
    const order = await em.findOne(Order,id)
    if (order===null) {return res.status(404).json({message:'order not found'})}
    em.assign(order, req.body)
    await em.flush()
    res.status(200).json({ message: 'order completed by setting arrival time', data: order})} 
    
    catch (error: any) {res.status(500).json({ message: error.message })
  }
}


export async function setDelivery(req:Request, res: Response) //used when the delivery accepts to take an order (it is also an update, but only in this case the race condition is needed)
{
 try {
      const validatorResponse = validator.validateObjectId(req.params.id)
      if(!validatorResponse.isValid){return res.status(500).json({message: validatorResponse.message})}
      
      const order = await em.findOne(Order,req.params.id,{filters:['deliveryUndefined']}) //race condition validation

      if (order===null){ return res.status(404).json({message: 'someone has already taken this order to deliver'})}
      
    em.assign(order, req.body)
    await em.flush()
    res.status(200).json({ message: 'the order now has a delivery boy', data: order})}
  
    catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
  
*/

