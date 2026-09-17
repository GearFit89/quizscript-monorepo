import Redis from "ioredis";
import ENV from "@/env";

// Enable lazyConnect so importing this module doesn't force an immediate connection
const redis = new Redis(ENV.REDIS_URL, {
  lazyConnect: true,
  maxRetriesPerRequest: 3,
});

// Prevent unhandled errors from crashing the Node process
redis.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

// Graceful cleanup on process exit
const shutdown = async () => {
  if (redis.status === "ready" || redis.status === "connecting") {
    await redis.quit();
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default redis;