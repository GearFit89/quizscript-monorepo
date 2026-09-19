import pino from 'pino';

// Check if running inside a standard Node.js runtime (server side)
const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;

export const logger = pino({
    level: process.env.LOG_LEVEL
})

logger.info("hello world")