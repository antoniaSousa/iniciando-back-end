import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
class Users {

    @PrimaryGeneratedColumn('uuid')
    id: String;
    @Column()
    name: String;

    @Column()
    email: String;

    @Column()
    password: String;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
export default Users;
