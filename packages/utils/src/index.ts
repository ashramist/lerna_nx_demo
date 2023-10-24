import log from 'npmlog';

log.level = process.env.LOG_LEVEL ?? 'info';
log.heading = 'xf';
log.headingStyle = { bg: 'yellow', bold: true };
log.addLevel('success', 2000, { fg: 'green', bold: true });

export default log;
