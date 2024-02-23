import { orm } from '../shared/orm.js';
import { Request, Response, NextFunction } from "express";
import { validator } from '../shared/validator.js';
import { User } from './user.entity.js';

const em = orm.em

export function sanitizedInput(req: Request, _: Response, next: NextFunction)
{
  req.body.sanitizedInput = 
  {
    creditBalance: req.body.creditBalance
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => 
  {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

export async function findOne (req: Request, res:Response)
{
  try
  {
    const validatorResponse = validator.validateObjectId(req.params.id)
    if(!validatorResponse.isValid){ return res.status(500).json({message: validatorResponse.message })}
    
    const user = await em.findOne(User,req.params.id)
    
    if(user===null){ return res.status(404).json({message: 'User not found'})}
    
    return res.status(200).json({message: 'User found', data: user})
  }
      
  catch(error:any)
  {
    return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}

export async function validateUpdate(req: Request, res: Response, next: NextFunction)
{
  const validatorResponse = validator.validateObjectId(req.params.id)
  if(!validatorResponse.isValid){return res.status(500).json({message: validatorResponse.message})}

  if (req.body.sanitizedInput.creditBalance!==undefined)  
  {
    const user = await em.findOne(User,req.params.id) //race condition validation
    if (user===null){ return res.status(404).json({message: 'User not found'})}
    req.body.sanitizedInput.creditBalance = req.body.sanitizedInput.creditBalance + user.creditBalance
    req.body.sanitizedInput.userToUpdate = user
  }

  else
  {
    return res.status(401).json({message: 'Not allowed to update'})
  }

  next()
} 

export async function update(req: Request, res: Response)
{
  try
  {
    em.assign(req.body.sanitizedInput.userToUpdate, req.body.sanitizedInput)
    await em.flush()
    return res.status(200).json({message: 'User updated successfully'})
  }
  catch(error:any)
  {
    return res.status(500).json({message: 'An error has ocurred', errorMessage: error.message})
  }
}