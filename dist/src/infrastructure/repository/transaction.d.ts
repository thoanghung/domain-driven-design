import { EntityManager } from 'typeorm';
import ITransactionManager from '@domain/repository/transaction';
export type Transaction = EntityManager;
export default class TransactionManager implements ITransactionManager {
    transaction(callback: (t: Transaction) => Promise<FixType>): Promise<FixType>;
}
