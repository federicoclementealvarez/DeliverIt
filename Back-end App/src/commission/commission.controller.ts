import { Response, Request, NextFunction } from 'express';
import { Commission } from './commission.entity.js';
import { CommissionRepository } from './commission.repository.js';

const repository = new CommissionRepository();

function sanitizeInputCommission (req: Request, res: Response, next: NextFunction)
{
    req.body.sanitizedInput= {
    id: req.body.id,
    validSince: req.body.validSince,
    percentage: req.body.percentage
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

function findAll(req: Request, res: Response) { res.json({data:repository.findAll()}) }

function findOne (req: Request, res: Response) 
{
  const id = parseInt(req.params.id)
  const commission = repository.findOne({id})
  
  if (!commission) { res.status(404).send({message:'Commission not found'})}
  else {res.json({data: commission})}
}

function add(req: Request, res:Response)
{
  const input = req.body.sanitizedInput
  const commissionInput = new Commission (
    input.id,
    input.validSince,
    input.percentage
  )
  
  const commission = repository.add(commissionInput)
  res.status(201).send({message: 'Commission created', data : commission})
}

function update(req:Request, res: Response)
{
  req.body.sanitizedInput.id = parseInt(req.params.id)
  const commission = repository.update(req.body.sanitizedInput)

  if (!commission) { return res.status(404).send({ message: 'Commission not found' })}
  else { return res.status(200).send({ message: 'Commission updated successfully', data: commission })}
}

function remove (req:Request, res: Response)
{
  const id = parseInt(req.params.id)
  const commission = repository.remove({id})
  if (!commission)  { return res.status(404).send({ message: 'Commission not found' }) }
  else { return res.status(200).send({ message: 'Commission deleted successfully', data: commission })}
}

export {findAll, findOne, add ,update, remove, sanitizeInputCommission }
