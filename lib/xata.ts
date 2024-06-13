// Generated by Xata Codegen 0.29.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "product",
    columns: [
      { name: "title", type: "text", notNull: true, defaultValue: "Untitled" },
      { name: "author", type: "link", link: { table: "user" } },
      { name: "brand", type: "link", link: { table: "brand" } },
      { name: "thumbnail", type: "file" },
      { name: "data", type: "json", notNull: true, defaultValue: "{}" },
      { name: "deleted", type: "bool", notNull: true, defaultValue: "false" },
      { name: "attributes", type: "json", notNull: true, defaultValue: "{}" },
      { name: "type", type: "string", notNull: true, defaultValue: "unknown" },
    ],
    revLinks: [
      { column: "product", table: "productImage" },
      { column: "product", table: "productFile" },
      { column: "product", table: "etsyListing" },
    ],
  },
  {
    name: "user",
    columns: [
      { name: "email", type: "email", unique: true },
      { name: "name", type: "string", defaultValue: "" },
    ],
    revLinks: [
      { column: "author", table: "product" },
      { column: "owner", table: "brand" },
      { column: "user", table: "event" },
    ],
  },
  {
    name: "brand",
    columns: [
      { name: "name", type: "string", unique: true },
      { name: "logo", type: "file" },
      { name: "owner", type: "link", link: { table: "user" } },
    ],
    revLinks: [
      { column: "brand", table: "product" },
      { column: "brand", table: "etsyListing" },
    ],
  },
  {
    name: "productImage",
    columns: [
      { name: "image", type: "file" },
      { name: "product", type: "link", link: { table: "product" } },
      { name: "attributes", type: "json", notNull: true, defaultValue: "{}" },
      { name: "tags", type: "multiple" },
    ],
  },
  {
    name: "crossStitchPalette",
    columns: [
      { name: "colors", type: "json", notNull: true, defaultValue: "[]" },
      { name: "name", type: "string", notNull: true, defaultValue: "" },
    ],
  },
  {
    name: "productFile",
    columns: [
      { name: "product", type: "link", link: { table: "product" } },
      { name: "file", type: "file" },
      { name: "tags", type: "multiple" },
    ],
  },
  {
    name: "etsyListing",
    columns: [
      { name: "title", type: "string", notNull: true, defaultValue: "" },
      { name: "data", type: "json", notNull: true, defaultValue: "{}" },
      { name: "brand", type: "link", link: { table: "brand" } },
      { name: "product", type: "link", link: { table: "product" } },
    ],
  },
  {
    name: "event",
    columns: [
      { name: "table", type: "string", notNull: true, defaultValue: "unknown" },
      { name: "type", type: "string", notNull: true, defaultValue: "" },
      { name: "user", type: "link", link: { table: "user" } },
      { name: "payload", type: "json", notNull: true, defaultValue: "{}" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Product = InferredTypes["product"];
export type ProductRecord = Product & XataRecord;

export type User = InferredTypes["user"];
export type UserRecord = User & XataRecord;

export type Brand = InferredTypes["brand"];
export type BrandRecord = Brand & XataRecord;

export type ProductImage = InferredTypes["productImage"];
export type ProductImageRecord = ProductImage & XataRecord;

export type CrossStitchPalette = InferredTypes["crossStitchPalette"];
export type CrossStitchPaletteRecord = CrossStitchPalette & XataRecord;

export type ProductFile = InferredTypes["productFile"];
export type ProductFileRecord = ProductFile & XataRecord;

export type EtsyListing = InferredTypes["etsyListing"];
export type EtsyListingRecord = EtsyListing & XataRecord;

export type Event = InferredTypes["event"];
export type EventRecord = Event & XataRecord;

export type DatabaseSchema = {
  product: ProductRecord;
  user: UserRecord;
  brand: BrandRecord;
  productImage: ProductImageRecord;
  crossStitchPalette: CrossStitchPaletteRecord;
  productFile: ProductFileRecord;
  etsyListing: EtsyListingRecord;
  event: EventRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://szydlovski-corp-bg81vi.eu-central-1.xata.sh/db/stitch-studio-redux",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
