import schedule from 'node-schedule';
import fs from 'fs';
import { exec } from 'child_process';
import tesseractWorker from './tesseract';


// schedule.scheduleJob('* * * * *', () => {
    console.log('[Image Worker]: Starting pdf to image converter');
    fs.readdir('convert-to-images', (err, files) => {
        files.forEach(file => {
            console.log(`[Image Worker]: Converting ${file} to image`);
            const child = exec(`convert -density 300 convert-to-images/${file} -depth 8 -strip -background white -alpha off pdf-to-image/${file.replace('pdf', '')}tiff`);

            child.stdout.on('data', function (data) {
                console.log('[Image Info]: ' + data);
            });
            child.stderr.on('data', function (data) {
                console.log('[Image Error]: ' + data);
            });
            child.on('close', function (code) {
                console.log(`[Image Worker]: Finished converting to ${file} to image! Code: ` + code);
                tesseractWorker(file);
            });
        })
    })
// }); 