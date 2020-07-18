const path = require('path');
const JobRepo = require('../repositories/jobRepository');

const validateRequiredParams = (req, res, next) => {
  const { script } = req.body;
  if (!script) {
    return res.status(400).json({
      err: 'MISSING_PARAMS',
      msg: 'No script path provided'
    });
  }

  return next();
};

const scheduleJob = async (req, res) => {
  const { args, script, workdir } = req.body;
  const absolutePathRegex = /\/.*\/.*/;

  try {
    if (!absolutePathRegex.test(script))
      throw new Error(`Invalid absolute path for script file: ${script}`);

    if (workdir && !absolutePathRegex.test(workdir))
      throw new Error(`Invalid absolute path for workdir: ${workdir}`);

    const currentDir = script.split('/').slice(0, -1).join('/');
    const jobId = await JobRepo.defineNew({
      args,
      script,
      workdir,
    });
    const outPath = path.join(currentDir, `job_${jobId}.out`);
    const errPath = path.join(currentDir, `job_${jobId}.err`);

    return res.status(200).json({
      status: 'SCHEDULED',
      job: {
        id: jobId,
        priority: 100,
      },
      paths: {
        out: outPath,
        err: errPath,
      },
    });
  } catch (err) {
    return res.status(500).json({
      err: 'FAILED_TO_SCHEDULE',
      msg: err.message,
    });
  }
};

module.exports = [
  validateRequiredParams,
  scheduleJob,
];