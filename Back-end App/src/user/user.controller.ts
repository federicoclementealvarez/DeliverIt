import { orm } from '../shared/orm.js';
import { Request, Response, NextFunction } from 'express';
import { validator } from '../shared/validator.js';
import { User } from './user.entity.js';
import { UserType } from '../userType/userType.entity.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { secret } from '../shared/auth.middleware.js';
import { isProduction } from '../appConfig.js';

const em = orm.em;

export function sanitizedInput(req: Request, _: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    surname: req.body.surname,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
    creditBalance: req.body.creditBalance,
    street: req.body.street,
    streetNumber: req.body.streetNumber,
    apartment: req.body.apartment,
    additionalInfo: req.body.additionalInfo,
    userType: req.body.userType,
    withdrawals: req.body.withdrawals,
    clientOrders: req.body.clientOrders,
    deliveryOrders: req.body.deliveryOrders,
    reviews: req.body.reviews,
    shop: req.body.shop,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

export async function findAll(_: Request, res: Response) {
  try {
    const users = await em.find(User, {}, { populate: ['userType'] }); //ver el populate si es correcto
    return res.status(200).json({ message: 'found all users ', data: users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function findOne(req: Request, res: Response) {
  try {
    const validatorResponse = validator.validateObjectId(req.params.id);
    if (!validatorResponse.isValid) {
      return res.status(500).json({ message: validatorResponse.message });
    }

    const user = await em.findOne(User, req.params.id, {
      populate: ['userType', 'withdrawals'],
    }); //ver el populate si es correcto

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User found', data: user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function remove(_: Request, res: Response) {
  try {
    res.status(500).json({ message: 'Method not implemented' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// register
export async function add(req: Request, res: Response) {
  try {
    const type = (await em.findOne(UserType, {
      _id: req.body.sanitizedInput.userType,
    })) as UserType; // validar que exista tipo de usuario en un futuro

    const isEmailExist = await em.findOne(User, {
      email: req.body.sanitizedInput.email,
    }); //validates that email its not registered
    if (isEmailExist) {
      return res.status(400).json({ message: 'Email already registered' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(
        req.body.sanitizedInput.password,
        salt
      );

      const userToCreate = {
        name: req.body.sanitizedInput.name,
        surname: req.body.sanitizedInput.surname,
        phoneNumber: req.body.sanitizedInput.phoneNumber,
        email: req.body.sanitizedInput.email,
        password: hashPassword,
        creditBalance: req.body.sanitizedInput.creditBalance,
        street: req.body.sanitizedInput.street,
        streetNumber: req.body.sanitizedInput.streetNumber,
        apartment: req.body.sanitizedInput.apartment,
        additionalInfo: req.body.sanitizedInput.additionalInfo,
        userType: type,
        withdrawals: req.body.sanitizedInput.withdrawals,
        clientOrders: req.body.sanitizedInput.clientOrders,
        deliveryOrders: req.body.sanitizedInput.deliveryOrders,
        reviews: req.body.sanitizedInput.reviews,
        shop: req.body.sanitizedInput.shop, // ver esto
      };

      const newUser = em.create(User, userToCreate);
      await em.flush();

      return res.status(201).json({ message: 'user created', data: newUser });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const user = await em.findOne(
      User,
      { email: req.body.sanitizedInput.email },
      { populate: ['userType'] }
    ); //ver si este populate es correcto
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.sanitizedInput.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Password is incorrect' });
    }

    //create token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        userType: user.userType,
      },
      secret
    );

    return res
      .cookie('access_token', token, {
        secure: isProduction,
        httpOnly: true,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 900000,
      })
      .status(200)
      .json({
        status: 200,
        message: 'Login Successful',
        data: user,
      });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function addAdmin(req: Request, res: Response) {
  try {
    const type = (await em.findOne(UserType, {
      description: 'admin',
    })) as UserType;

    const isEmailExist = await em.findOne(User, {
      email: req.body.sanitizedInput.email,
    }); //validates that email its not registered
    if (isEmailExist) {
      return res.status(400).json({ message: 'Email already registered' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(
        req.body.sanitizedInput.password,
        salt
      );

      const adminToCreate = {
        name: req.body.sanitizedInput.name,
        surname: req.body.sanitizedInput.surname,
        phoneNumber: req.body.sanitizedInput.phoneNumber,
        email: req.body.sanitizedInput.email,
        password: hashPassword,
        creditBalance: req.body.sanitizedInput.creditBalance,
        street: req.body.sanitizedInput.street,
        streetNumber: req.body.sanitizedInput.streetNumber,
        apartment: req.body.sanitizedInput.apartment,
        additionalInfo: req.body.sanitizedInput.additionalInfo,
        userType: type,
        withdrawals: req.body.sanitizedInput.withdrawals,
        clientOrders: req.body.sanitizedInput.clientOrders,
        deliveryOrders: req.body.sanitizedInput.deliveryOrders,
        reviews: req.body.sanitizedInput.reviews,
        shop: req.body.sanitizedInput.shop, // ver esto
      };

      const newUser = em.create(User, adminToCreate);
      await em.flush();

      return res.status(201).json({ message: 'admin created', data: newUser });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function logout(_: Request, res: Response) {
  try {
    return res
      .clearCookie('access_token')
      .status(200)
      .json({ message: 'Successfully logged out' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function validateUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validatorResponse = validator.validateObjectId(req.params.id);
  if (!validatorResponse.isValid) {
    return res.status(500).json({ message: validatorResponse.message });
  }

  if (req.body.sanitizedInput.creditBalance !== undefined) {
    const user = await em.findOne(User, req.params.id); //race condition validation
    if (user === null) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.body.sanitizedInput.creditBalance =
      req.body.sanitizedInput.creditBalance + user.creditBalance;
    req.body.sanitizedInput.userToUpdate = user;
  } else {
    return res.status(401).json({ message: 'Not allowed to update' });
  }

  next();
}

export async function update(req: Request, res: Response) {
  try {
    const userToUpdate = await em.findOneOrFail(User, req.params.id, {
      populate: ['userType', 'withdrawals'],
    });

    let updatedFields = { ...req.body.sanitizedInput };

    if (req.body.sanitizedInput.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(
        req.body.sanitizedInput.password,
        salt
      );
      updatedFields.password = hashPassword;
    }

    const updatedUser = em.assign(userToUpdate, updatedFields);

    await em.flush();

    return res
      .status(200)
      .json({ message: 'User updated successfully', updatedUser });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
