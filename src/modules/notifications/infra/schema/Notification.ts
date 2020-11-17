import {ObjectID, Entity, Column, ObjectIdColumn,
     CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('notification')
class Notification {
    @ObjectIdColumn()
    id: ObjectID;
    @Column()
    content: string;

    @Column('uuid')
    recipient_id: string;

    @Column({default: false})
    read: boolean;

    @CreateDateColumn()
    created_at: Date;

   @UpdateDateColumn()
    update_at: Date;
}

export default Notification;

