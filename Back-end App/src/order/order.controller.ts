import { orm } from "../shared/orm.js";
import { Order } from "./order.entity.js";
import { Request, Response} from "express";
import { validator } from "../shared/validator.js";
import { addByOrderId } from "../lineItem/lineItem.controller.js";



const em = orm.em

export async function findAll(res: Response, req: Request)
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
    
    return res.status(200).json({message: 'Order found', body: Order})}
      
  catch(error:any){
  return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})}
}

export async function add(req: Request, res: Response)
{
  try{
    const newOrder = em.create(Order,req.body)
    req.body.id = newOrder.id
    for (const lineItem of newOrder.lineItems){
      addByOrderId(lineItem.quantity,lineItem.product.id,newOrder.id)
    }
    
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

export async function findAllByDelivery(res: Response, req: Request) //this method gets every order a single delivery boy has delivered
{ 
try {
 const orders = await em.find(Order,{},{filters:{delivery:{par: req.params.idDelivery}} ,populate: ['client','delivery','paymentType','lineItems']})
 return res.status(200).json({message:'found all orders ', data: orders})
}
catch(error: any){
 return res.status(500).json({message:error.message})
}
}

export async function setCompletedOrder(req:Request, res: Response) //used when the arrival time needs to be set 
{
 try {

    const validatorResponse = validator.validateObjectId(req.params.id)
    if(!validatorResponse.isValid){return res.status(500).json({message: validatorResponse.message})}
    const id = req.params.id
    const order = await em.findOne(Order,id )

    if (order===null) {return res.status(404).json({message:'order not found'})}
    
    const orderUpdate = {   //i think this could be avoided if i just set order.dateTimeArrival to new Date() but idk exactly how that works with assign
      dateTimeOrder: order.dateTimeOrder,
      dateTimeArrival: new Date(),
      delivery: order.delivery,
      client: order.client,
      lineItems: order.lineItems,
      paymentType: order.paymentType
    }
    em.assign(order, orderUpdate)
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
      
      const validatorResponse2 = validator.validateObjectId(req.params.idDelivery)
      if(!validatorResponse2.isValid){return res.status(500).json({message: validatorResponse.message})}
      
      const order = await em.findOne(Order,req.params.id,{filters:['deliveryUndefined']}) //race condition validation
      
      if (order===null){ return res.status(404).json({message: 'someone has already taken this order to deliver'})}
      
      const orderUpdate = {
       dateTimeOrder: order.dateTimeOrder,
       delivery: req.params.idDelivery,
       client: order.client,
       lineItems: order.lineItems,
        paymentType: order.paymentType
    }
    em.assign(order, orderUpdate)
    await em.flush()
    res.status(200).json({ message: 'the order now has a delivery boy', data: order})}
  
    catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
  
  


