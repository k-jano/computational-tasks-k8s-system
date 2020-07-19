const redis = require('../storage/redis');

const DEFAULT_PRIORITY = 100;

class JobQueue {
  constructor(name = 'jobs', prefix = 'queue') {
    this.name = `${prefix}:${name}`;
  }

  async enqueue(jobId, priority = DEFAULT_PRIORITY) {
    const res = await redis.zadd(this.name, priority, jobId);
    if (res !== 1)
      throw new Error(`Failed to enque the job: ${jobId}`);
    
    return;
  }

  async dequeue() {
    const [jobId, score] = await redis.zpopmax(this.name);

    if (!jobId && !score)
      throw new Error('Failed to get a job from a queue');

    return jobId;
  }
}

module.exports = new JobQueue();