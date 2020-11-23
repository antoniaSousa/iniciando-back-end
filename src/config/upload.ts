
import path from 'path';
import crypto from 'crypto';
import multer, {StorageEngine} from 'multer';
const tmpFolder = path.resolve(__dirname,'..','..', 'tmp' );

interface IUploadConfig {
    driver: 's3' | 'disk';
    tmpFolder: string;
    uploadFolder: string;
    multer: {
        storage: StorageEngine;
    }

    config:{
        disk:{ };
        aws: {
        bucket: string;
        }
    }
}
export default{
    driver: process.env.STORAGE_DRIVER,

    tmpFolder,
    uploadFolder: path.resolve(tmpFolder, 'uploads'),
    multer:{
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(reqest, file, callback){
                const fileHash = crypto.randomBytes(10).toString('HEX');
                const filename = `${fileHash}-${file.originalname}`;

                return callback(null, filename);
            },
        }),
    },

    config: {
    disk: {},
    aws: {
        bucket: 'blanda'
    },
    }
} as IUploadConfig;
