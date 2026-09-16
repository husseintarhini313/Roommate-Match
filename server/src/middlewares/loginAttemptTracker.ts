import type  {Request, Response, NextFunction} from "express";

type AttemptRecord = {
    failedCount: number;
    blockedUntil: number | null;
}

const attempts = new Map<string, AttemptRecord>();

const MAX_FAILED_ATTEMPTS = 5;
const BLOCK_DURATION_MS= 15 * 60 * 1000;

function getRecord(key: string): AttemptRecord {
  const existing = attempts.get(key);
  if (existing) 
    return existing;

  const fresh: AttemptRecord = { failedCount: 0, blockedUntil: null };
  attempts.set(key, fresh);

  return fresh;
}

export function checkLoginBlock(req: Request, res:Response, next: NextFunction){

    const key = req.body.email;
    const record= getRecord(key);

    if(record.blockedUntil && Date.now()<record.blockedUntil){
        const minutesLeft = Math.max(1, Math.ceil((record.blockedUntil - Date.now())/60000));

        return res.status(429).json({
            message: `Too many login attempts. Please try again in ${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}.`,
        });
    }

    next();
}

export function recordFailedLogin(key: string){
  const record = getRecord(key);
  record.failedCount++;

  if (record.failedCount >= MAX_FAILED_ATTEMPTS) {
    record.blockedUntil = Date.now() + BLOCK_DURATION_MS;
    record.failedCount = 0;
  }

  console.log(`[login attempts] ${key}: ${record.failedCount} failed attempt(s)`);
}

export function recordSuccessfulLogin(key: string) {
  attempts.delete(key);
  console.log(`[login attempts] ${key}: reset to 0 (successful login)`);
}