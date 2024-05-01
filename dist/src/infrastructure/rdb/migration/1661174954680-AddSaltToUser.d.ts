import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddSaltToUser1661174954680 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
