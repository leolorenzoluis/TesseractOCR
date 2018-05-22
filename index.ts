import { fork } from 'child_process';
import * as path from 'path';

const imageWorker = fork(path.resolve(__dirname, 'convert-to-image.js'));

  