import 'setimmediate';
import hrtime from 'browser-process-hrtime';

process.hrtime = hrtime;
