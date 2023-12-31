import { Router } from "express";
import 
{ 
  add, findAll,findAllByDelivery,findCurrentCustomerOrders,findCurrentDeliveryOrders,findOne,findOrdersWithoutDelivery, // setCompletedOrder, setDelivery, 
  update, validateUpdate 
} from "./order.controller.js";

export const orderRouter = Router()


orderRouter.get('/',findAll)
orderRouter.get('/:id',findOne)
orderRouter.get('/all-orders-delivered/:idDelivery',findAllByDelivery)
orderRouter.get('/orders-without-delivery/~', findOrdersWithoutDelivery)
orderRouter.get('/current-deliveries/:idDelivery', findCurrentDeliveryOrders)
orderRouter.get('/current-orders/:idCustomer',findCurrentCustomerOrders)
orderRouter.put('/:id', validateUpdate,update)
orderRouter.post('/',add)
