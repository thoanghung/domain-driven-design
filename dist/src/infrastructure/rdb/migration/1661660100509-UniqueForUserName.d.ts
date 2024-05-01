import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UniqueForUserName1661660100509 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
