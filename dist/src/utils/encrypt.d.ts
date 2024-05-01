import { z } from 'zod';
export type AuthenTokenParams = z.infer<typeof AuthenTokenParamsSchema>;
export declare const AuthenTokenParamsSchema: z.ZodObject<{
    userId: z.ZodNumber;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    userId?: number;
}, {
    email?: string;
    userId?: number;
}>;
export declare const hashString: (source: string) => string;
export declare const hashPassword: (barePassword: string, salt: string) => string;
export declare const randomlyGenerateSalt: () => string;
export declare const generateJWT: (userId: number, email: string) => string;
export declare const verifyJWT: (jwtToken: string) => [boolean, FixType, Error];
