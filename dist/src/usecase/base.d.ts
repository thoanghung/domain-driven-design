export declare abstract class UsecaseInput {
}
export declare abstract class UsecaseOutput {
}
export declare abstract class Usecase<Input extends UsecaseInput, Output extends UsecaseOutput> {
    abstract execute(input: Input | Input[], options?: unknown): Output | Output[] | Promise<Output> | Promise<Output[]> | void | Promise<void>;
}
