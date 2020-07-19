const axios = require('axios').default;
const { spawn } = require('child_process');
const fs = require('fs');

const pref_path = '/pv';

const executorRoutine = () => {
  axios.get(`${process.env.JQM_URL}/jobs/dequeue`)
    .then(res => {
      try {
        console.log('Job execution')
        const wf = res.data.workflow;

        wf.forEach(job => {
          console.log('Job ' + job.id);
          const stdoutLog = fs.createWriteStream(pref_path + job.out, {flags: 'w'});
          const stderrLog = fs.createWriteStream(pref_path + job.err, {flags: 'w'});

          const cmd = spawn(pref_path + job.script, job.args);

          cmd.stdout.pipe(stdoutLog);
          cmd.stderr.pipe(stderrLog);

          cmd.stdout.on('close', async () => {
            await axios.put(`${process.env.JQM_URL}/jobs/${job.id}/complete`);
          })
        })
      } catch(err) {
        console.error(err);
      };
    }).catch(err => {
      console.error(err.response.data);
    })
}

setInterval(executorRoutine, 5000);