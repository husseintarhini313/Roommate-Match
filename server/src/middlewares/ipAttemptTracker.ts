import type { Request, Response, NextFunction } from "express";

type IpRecord = {
  failedCount: number;
  blockedUntil: number | null;
};

const ipAttempts = new Map<string, IpRecord>();

const MAX_IP_FAILED_ATTEMPTS = 20;
const IP_BLOCK_DURATION_MS = 15 * 60 * 1000;


function getIpRecord(key: string): IpRecord {
  const existing = ipAttempts.get(key);
  if (existing) return existing;
  const fresh: IpRecord = { failedCount: 0, blockedUntil: null };
  ipAttempts.set(key, fresh);
  return fresh;
}

export function checkIpBlock(req: Request, res: Response, next: NextFunction) {
  const key = req.ip!;
  const record = getIpRecord(key);

  if (record.blockedUntil && Date.now() < record.blockedUntil) {
    const minutesLeft = Math.max(1, Math.ceil((record.blockedUntil - Date.now()) / 60000));
    return res.status(429).json({
      message: `Too many login attempts from this network. Please try again in ${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}.`,
    });
  }

  next();
}

export function recordFailedLoginByIp(key: string) {
  const record = getIpRecord(key);
  record.failedCount++;
  console.log(`[ip attempts] ${key}: ${record.failedCount} failed attempt(s)`);
  
  if (record.failedCount >= MAX_IP_FAILED_ATTEMPTS) {
    record.blockedUntil = Date.now() + IP_BLOCK_DURATION_MS;
    record.failedCount = 0;
  }
}