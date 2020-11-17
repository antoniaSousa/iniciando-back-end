

import { container } from 'tsyringe';
import uploadConfig from '@config/upload';
import IStorageProvider from './models/StorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';
import UpdateProfile from '@modules/users/services/UpdateProfileService';

const providers = {
    disk: DiskStorageProvider,
    s3: S3StorageProvider,
};
container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    providers[uploadConfig.driver],
);


