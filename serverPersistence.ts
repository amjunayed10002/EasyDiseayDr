import dotenv from "dotenv";

dotenv.config();

export interface PersistentSnapshot {
  appSettings: {
    loginRequired: boolean;
    customLogo: string;
    contactAdmin: {
      email: string;
      phone: string;
      description: string;
      displayStyle: "card_green" | "card_dual";
    };
  };
  adminPassword: string;
  users: unknown[];
  registrationRequests: unknown[];
  analyses: unknown[];
  medicines: unknown[];
  diseases: unknown[];
}

const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
const stateKey = "easydiseay:state";

const redisRequest = async (command: string, ...args: string[]): Promise<unknown> => {
  if (!redisUrl || !redisToken) return null;
  const response = await fetch(redisUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command, ...args]),
  });
  if (!response.ok) {
    throw new Error(`Persistent storage request failed with HTTP ${response.status}`);
  }
  const payload = await response.json() as { result?: unknown };
  return payload.result;
};

export const persistenceConfigured = Boolean(redisUrl && redisToken);

export const loadPersistentSnapshot = async (): Promise<PersistentSnapshot | null> => {
  if (!persistenceConfigured) return null;
  const value = await redisRequest("GET", stateKey);
  if (typeof value !== "string" || !value) return null;
  return JSON.parse(value) as PersistentSnapshot;
};

export const savePersistentSnapshot = async (snapshot: PersistentSnapshot): Promise<void> => {
  if (!persistenceConfigured) return;
  await redisRequest("SET", stateKey, JSON.stringify(snapshot));
};
