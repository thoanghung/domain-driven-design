import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ChangePostImagesAndTagsDataType1672801262874 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
