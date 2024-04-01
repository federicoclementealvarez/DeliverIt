import { Request, Response, NextFunction } from 'express';
import { PaymentType } from './paymentType.entity.js';
import { orm } from '../shared/orm.js';
import { validator } from '../shared/validator.js';

const em = orm.em

export function sanitizedInput(req: Request, _: Response, next: NextFunction) {

  req.body.sanitizedInput = {
    description: req.body.description
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  })

  next();
}

export async function findAll(_: Request, res: Response) {
  try {
    const paymentTypes = await em.find(PaymentType, {}, { orderBy: { description: "asc" } })
    return res.status(200).json({ message: 'All payment types found', data: paymentTypes })
  }
  catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export async function findOne(req: Request, res: Response) {
  try {
    const validatorResponse = validator.validateObjectId(req.params.id)
    if (!validatorResponse.isValid) { return res.status(500).json({ message: validatorResponse.message }) }
    const paymentType = await em.findOne(PaymentType, req.params.id)
    if (paymentType === null) { return res.status(404).json({ message: 'Payment type not found' }) }
    return res.status(200).json({ message: 'Payment type found', data: paymentType })
  }
  catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const validatorResponse = validator.validateObjectId(req.params.id)
    if (!validatorResponse.isValid) { return res.status(500).json({ message: validatorResponse.message }) }
    const paymentType = await em.findOne(PaymentType, req.params.id)
    if (paymentType === null) { return res.status(404).json({ message: 'Payment type not found' }) }
    await em.removeAndFlush(paymentType)
    return res.status(200).json({ message: 'Payment type deleted successfully' })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export async function add(req: Request, res: Response) {
  try {
    const paymentType = em.create(PaymentType, req.body.sanitizedInput)
    await em.flush()
    return res.status(201).json({ message: 'Payment type created successfully', data: paymentType })
  }
  catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export async function update(req: Request, res: Response) {
  try {
    const validatorResponse = validator.validateObjectId(req.params.id)
    if (!validatorResponse.isValid) {
      return res.status(500).json({ message: validatorResponse.message })
    }
    const paymentType = await em.findOne(PaymentType, req.params.id)
    if (paymentType === null) { return res.status(404).json({ message: 'Payment type not found' }) }
    em.assign(paymentType, req.body.sanitizedInput)
    await em.flush()
    return res.status(200).json({ message: 'Payment type updated successfully' })
  }
  catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}