import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    date: Date;
    user_id: string;
}
@injectable()
class CreateAppointmentService{
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        ){}
    public async execute({
        date,
        provider_id,
        user_id

    }: IRequest): Promise<Appointment>{
     const appointmentDate = startOfHour(date);

     if (isBefore(appointmentDate, Date.now())){
         throw new AppError('You cant create an appointment');
     }
      if(user_id == provider_id){
          throw new AppError ("You can't create appointment with yourself" )
      }

      if(getHours(appointmentDate)< 8 || getHours(appointmentDate) > 17){
          throw new AppError('You can only create appointement betwen 8am an 5pm');
      }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
       appointmentDate,
       provider_id,
    );

        if (findAppointmentInSameDate){
           throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });
        return appointment;
    }
}
export default CreateAppointmentService;
