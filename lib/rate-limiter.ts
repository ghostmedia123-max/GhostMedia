import { NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';

type RateLimiterOptions = {
  uniqueTokenPerInterval: number;
  interval: number;
};

export default function rateLimiter(options: RateLimiterOptions) {
  const tokenCache = new LRUCache<string, number>({
    max: options.uniqueTokenPerInterval,
    ttl: options.interval,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || 0;
        const newTokenCount = tokenCount + 1;
        tokenCache.set(token, newTokenCount);
        if (newTokenCount > limit) {
          reject();
        } else {
          resolve();
        }
      }),
  };
}