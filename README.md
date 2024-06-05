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

The primaryStitch Studio workflow goes like this:

- "Create Product" - user uploads a PNG pixel art design, it is parsed and saved to the database
- "Apply Palette" - colors of the design are matched with colors from an embroidery floss manufacturer, user may optionally make manual changes
- "Generate Product File" - user customizes settings and generates a printable PDF
- "Generate Product Images" - user customizes and generates promotional images
- "Publish to Etsy" - user publishs product listing on Etsy via API

In addition to that core, the app needs a way to manage products in bulk (listing, filtering, browsing, bulk operations), and to organize products into brands with their own Etsy accounts and file/image templates. Users own brands, and owners can give other users access to their brands.

In the future, Stitch Studio is intended to expand in multiple directions:
- Marketing automation (Pinterest)
- New product types (i.e. seamless patterns)
- New commerce integrations (Shopify?)

## Architecture

Stitch Studio is a Next.js 14 app.

On the frontend, it uses `shadcn/ui` components and Tailwind for custom styling. State management is handled via Context API and reducers.

On the backend, the API is built using the `app` router and route handlers. It uses [Xata](https://xata.io) as a database.

The code structure is inspired by DDD principles.