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
    ],
  },
  {
    name: "brand",
    columns: [
      { name: "name", type: "string", unique: true },
      { name: "logo", type: "file" },
      { name: "owner", type: "link", link: { table: "user" } },
    ],
    revLinks: [{ column: "brand", table: "product" }],
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

export type DatabaseSchema = {
  product: ProductRecord;
  user: UserRecord;
  brand: BrandRecord;
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