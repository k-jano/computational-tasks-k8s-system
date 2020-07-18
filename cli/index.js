#! /usr/bin/env node
const { config } = require('dotenv');
const axios = require('axios').default;

config();

if(process.argv.length < 3) {
  console.error("Usage: kubedule <script_path> <args>");
  process.exit(1);
}

const scriptPath = process.argv[2];
const args = process.argv.slice(3);

axios.post(`${process.env.JQM_URL}/jobs/schedule`, {
  script: scriptPath,
  args: args,
  workdir: ''
}).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
  //console.er
})
