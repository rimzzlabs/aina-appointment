"use client";

import { columnHelper } from "@/lib/column-helper";
import { formatDate, formatPrice } from "@/lib/utils";
import { ProductListColumnAction } from "./product-list-column-action";
import { match } from "ts-pattern";

let ch = columnHelper<Product>();

export function getProductListColumn(role: Role) {
  return match(role)
    .with("admin", () => [
      ch.renderNumericColumn(),
      ch.renderSimpleColumn("Nama Produk")("name"),
      ch.renderColumn("Harga produk")("price", (p) => formatPrice(p.price)),
      ch.renderSimpleColumn("Deskripsi Produk")("description"),

      ch.renderColumn("Terakhir diperbarui")(
        "updatedAt",
        (p) => formatDate(p.updatedAt) + " WIB"
      ),
      ch.renderColumn("Dibuat pada")(
        "createdAt",
        (p) => formatDate(p.createdAt) + " WIB"
      ),
      ch.renderAction((d) => <ProductListColumnAction {...d} key={d.id} />),
    ])
    .otherwise(() => [
      ch.renderNumericColumn(),
      ch.renderSimpleColumn("Nama Produk")("name"),
      ch.renderColumn("Harga produk")("price", (p) => formatPrice(p.price)),
      ch.renderSimpleColumn("Deskripsi Produk")("description"),

      ch.renderColumn("Terakhir diperbarui")(
        "updatedAt",
        (p) => formatDate(p.updatedAt) + " WIB"
      ),
    ]);
}
