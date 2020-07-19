const JobRepo = require('../repositories/jobRepository');
const StatusRepo = require('../repositories/statusRepository');

const STATUS_COMPLETED = 'COMPLETED';

const completeJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    await StatusRepo.set(jobId, STATUS_COMPLETED);
    await JobRepo.remove(jobId);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({
      err: 'FAILED_TO_SCHEDULE',
      msg: err.message,
    });
  }
};

module.exports = completeJob;