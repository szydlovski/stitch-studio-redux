import { ProductAttributesSchema } from '@domain/product/types';
import { UpdateProductAttributesQuery } from '@infrastructure/product/UpdateProductAttributesQuery';
import { routeHandlerFactory } from '@lib/api/routeHandlerFactory';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

const getZodErrorDescription = <T>(error: ZodError<T>) => {
	const issue = error.issues[0];
	const numberOfIssues = error.issues.length;
	const path = issue.path.join('.');
	const message = issue.message;
	switch (issue.code) {
		case 'invalid_type':
			return `${message} at root.${path} - expected ${issue.expected} but received ${issue.received}`;
		case 'custom':
			return `${message} at root.${path}`;
		default:
			console.warn(
				`Unhandled Zod issue code: ${issue.code}, a default message will be used`
			);
			return `${message} at root.${path} - ${issue.message}`;
	}
};

export const PATCH = routeHandlerFactory<{ productId: string }>(
	async ({ req, xata, params: { productId } }) => {
		const attributes = await req.json();
		const x = ProductAttributesSchema.safeParse(attributes);
		if (!x.success) {
			const issue = x.error.issues.shift()!;
			return NextResponse.json(
				{
					error: true,
					message: `${issue.message} at root.${issue.path.join(
						'.'
					)} - expected ${(issue as any).expected} but received ${
						(issue as any).received
					}`,
					issue,
				},
				{ status: 400 }
			);
		}
		const result = await new UpdateProductAttributesQuery(xata).execute(
			productId,
			attributes
		);
		if (!result)
			return NextResponse.json(
				{ error: true, message: 'Failed to update attributes' },
				{ status: 404 }
			);
		return NextResponse.json(result);
	},
	{
		auth: true,
	}
);
