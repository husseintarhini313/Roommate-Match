import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const firstError = Object.values(err.errors)[0];
    const message =
      firstError.kind === "required"
        ? `Please fill in the "${firstError.path}" field.`
        : firstError.message;

    return res.status(400).json({ message });
  }

  const message = err instanceof Error ? err.message : "Something went wrong";
  res.status(400).json({ message });
};