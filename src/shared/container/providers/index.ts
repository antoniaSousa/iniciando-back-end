
import {container} from 'tsyringe';
import IStorageProvider from './StorageProvider/models/StorageProvider';
import DiskSorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/model/IMailProviders';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailProvider/model/IMailProviders';
import HandlebarsMailTemplateProvider from './MailProvider/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';


    container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskSorageProvider,
    );

    container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve (EtherealMailProvider)
    );
    container.registerSingleton<IMailTemplateProvider>(
        'MailTemplateProvider',
        HandlebarsMailTemplateProvider,
    );

