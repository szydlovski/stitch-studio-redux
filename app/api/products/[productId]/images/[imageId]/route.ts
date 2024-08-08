import {NextResponse} from 'next/server';
import {DeleteProductImageCommand} from "@infrastructure/product-image/DeleteProductImageCommand";
import {ProductImageNotFoundError} from "@infrastructure/product-image/ProductImageNotFoundError";
import {routeHandler} from "@lib/api/routeHandler";

export const DELETE = routeHandler<{ productId: string, imageId: string }>(
    async ({xata, params: {imageId}}) => {
        try {
            const result = await new DeleteProductImageCommand(xata).execute(imageId);
            if (!result)
                return NextResponse.json(
                    {error: true, message: 'Failed to delete product image'},
                    {status: 404}
                );
            return NextResponse.json(result);
        } catch (e) {
            if (e instanceof ProductImageNotFoundError) {
                return NextResponse.json(
                    {error: true, message: 'Product image not found'},
                    {status: 404}
                );
            }
        }

    },
    {
        auth: true,
    }
);
