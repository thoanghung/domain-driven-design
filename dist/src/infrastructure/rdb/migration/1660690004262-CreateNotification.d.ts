import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateNotification1660690004262 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
