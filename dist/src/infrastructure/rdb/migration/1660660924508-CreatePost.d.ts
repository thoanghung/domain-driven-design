import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreatePost1660660924508 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
