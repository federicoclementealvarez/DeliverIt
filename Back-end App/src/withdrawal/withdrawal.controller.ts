import { orm } from '../shared/orm.js';
import { Request, Response, NextFunction } from 'express';
import { Withdrawal } from './withdrawal.entity.js';
import { validator } from '../shared/validator.js';

const em = orm.em;

export function sanitizedInput(req: Request, _: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    amount: req.body.amount,
    amountBefore: req.body.amountBefore,
    amountAfter: req.body.amountAfter,
    dateTime: req.body.dateTime,
    user: req.body.user,
  };
  next();
}

export async function findAll(req: Request, res: Response) {
  try {
    const withdrawals = await em.find(Withdrawal, {}, { populate: ['user'] });
    return res
      .status(200)
      .json({ message: 'found all withdrawals ', data: withdrawals });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function findOne(req: Request, res: Response) {
  try {
    const validatorResponse = validator.validateObjectId(req.params.id);
    if (!validatorResponse.isValid) {
      return res.status(500).json({ message: validatorResponse.message });
    }

    const withdrawal = await em.findOne(Withdrawal, req.params.id, {
      populate: ['user'],
    });

    if (withdrawal === null) {
      return res.status(404).json({ message: 'Withdrawal not found' });
    }

    return res
      .status(200)
      .json({ message: 'Withdrawal found', data: withdrawal });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function findAllByDelivery(req: Request, res: Response) {
  try {
    const validatorResponse = validator.validateObjectId(req.params.idDelivery);
    if (!validatorResponse.isValid) {
      return res.status(500).json({ message: validatorResponse.message });
    }

    const allDeliveryWithdrawals = await em.find(
      Withdrawal,
      {},
      {
        filters: { delivery: { par: req.params.idDelivery } },
        populate: ['user'],
      }
    );

    const withdrawalsInOrder = allDeliveryWithdrawals.sort(compareFunction);

    return res
      .status(200)
      .json({
        message: 'found all delivery withdrawals',
        data: allDeliveryWithdrawals,
      });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function add(req: Request, res: Response) {
  try {
    const withdrawal = em.create(Withdrawal, req.body.sanitizedInput);
    await em.flush();
    return res
      .status(201)
      .json({ message: 'Withdrawal created successfully', data: withdrawal });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

function compareFunction(a: Withdrawal, b: Withdrawal) {
  if (a.dateTime < b.dateTime) {
    return 1;
  } else if (a.dateTime > b.dateTime) {
    return -1;
  } else {
    return 0;
  }
}
