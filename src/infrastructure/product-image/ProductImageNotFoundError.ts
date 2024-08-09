export class ProductImageNotFoundError extends Error {
    constructor() {
        super('Product image not found');
    }
}