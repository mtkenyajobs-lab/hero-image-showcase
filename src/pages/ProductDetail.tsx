import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, MessageCircle, FileText, ChevronRight, Truck, Shield, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductBySlug, getRelatedProducts, type Product } from "@/data/products";

const ProductDetail = () => {
  const { slug } = useParams<{ category: string; slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [selectedImage, setSelectedImage] = useState(0);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    if (!product) return;
    const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]") as string[];
    const updated = [product.slug, ...stored.filter((s) => s !== product.slug)].slice(0, 6);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
  }, [product]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]") as string[];
    const items = stored
      .filter((s) => s !== slug)
      .map((s) => getProductBySlug(s))
      .filter(Boolean) as Product[];
    setRecentlyViewed(items.slice(0, 4));
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Link to="/" className="text-primary underline">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.slug);
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in the ${product.name} (${product.price}). Could you share more details?`);
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-28 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-foreground transition-colors">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="bg-muted rounded-2xl overflow-hidden aspect-square flex items-center justify-center relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <span className="text-6xl font-display font-bold text-foreground rotate-[-30deg]">REGAL</span>
              </div>
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-star text-star" : "text-border"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.rating})</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.desc}</p>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">{product.price}</span>
              <span className="text-lg text-muted-foreground line-through">{product.oldPrice}</span>
              <span className="bg-sale/10 text-sale text-sm font-semibold px-2 py-0.5 rounded">{product.discount}</span>
            </div>

            {/* Specifications */}
            <div className="border border-border rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Specifications</h3>
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0">
                  <span className="text-muted-foreground capitalize">{key}</span>
                  <span className="font-medium text-right max-w-[60%]">{value}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </button>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to={`/request-a-quote?product=${encodeURIComponent(product.name)}`}
                  className="border-2 border-primary text-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Request Quote
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-green-600 text-green-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-50 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Bulk prompt */}
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm">Need 10+ units?</p>
                <p className="text-xs text-muted-foreground">Get special bulk pricing for offices, hotels, and large projects. <Link to="/request-a-quote" className="text-primary underline">Request a bulk quote</Link></p>
              </div>
            </div>

            {/* Delivery info */}
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
              <Truck className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm">Delivery Information</p>
                <p className="text-xs text-muted-foreground">{product.delivery}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
              <Shield className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm">Warranty</p>
                <p className="text-xs text-muted-foreground">{product.specs.warranty} manufacturer warranty included</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/shop/${p.categorySlug}/${p.slug}`}
                  className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group"
                >
                  <div className="bg-muted aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-semibold text-sm">{p.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">{p.price}</span>
                      <span className="text-xs text-muted-foreground line-through">{p.oldPrice}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {recentlyViewed.map((p) => (
                <Link
                  key={p.slug}
                  to={`/shop/${p.categorySlug}/${p.slug}`}
                  className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group"
                >
                  <div className="bg-muted aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-semibold text-sm">{p.name}</h3>
                    <span className="font-bold text-primary text-sm">{p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
