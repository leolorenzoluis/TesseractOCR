import fs from 'fs';
import { exec } from 'child_process';

const tesseractWorker = (file: string): void => {
    console.log('Starting tesseract job');
    console.log(`Executing OCR job to ${file}`);
    const child = exec(`tesseract pdf-to-image/${file.replace('pdf', '')}tiff output/${file}`);

    child.stdout.on('data', function (data) {
        console.log('[Tesseract Info]: ' + data);
    });
    child.stderr.on('data', function (data) {
        console.log('[Tesseract Info]: ' + data);
    });
    child.on('close', function (code) {
        fs.unlink(`pdf-to-image/${file.replace('pdf', '')}tiff`, err => {
            if (err) {
                console.log(`[Tesseract Worker]: Error deleting file [TIFF] ${err}`);
            } else { 
                console.log(`[Tesseract Worker]: Successfully deleted [TIFF] ${file}`);
            }
        });
        fs.unlink(`convert-to-images/${file}`, err => {
            if (err) {
                console.log(`[Tesseract Worker]: Error deleting file [PDF] ${err}`);
            } else {
                console.log(`[Tesseract Worker]: Successfully deleted [PDF] ${file}`);
            }
        });
    });
};
export default tesseractWorker;