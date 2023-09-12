export interface Repository<T> {
    findAll() : T[] | undefined;
    findOne(item: {id: number}) : T | undefined;
    remove(item: {id: number}) : T | undefined;
    update(item: T) : T | undefined;
    add(item : T) : T | undefined;
}