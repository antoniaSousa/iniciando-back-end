import{container} from 'tsyringe';
import BCryptHasProvider from './HashProvider/implementations/BCryptHasProvider';

import IHashProvider from './HashProvider/modules/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHasProvider);
