import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
export default class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    tableName(targetName: string, userSpecifiedName: string): string;
    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string;
    joinColumnName(relationName: string, referencedColumnName: string): string;
    joinTableName(firstTableName: string, secondTableName: string, firstPropertyName: string, secondPropertyName: string): string;
    joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string;
}
