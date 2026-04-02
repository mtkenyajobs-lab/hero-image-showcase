import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FileText, ChevronRight, Upload, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

const projectTypes = ["Office", "Home", "Hotel", "School", "Government", "Hospital", "Other"];
const budgetRanges = ["Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+"];
const timelineOptions = ["ASAP (1–2 weeks)", "Within 1 month", "1–3 months", "3–6 months", "Flexible"];

const RequestQuote = () => {
  const [searchParams] = useSearchParams();
  const prefilledProduct = searchParams.get("product") || "";
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    city: "",
    country: "",
    productsRequested: prefilledProduct,
    quantities: "1",
    customisation: "no",
    budgetRange: "",
    timeline: "",
    projectType: "",
    projectDescription: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files).slice(0, 5));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-28 pb-16 text-center max-w-lg mx-auto">
          <div className="bg-card border border-border rounded-2xl p-10 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            <h1 className="text-3xl font-bold">Quote Request Received!</h1>
            <p className="text-muted-foreground">Thank you for your request. Our team will review your requirements and get back to you within 24 hours via email or WhatsApp.</p>
            <Link to="/" className="inline-block mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-28 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">Request a Quote</span>
        </nav>

        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <FileText className="w-4 h-4" />
            B2B & Bulk Orders
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Request a Quote</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Whether you're furnishing an entire office, outfitting a hotel, or managing a government project — we offer competitive bulk pricing, customisation options, and dedicated project support. Fill out the form below and our team will respond within 24 hours.
          </p>
        </div>

        {/* Quote Form */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-10 space-y-8">
          {/* Contact */}
          <div>
            <h2 className="text-lg font-bold mb-4 border-b border-border pb-2">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name <span className="text-sale">*</span></label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">WhatsApp Number <span className="text-sale">*</span></label>
                <input
                  type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required
                  className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email Address <span className="text-sale">*</span></label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="john@company.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">City <span className="text-sale">*</span></label>
                  <input
                    type="text" name="city" value={formData.city} onChange={handleChange} required
                    className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Country <span className="text-sale">*</span></label>
                  <input
                    type="text" name="country" value={formData.country} onChange={handleChange} required
                    className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="USA"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h2 className="text-lg font-bold mb-4 border-b border-border pb-2">Products & Requirements</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Products Needed <span className="text-sale">*</span></label>
                <textarea
                  name="productsRequested" value={formData.productsRequested} onChange={handleChange} required rows={3}
                  className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="e.g., 20x Ariel MeshBack Swivel Chair, 10x Executive Desk B002..."
                />
                {products.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {products.map((p) => (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            productsRequested: prev.productsRequested
                              ? `${prev.productsRequested}, ${p.name}`
                              : p.name,
                          }))
                        }
                        className="text-xs border border-border rounded-full px-3 py-1 hover:bg-muted transition-colors"
                      >
                        + {p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Total Quantity (approx.)</label>
                  <input
                    type="text" name="quantities" value={formData.quantities} onChange={handleChange}
                    className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., 50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Customisation Required?</label>
                  <select
                    name="customisation" value={formData.customisation} onChange={handleChange}
                    className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes — I need custom options</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Project details */}
          <div>
            <h2 className="text-lg font-bold mb-4 border-b border-border pb-2">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Budget Range</label>
                <select
                  name="budgetRange" value={formData.budgetRange} onChange={handleChange}
                  className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Timeline</label>
                <select
                  name="timeline" value={formData.timeline} onChange={handleChange}
                  className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select timeline</option>
                  {timelineOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Project Type</label>
                <select
                  name="projectType" value={formData.projectType} onChange={handleChange}
                  className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Reference Images</label>
                <label className="flex items-center gap-2 border border-dashed border-border rounded-lg px-4 py-2.5 cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {files.length > 0 ? `${files.length} file(s) selected` : "Upload images (max 5)"}
                  </span>
                  <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1.5">Project Description</label>
              <textarea
                name="projectDescription" value={formData.projectDescription} onChange={handleChange} rows={4}
                className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Tell us about your project — space size, style preferences, any special requirements..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Submit Quote Request
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RequestQuote;
