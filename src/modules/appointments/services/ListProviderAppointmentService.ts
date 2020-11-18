import { injectable, inject } from 'tsyringe';
import IAppoitmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
//import ICacheProvider from '@shared/container/providers/CacheProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
interface IRequest {
   provider_id: string;
   day: number;
   month: number;
   year: number;
}

@injectable()
class ListProviderAppointmentService{
    constructor(
        @inject ('ApponitmentsRepository')
        private apponitmentsRepository: IAppoitmentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,

        ){}

    public async execute({
        provider_id,
        day,
        year,
        month
    }: IRequest): Promise<Appointment[]>{
        const cachekey =  `provider-appointments:${provider_id}: ${year}-${month}-${day})`;
       let appointments = await this.cacheProvider.recover<Appointment[]>(
           cachekey
       );
       if(!appointments){
        appointments  = await this.apponitmentsRepository.findAllInDayFromProvider({
            provider_id,
            year,
            month,
            day,
        });

        await this.cacheProvider.save(cachekey, appointments)}
   return appointments;
    }
}
export default ListProviderAppointmentService;
