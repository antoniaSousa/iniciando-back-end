import { injectable, inject } from 'tsyringe';
import IAppoitmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';


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
        private apponitmentsRepository: IAppoitmentsRepository

        ){}

    public async execute({ provider_id, day, year, month }: IRequest): Promise<Appointment[]>{
        const appointments  = await this.apponitmentsRepository.findAllInDayFromProvider({
            provider_id,
            year,
            month,
            day,
        });
return appointments;
    }
}
export default ListProviderAppointmentService;
