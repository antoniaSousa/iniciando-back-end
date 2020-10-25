
import {container} from 'tsyringe';
import IStorageProvider from './StorageProvider/models/StorageProvider';
import DiskSorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskSorageProvider,
    );

