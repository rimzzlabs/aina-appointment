"use client";

import { DataTable } from "@/features/shared";
import { getProductListColumn } from "./product-list-column";
import { useSession } from "next-auth/react";

export function ProductList(props: { products: Array<Product> }) {
  let session = useSession({ required: true });

  if (!session.data?.user) return <p>Loading...</p>;

  return (
    <DataTable
      data={props.products}
      columns={getProductListColumn(session.data?.user?.role)}
    />
  );
}
