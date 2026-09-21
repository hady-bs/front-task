import { Product } from "@/app/_models/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
type PageProps = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (response.status == 404) redirect("/");
  if (!response.ok) throw new Error("check your connection");

  return response.json();
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(Number(id));

  return {
    title: product.title,
    description: product.description,
    keywords: [product.title, product.category, "online store", "product"],
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(Number(id));

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back */}
        <Link
          href="/products"
          className="mb-8 inline-block text-sm text-gray-600 transition hover:text-black"
        >
          ← Back to products
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <div className="relative aspect-square w-full max-w-md">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full bg-black px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold leading-tight text-black md:text-4xl">
              {product.title}
            </h1>

            <StarRating
              rate={product.rating.rate}
              count={product.rating.count}
            />

            <div className="h-px bg-gray-200" />

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-black">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">incl. tax</span>
            </div>

            <div>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Description
              </h2>
              <p className="leading-relaxed text-gray-700">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
function StarRating({ rate, count }: { rate: number; count: number }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium text-black">{rate.toFixed(1)}</span>
      {Array.from({ length: 5 }).map((item, index) => {
        const ratingValue: number = Number(rate.toFixed());
        if (index + 1 <= ratingValue) {
          return (
            <span className={"text-black"} key={index}>
              ★
            </span>
          );
        } else
          return (
            <span className="text-gray-400" key={index}>
              ★
            </span>
          );
      })}

      <span className="text-gray-500">({count} reviews)</span>
    </div>
  );
}
