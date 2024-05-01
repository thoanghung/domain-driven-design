import { ClassConstructor } from '@nestjs/class-transformer';
export default class BaseViewFactory {
    protected createEntity<E, P>(entity: ClassConstructor<E>, plain: P): E;
    protected createEntityArray<E, P>(entity: ClassConstructor<E>, plains: P[]): E[];
}
