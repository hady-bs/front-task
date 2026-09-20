import Link from "next/link";
import ProductCard from "../_components/ProductCard";
import { Product } from "../_models/types";

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products", {
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  });
  return response.json();
}

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ page?: number }>;
}) {
  const products: Product[] = await getProducts();
  const { page } = await searchParams;
  console.log(page);
  const start = page == 2 ? products.length / 2 : 0;
  const end = page == 2 ? products.length : products.length / 2;

  return (
    <div className="container mx-auto">
      <div className="text-3xl py-10 text-center">products</div>
      <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:gap-10">
        {products.splice(start, end).map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
      <div className="flex gap-3 justify-center">
        <Link
          href={"/products?page=1"}
          className="w-fit px-3 py-2 bg-black text-white rounded "
        >
          1
        </Link>
        <Link
          href={"/products?page=2"}
          className="w-fit px-3 py-2 bg-black text-white rounded "
        >
          2
        </Link>
      </div>
    </div>
  );
}
