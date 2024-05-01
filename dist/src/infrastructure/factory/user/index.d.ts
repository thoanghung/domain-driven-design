import { UserEntity } from '@domain/entity/user';
import { EmailVO } from '@domain/value-object/email-vo';
import { PasswordVO } from '@domain/value-object/password-vo';
import { BaseFactory } from '@infrastructure/factory/base';
import User from '@infrastructure/rdb/entity/user';
export declare class UserFactory extends BaseFactory {
    createUserEntity(user: User | null): UserEntity;
    createUserEntities(users: User[] | null): UserEntity[];
    createFromEmailAndPassword(emailVO: EmailVO, passwordVO: PasswordVO): UserEntity;
}
