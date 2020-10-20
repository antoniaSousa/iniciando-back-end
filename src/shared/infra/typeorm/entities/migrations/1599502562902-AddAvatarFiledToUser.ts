import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddAvatarFiledToUser1599502562902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner .dropColumn('users','avatar');
    }

}
