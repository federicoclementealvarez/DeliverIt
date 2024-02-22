import { Response, Request, NextFunction } from 'express';
import { Commission } from './commission.entity.js';
import { validator } from '../shared/validator.js';
import { orm } from '../shared/orm.js';

const em = orm.em

export function sanitizedInput(req: Request, _: Response, next: NextFunction)
{
  req.body.sanitizedInput = 
  {
    id: req.body.id,
    validSince: req.body.validSince,
    percentage: req.body.percentage
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => 
  {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

export async function findAll(_: Request, res: Response) 
{ 
  try
  {
    const commissions = await em.find(Commission, {})
    return res.status(200).json({message: 'All commissions found', data: commissions})
  }
  catch(error:any)
  {
    return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export async function findOne (req: Request, res: Response) 
{
  try
  {
    const validatorResponse = validator.validateObjectId(req.params.id)
    if(!validatorResponse.isValid)
    {
      return res.status(500).json({message: validatorResponse.message})
    }
    const commission = await em.findOne(Commission,req.params.id)
    if(commission===null)
    {
      return res.status(404).json({message: 'Commission not found'})
    }
    
    return res.status(200).json({message: 'Commission found', data: commission})
  }
  catch(error:any)
  {
    return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export async function findCurrentCommission() 
{
    const commissionList = await em.find(Commission, {})
    return commissionList.sort(compareFunction)[0]
}

export async function add(req: Request, res:Response)
{
  try
  {
   
    const commissionToCreate =
    {
      percentage: (Number.parseFloat(req.body.sanitizedInput.percentage))/100,
      validSince: req.body.sanitizedInput.validSince
    }

    let commission = await em.findOne(Commission,{},{filters:{validSinceExists:{par: commissionToCreate.validSince}}})
    console.log(commission)
    if (commission!==null) {return res.status(400).json({message:'Commission already established for that date'})}
    
    commission = em.create(Commission, commissionToCreate)
    await em.flush()
    return res.status(201).json({ message: 'Commission created successfully', data: commission })
  }
  catch(error:any)
  {
    return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export async function update(req:Request, res: Response)
{
  try
  {
    const validatorResponse = validator.validateObjectId(req.params.id)
    if(!validatorResponse.isValid)
    {
    return res.status(500).json({message: validatorResponse.message})
    }

    const commission = await em.findOne(Commission, req.body.sanitizedInput.id)

    if(commission===null)
    {
      return res.status(404).json({message: 'An error has ocurred', errorMessage: 'Commission not found'})
    }
    
    const commissionToUpdate = 
    {
      amount: Number.parseFloat(req.body.sanitizedInput.percentage)/100,
      validSince: new Date(req.body.sanitizedInput.validSince)
    }

    em.assign(commission, commissionToUpdate)

    await em.flush()

    return res.status(200).json({ message: 'Commission updated successfully'})
  }
  catch(error:any)
  {
    res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export async function remove (req:Request, res: Response)
{
  try
  {
    const validatorResponse = validator.validateObjectId(req.params.id)
    if(!validatorResponse.isValid)
    {
    return res.status(500).json({message: validatorResponse.message})
    }

    const commission = await em.findOne(Commission, req.params.id)
    if (commission===null)
    {
      return res.status(404).json({message:'Commission not found'})
    }
    await em.removeAndFlush(commission)
    return res.status(200).json({message: 'Commission deleted successfully'})
  }
  catch(error:any)
  {
    res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

function compareFunction(a: Commission, b: Commission){
  if(a.validSince<b.validSince){
    return 1;
  }
  else if (a.validSince>b.validSince){
    return -1;
  }
  else{
    return 0;
  }
}