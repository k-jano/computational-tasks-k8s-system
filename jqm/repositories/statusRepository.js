const redis = require('../storage/redis');

const REDIS_SET_SUCCESS = 'OK';

class StatusRepository {
  constructor(prefix = 'statuses:jobs') {
    this.prefix = prefix;
  }

  async get(jobId) {
    const status = await redis.get(`${this.prefix}:${jobId}`);
    if (!res)
      throw new Error(`No status for job with id: ${jobId}`);
    
    return status;
  }

  async set(jobId, status) {
    const res = await redis.set(`${this.prefix}:${jobId}`, status);

    if (res !== REDIS_SET_SUCCESS)
      throw new Error(`Failed to set a status for a job with id: ${jobId}`);

    return;
  }
}

module.exports = new StatusRepository();