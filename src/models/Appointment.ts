import { uuid } from "uuidv4";
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('appointments')
class Appointment {

    @PrimaryColumn('uuid')
    id: String;
    @Column()
    provider: String;
    @Column('timestemp with time zone')
    date: Date;

    }
}
export default Appointment;
