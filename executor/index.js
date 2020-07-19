const axios = require('axios').default;

const executorRoutine = () => {
  axios.get(`${process.env.JQM_URL}/job/execute`)
    .then(res => {
      console.log('Res');
    }).catch(err => {
      console.error('Err');
    })
}

setInterval(executorRoutine, 5000);