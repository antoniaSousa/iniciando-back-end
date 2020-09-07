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

    @Column()
    avatar: String

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
export default Users;
