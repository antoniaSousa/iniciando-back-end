import { EntityRepository, Repository, Entity } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository <Appointment>{
    public  async findByDate(date) : Promise<Appointment | null>{
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || null;
    }

    }
export default AppointmentsRepository;
