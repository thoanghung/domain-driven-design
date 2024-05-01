import { ValueObject } from './base';
import { z } from 'zod';
declare const mailSchema: z.ZodString;
type MailType = z.infer<typeof mailSchema>;
export declare class EmailVO extends ValueObject {
    value: string;
    constructor(input: MailType);
    toString(): string;
}
export {};
