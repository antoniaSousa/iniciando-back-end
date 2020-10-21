import { EntityRepository, Repository, Entity } from 'typeorm';
import IAppontmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment;

class AppointmentsRepository extends Repository <Appointment>{
    public  async findByDate(date: Date): Promise<Appointment | undefined>{
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || null;
    }

    }
export default AppointmentsRepository;
