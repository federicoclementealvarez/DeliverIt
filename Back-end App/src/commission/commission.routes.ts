import { Router } from 'express';
import { findAll, findOne, remove,update,add,sanitizeInputCommission } from './commission.controller.js'

export const commissionRouter = Router()

commissionRouter.get('/',findAll)
commissionRouter.get('/:id', findOne)
commissionRouter.delete('/:id', remove)
commissionRouter.put('/:id',sanitizeInputCommission ,update)
commissionRouter.patch('/:id',sanitizeInputCommission ,update)
commissionRouter.post('/',sanitizeInputCommission,add)