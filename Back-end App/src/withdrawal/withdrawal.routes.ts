import { Router } from 'express';
import { findAll, findOne, add, sanitizedInput, findAllByDelivery /*, remove , update*/ } from './withdrawal.controller.js'

export const withdrawalRouter = Router()

withdrawalRouter.get('/',findAll)
withdrawalRouter.get('/:id', findOne)
withdrawalRouter.get('/all-delivery-withdrawals/:idDelivery',findAllByDelivery)
withdrawalRouter.post('/',sanitizedInput,add)

//withdrawalRouter.delete('/:id', remove)
//withdrawalRouter.put('/:id',sanitizedInput ,update)
//withdrawalRouter.patch('/:id',sanitizedInput ,update)
