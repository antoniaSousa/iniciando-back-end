

import {container} from 'tsyringe';
import IStorageProvider from './models/StorageProvider';
import DiskSorageProvider from './implementations/DiskStorageProvider';


container.registerSingleton<IStorageProvider>(
' StorageProvider',
DiskSorageProvider
    );


