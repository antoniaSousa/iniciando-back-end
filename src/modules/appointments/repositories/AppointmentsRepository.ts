import { EntityRepository, Repository, Entity } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository extends Repository <Appointment>{
    public  async findByDate(date: Date): Promise<Appointment | undefined>{
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || undefined;
    }

    }
export default AppointmentsRepository;
