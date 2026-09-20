import Image from "next/image";
import Link from "next/link";
import { Product } from "../_models/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative block w-full rounded border-2 transition hover:border-black focus:outline-none focus:ring-2 focus:ring-black"
    >
      {/* Image */}
      <div className="relative aspect-square w-full">
        <Image
          src={product.image}
          fill
          alt={product.title}
          className="object-contain transition group-hover:scale-105"
          loading="lazy"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      {/* Title */}
      <div className="line-clamp-2 px-3 pb-3 pt-2 text-xl">{product.title}</div>

      {/* Price badge */}
      <div className="absolute right-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
        {product.price.toFixed()}$
      </div>
    </Link>
  );
}
