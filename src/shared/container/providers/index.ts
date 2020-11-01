
import {container} from 'tsyringe';
import IStorageProvider from './StorageProvider/models/StorageProvider';
import DiskSorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/model/IMailProviders';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';


container.registerSingleton<IStorageProvider>(
'StorageProvider',
DiskSorageProvider,
);

container.registerInstance<IMailProvider>(
'MailProvider',
new EtherealMailProvider(),
);

