const { v4: uuid } = require('uuid');
const redis = require('../storage/redis');

const REDIS_SET_SUCCESS = 'OK';

class JobRepository {
  constructor(prefix = 'jobs') {
    this.prefix = prefix;
  }

  async getById(jobId) {
    const res = await redis.get(`${this.prefix}:${jobId}`);
    if (!res)
      throw new Error(`No job with id: ${jobId}`);
    
    return JSON.parse(res);
  }

  async defineNew(jobDefinition) {
    const jobId = uuid();
    const res = await redis.set(`${this.prefix}:${jobId}`, JSON.stringify(jobDefinition));

    if (res !== REDIS_SET_SUCCESS)
      throw new Error('Failed to define new job');

    return jobId;
  }

  async remove(jobId) {
    const res = await redis.del(`${this.prefix}:${jobId}`);

    if (res !== 1 && res !== '1')
      throw new Error(`Failed to remove definition for job with id: ${jobId}`);

    return;
  }
}

module.exports = new JobRepository();