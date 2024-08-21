export class ProductImageTagNotFoundError extends Error {
    constructor(id: string, tag: string) {
        super(`Tag ${tag} not found for product image ${id}`);
    }
}