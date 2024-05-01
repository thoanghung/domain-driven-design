"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pluralize = require("pluralize");
const typeorm_1 = require("typeorm");
const StringUtils_1 = require("typeorm/util/StringUtils");
class CustomNamingStrategy extends typeorm_1.DefaultNamingStrategy {
    tableName(targetName, userSpecifiedName) {
        return userSpecifiedName
            ? userSpecifiedName
            : pluralize.plural((0, StringUtils_1.snakeCase)(targetName));
    }
    columnName(propertyName, customName, embeddedPrefixes) {
        return customName ? customName : (0, StringUtils_1.snakeCase)(propertyName);
    }
    joinColumnName(relationName, referencedColumnName) {
        return (0, StringUtils_1.snakeCase)(pluralize.singular(relationName) + '_' + referencedColumnName);
    }
    joinTableName(firstTableName, secondTableName, firstPropertyName, secondPropertyName) {
        return (0, StringUtils_1.snakeCase)(firstTableName + '_' + secondTableName);
    }
    joinTableColumnName(tableName, propertyName, columnName) {
        return (0, StringUtils_1.snakeCase)(pluralize.singular(tableName) + '_' + (columnName || propertyName));
    }
}
exports.default = CustomNamingStrategy;
//# sourceMappingURL=typeorm-custom-name-strategy.js.map