import { Router } from 'express';
import { findAll, findOne, remove,update,add,sanitizedInput } from './commission.controller.js'

export const commissionRouter = Router()

commissionRouter.get('/',findAll)
commissionRouter.get('/:id', findOne)
commissionRouter.delete('/:id', remove)
commissionRouter.put('/:id',sanitizedInput ,update)
commissionRouter.patch('/:id',sanitizedInput ,update)
commissionRouter.post('/',sanitizedInput,add)