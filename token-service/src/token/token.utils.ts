export function getEpochTimeOfCurrentMinute() {
    const now = new Date();
    now.setSeconds(0, 0);
    const epochTime = Math.floor(now.getTime() / 1000);
    return epochTime;
}

  
export function getRateLimitKey(accessKey: string): string {
    return `rate-limit:${accessKey}:${getEpochTimeOfCurrentMinute()}`;
}