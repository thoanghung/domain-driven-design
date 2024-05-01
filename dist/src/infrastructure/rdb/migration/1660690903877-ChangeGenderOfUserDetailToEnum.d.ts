import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ChangeGenderOfUserDetailToEnum1660690903877 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
