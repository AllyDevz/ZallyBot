const ProgressBar = require('progress');

const bar = new ProgressBar(':bar', { total: 100000000 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 100);
