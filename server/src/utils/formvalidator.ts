import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import responseHandler from './responsehelpers';

const formSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(18).max(75).required(),
});

export const validateForm = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = formSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return responseHandler(res, 400, errorMessage);
  }
  next();
};