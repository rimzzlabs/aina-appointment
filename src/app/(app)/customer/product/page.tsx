import { Heading } from "@/components/ui/heading";
import { getProducts } from "@/database/query/product";
import { ProductList } from "@/features/product/list";
import { F, O, pipe } from "@mobily/ts-belt";
import { Fragment } from "react";

export default async function CustomerProductPage(props: PageProps) {
  let search = pipe(
    O.fromNullable(props.searchParams?.q),
    O.mapWithDefault("", F.identity)
  );
  let products = await getProducts(search);

  return (
    <Fragment>
      <nav className="flex items-center justify-between">
        <Heading>Daftar Produk Yang Tersedia</Heading>
      </nav>

      <ProductList products={products} />
    </Fragment>
  );
}
