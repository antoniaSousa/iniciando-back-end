import { injectable, inject } from 'tsyringe';
import IAppoitmentsRepository from '../repositories/IAppointmentsRepository';
import {getDaysInMonth, getDate} from 'date-fns'


interface IRequest {
   provider_id: string;
   month: number;
   year: number;
}

type IResponse = Array <{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService{
    constructor(
        @inject ('ApponitmentsRepository')
        private apponitmentsRepository: IAppoitmentsRepository

        ){}

    public async execute({ provider_id, year, month }: IRequest): Promise<IResponse>{

        const appointments =  await this.apponitmentsRepository.findAllInMonthFromProvider({
            provider_id,
            year,
            month,
        })
        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month -1 ));

        const eachDayArray = Array.from(
            { length: numberOfDaysInMonth},
            (_, index) => index + 1
        );
       const  availability = eachDayArray.map(day =>
           {
               const appointmentInDay = appointments.filter(appointment =>{
                   return getDate(appointment.date) === day;
               });

           return {
               day,
               available: appointmentInDay.length < 10,
           };
        });
        return availability;

    }
}
export default ListProviderMonthAvailabilityService;
