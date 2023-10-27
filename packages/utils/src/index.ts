import log from 'npmlog';
import pkg from '../package.json';
log.level = process.env.LOG_LEVEL ?? 'info';
log.heading = pkg.name.split('/')[0].substring(1);
log.headingStyle = { bg: 'yellow', bold: true };
log.addLevel('success', 2000, { fg: 'green', bold: true });

export default log;
