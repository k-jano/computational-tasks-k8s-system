const path = require('path');
const JobRepo = require('../repositories/jobRepository');
const JobQueue = require('../repositories/jobPriorityQueue');
const StatusRepo = require('../repositories/statusRepository');

const STATUS_PROCESSING = 'PROCESSING';

const UNSET_JOB_PROPERTIES = {
  args: [],
  workdir: null,
};

const dequeueJob = async (req, res) => {
  try {
    const jobId = await JobQueue.dequeue();
    const jobDefinition = await JobRepo.getById(jobId);
    
    await StatusRepo.set(jobId, STATUS_PROCESSING);

    const outPath = path.join(jobDefinition.currentDir, `job_${jobId}.out`);
    const errPath = path.join(jobDefinition.currentDir, `job_${jobId}.err`);

    return res.status(200).json({
      workflow: [
        {
          id: jobId,
          ...UNSET_JOB_PROPERTIES,
          ...jobDefinition,
          out: outPath,
          err: errPath,
        },
      ],
    });
  } catch (err) {
    return res.status(500).json({
      err: 'FAILED_TO_DEQUEUE',
      msg: err.message,
    });
  }
};

module.exports = dequeueJob;