import { Request, Response, NextFunction } from "express";
import { UserType } from "./userType.entity.js";
import { orm } from "../shared/orm.js";

const { em } = orm;

export function sanitizedInput(req: Request, _: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id,
    description: req.body.description,
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
    const userTypes = await em.find(UserType, {
      description: {
        $ne: "admin",
      },
    });

    return res
      .status(200)
      .json({ message: "All user types found", data: userTypes });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export function findOne(_: Request, res: Response) {
  try {
    res.status(500).json({ message: "Method not implemented" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export function remove(_: Request, res: Response) {
  try {
    res.status(500).json({ message: "Method not implemented" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export function add(_: Request, res: Response) {
  try {
    res.status(500).json({ message: "Method not implemented" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export function update(_: Request, res: Response) {
  try {
    res.status(500).json({ message: "Method not implemented" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
