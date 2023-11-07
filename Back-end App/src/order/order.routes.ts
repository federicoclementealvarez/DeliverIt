import { Router } from "express";
import { add, findAll,findAllByDelivery,findCurrentCustomerOrders,findCurrentDeliveryOrders,findOne,findOrdersWithoutDelivery, setCompletedOrder, setDelivery } from "./order.controller.js";

export const orderRouter = Router()


orderRouter.get('/',findAll)
orderRouter.get('/:id',findOne)
orderRouter.get('/all-orders-delivered/:idDelivery',findAllByDelivery)
orderRouter.get('/orders-without-delivery', findOrdersWithoutDelivery)
orderRouter.get('/current-deliveries/:idDelivery', findCurrentDeliveryOrders)
orderRouter.get('/current-orders/:idCustomer',findCurrentCustomerOrders)
orderRouter.put('/:id', setCompletedOrder)
orderRouter.put('/:id&:idDelivery', setDelivery)
orderRouter.post('/',add)

