#! /usr/bin/env node
const { config } = require('dotenv');
const axios = require('axios').default;
const { JQM_URL } = require('./config');

config();

if(process.argv.length < 3) {
  console.error("Usage: kubedule <script_path> <args>");
  process.exit(1);
}

const scriptPath = process.argv[2];
const args = process.argv.slice(3);

console.log(JQM_URL)

axios.post(`${JQM_URL}/jobs/schedule`, {
  script: scriptPath,
  args: args,
  workdir: ''
}).then(res => {
  console.log(res.data);
}).catch(err => {
  console.error(err);
})
