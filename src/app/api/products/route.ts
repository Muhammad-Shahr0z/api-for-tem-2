import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

// Define the interface for a product
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  slug: string;
  images: string;
  productDescription: string;
  stock?: number;
  rating?: {
    rate: string;
    count: number;
  };
  tags?: string[];
  dimensions?: {
    height: string;
    width: string;
    depth: string;
  };
  discount?: number;
}

// Function to fetch all products with additional data
async function fetchProducts(): Promise<Product[]> {
  const Products: Product[] = await client.fetch(`*[_type == "products"]{
    name,
    category,
    price,
    "slug": slug.current,
    "images": image.asset->url,
    productDescription
  }`);

  const availableTags = ["New", "Sale", "Featured", "Popular", "Limited", "Discount", "Best Seller"];
  const availableDiscounts = [20, 10, 5, 15];

  return Products.map((product, index) => {
    const stock = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
    const rating = {
      rate: (Math.random() * 2 + 3).toFixed(1),
      count: Math.floor(Math.random() * 500) + 50,
    };

    const tags: string[] = [];
    const numTags = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < numTags; i++) {
      const randomTag = availableTags[Math.floor(Math.random() * availableTags.length)];
      if (!tags.includes(randomTag)) {
        tags.push(randomTag);
      }
    }

    const dimensions = {
      height: (Math.random() * (150 - 50) + 50).toFixed(2),
      width: (Math.random() * (100 - 40) + 40).toFixed(2),
      depth: (Math.random() * (80 - 30) + 30).toFixed(2),
    };

    const discount = availableDiscounts[Math.floor(Math.random() * availableDiscounts.length)];

    return {
      ...product,
      id: index + 1,
      originalPrice: product.price,
      stock,
      rating,
      tags,
      dimensions,
      discount,
    };
  });
}

export async function GET() {
  const products = await fetchProducts();
  return NextResponse.json(products);
}
