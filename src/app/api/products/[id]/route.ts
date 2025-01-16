import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

// Interface for a product
interface Product {
  id: number; // Unique ID for the product
  name: string;
  category: string;
  price: number;
  slug: string;
  images: string;
  productDescription: string;
  originalPrice: number;
  stock: number;
  rating: {
    rate: string;
    count: number;
  };
  tags: string[];
  dimensions: {
    height: string;
    width: string;
    depth: string;
  };
  discount: number;
}

// Function to fetch raw products from Sanity
async function fetchRawProducts(): Promise<any[]> {
  return client.fetch(`*[_type == "products"]{
    name,
    category,
    price,
    "slug": slug.current,
    "images": image.asset->url,
    productDescription
  }`);
}

// Function to enhance raw products with additional fields
function enhanceProducts(rawProducts: any[]): Product[] {
  const availableTags = ["New", "Sale", "Featured", "Popular", "Limited", "Discount", "Best Seller"];
  const availableDiscounts = [20, 10, 5, 15];

  return rawProducts.map((product, index) => {
    const stock = Math.floor(Math.random() * (30 - 10 + 1)) + 10; // Random stock between 10 and 30
    const rating = {
      rate: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
      count: Math.floor(Math.random() * 500) + 50, // Random count between 50 and 500
    };

    const tags: string[] = [];
    const numTags = Math.floor(Math.random() * 2) + 2; // Random number of tags (2 to 3)
    while (tags.length < numTags) {
      const tag = availableTags[Math.floor(Math.random() * availableTags.length)];
      if (!tags.includes(tag)) tags.push(tag);
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

// GET handler for API
export async function GET(
  req: Request,
  { params }: { params: { id?: string } }
) {
  try {
    const rawProducts = await fetchRawProducts();
    const products = enhanceProducts(rawProducts);

    if (params.id) {
      const productId = parseInt(params.id);

      if (isNaN(productId)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
      }

      const product = products.find((p) => p.id === productId);

      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      return NextResponse.json(product);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
