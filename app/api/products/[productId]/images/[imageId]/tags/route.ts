import {NextResponse} from 'next/server';
import {ProductImageNotFoundError} from "@infrastructure/product-image/ProductImageNotFoundError";
import {routeHandlerFactory} from "@lib/api/routeHandlerFactory";
import {z} from "zod";
import {DeleteProductImageTagCommand} from "@infrastructure/product-image/tags/DeleteProductImageTagCommand";
import {AddProductImageTagCommand} from "@infrastructure/product-image/tags/AddProductImageTagCommand";
import {ProductImageTagAlreadyExistsError} from "@infrastructure/product-image/tags/ProductImageTagAlreadyExistsError";
import {ProductImageTagNotFoundError} from "@infrastructure/product-image/tags/ProductImageTagNotFoundError";
import {ValidationErrorResponse} from "@lib/api/ValidationErrorResponse";

type TagsParams = { productId: string, imageId: string };

const AddProductImageTagSchema = z
    .object({
        tag: z.string().min(3).max(50),
    })
    .strict();

const DeleteProductImageTagSchema = z
    .object({
        tag: z.string().min(3).max(50),
    })
    .strict();

export const PUT = routeHandlerFactory<TagsParams>(
    async ({req, xata, params: {imageId}}) => {
        const parsedBody = await req.json();
        const {success, error, data} = AddProductImageTagSchema.safeParse(parsedBody);
        if (!success) return ValidationErrorResponse.json(error);

        const {tag} = data;

        try {
            const result = await new AddProductImageTagCommand(xata).execute(imageId, tag);
            if (!result)
                return NextResponse.json(
                    {error: true, message: 'Failed to delete product image'},
                    {status: 400}
                );
            return NextResponse.json(result);
        } catch (e) {
            if (e instanceof ProductImageNotFoundError) {
                return NextResponse.json(
                    {error: true, message: 'Product image not found'},
                    {status: 404}
                );
            }
            if (e instanceof ProductImageTagAlreadyExistsError) {
                return NextResponse.json(
                    {error: true, message: e.message},
                    {status: 400}
                );
            }
        }
    },
    {
        auth: true,
    }
);

export const DELETE = routeHandlerFactory<TagsParams>(
    async ({req, xata, params: {imageId}}) => {
        const queryParams = Object.fromEntries(Array.from(new URLSearchParams(req.url.split('?')[1]).entries()));
        const {success, error, data} = DeleteProductImageTagSchema.safeParse(queryParams);

        if (!success) return ValidationErrorResponse.json(error);

        const {tag} = data;

        try {
            const result = await new DeleteProductImageTagCommand(xata).execute(imageId, tag);
            if (!result)
                return NextResponse.json(
                    {error: true, message: 'Failed to delete product image'},
                    {status: 404}
                );
            return NextResponse.json(result);
        } catch (e) {
            if (e instanceof ProductImageNotFoundError) {
                return NextResponse.json(
                    {error: true, message: e.message},
                    {status: 404}
                );
            }

            if (e instanceof ProductImageTagNotFoundError) {
                return NextResponse.json(
                    {error: true, message: e.message},
                    {status: 400}
                );
            }
        }

    },
    {
        auth: true,
    }
);
