import {rateLimit} from "express-rate-limit";

export const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  legacyHeaders: false,
  message: { message: "Too many attempts. Please try again later." },
});