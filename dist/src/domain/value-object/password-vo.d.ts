import { ValueObject } from './base';
import { z } from 'zod';
declare const passwordSchema: z.ZodString;
type PasswordType = z.infer<typeof passwordSchema>;
export declare class PasswordVO extends ValueObject {
    value: string;
    constructor(input: PasswordType);
    toString(): string;
}
export {};
