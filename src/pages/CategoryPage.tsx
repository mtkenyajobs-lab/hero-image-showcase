import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getProductsByCategory,
  getCategoryBySlug,
  getAllMaterials,
  getAllColours,
  getPriceRange,
  categories,
} from "@/data/products";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "name";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const cat = getCategoryBySlug(category || "");
  const allProducts = getProductsByCategory(category || "");

  const materials = getAllMaterials();
  const colours = getAllColours();
  const [minPrice, maxPrice] = getPriceRange();

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [sort, setSort] = useState<SortOption>("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleFilter = (list: string[], item: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedMaterials.length > 0) {
      result = result.filter((p) => selectedMaterials.includes(p.material));
    }
    if (selectedColours.length > 0) {
      result = result.filter((p) => selectedColours.includes(p.colour));
    }
    result = result.filter((p) => p.priceNum >= priceRange[0] && p.priceNum <= priceRange[1]);

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.priceNum - b.priceNum);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceNum - a.priceNum);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [allProducts, selectedMaterials, selectedColours, priceRange, sort]);

  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedColours([]);
    setPriceRange([minPrice, maxPrice]);
  };

  const activeFilterCount =
    selectedMaterials.length +
    selectedColours.length +
    (priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-1">
          <ChevronDown className="w-4 h-4" /> Price Range
        </h4>
        <Slider
          min={minPrice}
          max={maxPrice}
          step={10}
          value={priceRange}
          onValueChange={(val) => setPriceRange(val as [number, number])}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-1">
          <ChevronDown className="w-4 h-4" /> Material
        </h4>
        <div className="space-y-2">
          {materials.map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={selectedMaterials.includes(m)}
                onCheckedChange={() => toggleFilter(selectedMaterials, m, setSelectedMaterials)}
              />
              {m}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-1">
          <ChevronDown className="w-4 h-4" /> Colour
        </h4>
        <div className="space-y-2">
          {colours.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={selectedColours.includes(c)}
                onCheckedChange={() => toggleFilter(selectedColours, c, setSelectedColours)}
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  );

  if (!cat) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{cat.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{cat.name}</h1>
            <p className="text-muted-foreground mt-1">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="md:hidden flex items-center gap-2"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>

            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name A–Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden md:block w-60 shrink-0">
            <div className="sticky top-20 border border-border rounded-xl p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </h3>
              <FilterPanel />
            </div>
          </aside>

          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileFiltersOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-background p-6 overflow-y-auto shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> Filters
                  </h3>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products match your filters.</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.slug}
                    to={`/shop/${product.categorySlug}/${product.slug}`}
                    className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group"
                  >
                    <div className="bg-muted flex items-center justify-center aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
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
            )}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">Browse Other Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((c) => c.slug !== category)
              .map((c) => (
                <Link
                  key={c.slug}
                  to={`/shop/${c.slug}`}
                  className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
