import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import {
  fetchAdminProducts,
  fetchCategories,
  slugify,
  type AdminProduct,
  type DbCategory,
} from "@/lib/adminCatalog";

const ProductsSection = () => {
  const [dbCategories, setDbCategories] = useState<DbCategory[]>([]);
  const [adminProducts, setAdminProducts] = useState<AdminProduct[]>([]);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories().then(setDbCategories);
    fetchAdminProducts().then(setAdminProducts);
  }, []);

  const tabs = useMemo(
    () => [{ label: "All", slug: null as string | null }, ...dbCategories.map((c) => ({ label: c.name, slug: c.slug }))],
    [dbCategories],
  );

  const visibleStatic = useMemo(() => {
    if (!activeSlug) return products;
    return products.filter((p) => p.categorySlug === activeSlug);
  }, [activeSlug]);

  const visibleAdmin = useMemo(() => {
    if (!activeSlug) return adminProducts;
    return adminProducts.filter((p) => slugify(p.category) === activeSlug);
  }, [activeSlug, adminProducts]);

  const total = visibleStatic.length + visibleAdmin.length;

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Best Selling Product</h2>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveSlug(tab.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSlug === tab.slug
                  ? "bg-foreground text-background"
                  : "border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10 hover:opacity-80 transition-opacity hidden md:flex">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10 hover:opacity-80 transition-opacity hidden md:flex">
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {total === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-10">
                No products in this category yet.
              </p>
            )}

            {visibleAdmin.map((p) => (
              <Link
                key={p.id}
                to={`/shop/${slugify(p.category)}/admin-${p.id}`}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group"
              >
                <div className="bg-muted flex items-center justify-center aspect-square overflow-hidden">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">No image</span>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm">{p.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">${Number(p.price).toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase">{p.category}</p>
                </div>
              </Link>
            ))}

            {visibleStatic.map((product) => (
              <Link
                key={product.slug}
                to={`/shop/${product.categorySlug}/${product.slug}`}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group"
              >
                <div className="bg-muted flex items-center justify-center aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{product.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{product.price}</span>
                    <span className="text-xs text-muted-foreground line-through">{product.oldPrice}</span>
                    <span className="text-xs text-muted-foreground">({product.discount})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-star text-star" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                  <p className={`text-[10px] ${product.badgeUrgent ? "text-sale font-semibold" : "text-muted-foreground"}`}>
                    {product.badge}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            View all collections
            <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center">
              <ArrowRight className="w-3 h-3" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
