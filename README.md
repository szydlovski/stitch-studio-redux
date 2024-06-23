# Stitch Studio

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start making changes. The app auto-updates as you edit the file.

## Business background

The purpose of Stitch Studio is to automate all the mundane tasks involved in selling digital cross stitch patterns, such as creating printable PDFs, designing promotional images and publishing listings for sale.

The primary Stitch Studio workflow goes like this:

- "Create Product" - user uploads a PNG pixel art design, it is parsed and saved to the database
- "Apply Palette" - colors of the design are matched with colors from an embroidery floss manufacturer, user may optionally make manual changes
- "Generate Product File" - user customizes settings and generates a printable PDF
- "Generate Product Images" - user customizes and generates promotional images
- "Publish to Etsy" - user publishs product listing on Etsy via API

In addition to that core, the app needs a way to manage products in bulk (listing, filtering, browsing, bulk operations), and to organize products into brands with their own Etsy accounts and file/image templates. Users own brands, and owners can give other users access to their brands.

In the prototype phase, Stitch Studio will use a global brand - our existing shop, StitchFairyCo. Full support for multiple brands is complex, as product files and images need to be deeply customized as well.

In the future, Stitch Studio is intended to expand in multiple directions:

- Marketing automation (Pinterest)
- New product types (i.e. seamless patterns)
- New commerce integrations (Shopify?)

## Architecture

Stitch Studio is a Next.js 14 app.

On the frontend, it uses `shadcn/ui` components and Tailwind for custom styling. State management is handled via Context API and reducers.

On the backend, the API is built using the `app` router and route handlers. It uses [Xata](https://xata.io) as a database.

The code is structured in layers. Here's a brief overview of the top level directories:
- `app` - Next.js app router
- `src` - core app source
  - `presentation` - ui & views
  - `application` - connect ui to infra
  - `domain` - define models
  - `infrastructure` - facilitate backend operations
- `lib` - low level utilities
- `brand` - custom templates for brands

# How-to's

## Adding a new API action

Adding a new API action consists of four steps:

1. Define domain models
2. Implement infrastructure query/command
3. Implement API route
4. Exposing application function and hook

Let's say I wanted to add reactions to products. I would start by defining the DTO:

```ts
// src/domain/product/Reaction.ts
export interface AddReactionDto {
	// ...
}

export interface AddReactionResult {
	// ...
}
```

Then I would implement the command:

```ts
// src/infrastructure/product/AddReactionToProductCommand.ts
export class AddReactionToProductCommand extends XataQuery<AddReactionResult> {
	execute(productId: string, body: AddReactionDto): Promise<AddReactionResult> {
		// ...
	}
}
```

Then the route handler:

```ts
// app/api/products/[productId]/reactions/route.ts
export const PUT = routeHandler<{ productId: string }>(
	async ({ params: { productId }, req }) => {
		const body = await req.json();
		const result = await new AddReactionToProductCommand().execute(
			productId,
			body
		);
		return NextResponse.json(result);
	},
	{
		auth: true,
	}
);
```

And finally, the application layer function and hook

```ts
// src/application/product/addReaction.ts
export const addReaction = (
	productId: string,
	body: AddReactionDto
): Promise<AddReactionResult> => {
	return fetch(`/api/products/${productId}/reactions`, {
		method: 'PUT',
	}).then((res) => res.json());
};

export const useAddReaction = () => useMutation({ mutationFn: addReaction });
```

## Installing new components with `shadcn/ui`

You can install new `shadcn/ui` components [using the CLI](https://ui.shadcn.com/docs/cli):
```bash
npx shadcn-ui@latest add [component]
```
For example:
```bash
npx shadcn-ui@latest add tabs
```