import{container} from 'tsyringe';
import BCryptHasProvider from './HashProvider/implementations/BCryptHasProvider';

import IHashProvider from './HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHasProvider);
