

import {container} from 'tsyringe';
import IStorageProvider from './models/StorageProvider';
import DiskSorageProvider from './implementations/DiskStorageProvider';

const providers = {
    disk: DiskSorageProvider,
};
container.registerSingleton<IStorageProvider>(
' StorageProvider',
providers.disk,
    );


