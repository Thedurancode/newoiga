// Type definitions for worker configuration
/// <reference types="@cloudflare/workers-types" />

interface WorkerEnv {
  DB: D1Database;
  EVENT_IMAGES: R2Bucket;
}

export default WorkerEnv;
