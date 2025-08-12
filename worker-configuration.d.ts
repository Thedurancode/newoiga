// Type definitions for worker configuration
/// <reference types="@cloudflare/workers-types" />

interface WorkerEnv {
  DB: D1Database;
  EVENT_IMAGES: R2Bucket;
  ASSETS: Fetcher;
}

export default WorkerEnv;
