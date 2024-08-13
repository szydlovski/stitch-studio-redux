export class ProductImageTagAlreadyExistsError extends Error {
    constructor(id: string, tag: string) {
        super(`Tag ${tag} already exists for product image ${id}`);
    }
}