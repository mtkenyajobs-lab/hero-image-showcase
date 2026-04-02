import logo from "@/assets/logo.jpg";

const footerLinks = {
  "Get to Know Us": ["About us", "Career", "Trending updates", "Services"],
  Categories: ["Office Chairs", "Desks & Workstations", "Conference Tables", "Lounge & Reception", "Storage Solutions"],
  Help: ["Payments", "Shipping", "Cancellation & Returns", "FAQs"],
  "Connect with Us": ["Facebook", "Twitter", "Instagram", "Discord"],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <img src={logo} alt="Regal Office & Home" className="h-10 mb-4 brightness-0 invert" />
            <p className="text-xs text-primary-foreground/60">Email: contact@hfus.com</p>
            <p className="text-xs text-primary-foreground/60">Live Chat Support</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="font-semibold text-sm mb-3">{title}</p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-primary-foreground/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex gap-4 text-xs text-primary-foreground/60">
            <a href="#" className="hover:text-primary-foreground underline">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground underline">Terms and Conditions</a>
            <a href="#" className="hover:text-primary-foreground underline">Return Policy</a>
          </div>
          <p className="text-xs text-primary-foreground/40">© 2025 Regal Office & Home. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
