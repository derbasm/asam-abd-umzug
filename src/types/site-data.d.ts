interface Company {
  name: string;
  slogan: string;
  description: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  social: {
    facebook: string;
    instagram: string;
  };
  workingHours: string;
}

interface Hero {
  title: string;
  subtitle: string;
  cta: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
  };
  consultation: {
    text: string;
    link: string;
  };
}

interface About {
  subtitle: string;
  title: string;
  description: string;
  features: string[];
}

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface Services {
  subtitle: string;
  title: string;
  description: string;
  items: Service[];
}

interface PricingTier {
  name: string;
  id: string;
  href: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
}

interface Pricing {
  subtitle: string;
  title: string;
  description: string;
  cta: string;
  tiers: PricingTier[];
}

interface Review {
  id: number;
  name: string;
  rating: number;
  location: string;
  text: string;
}

interface Reviews {
  subtitle: string;
  title: string;
  description: string;
  items: Review[];
}

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  error?: string;
  options?: string[];
}

interface ContactInfo {
  phone: {
    title: string;
    value: string;
    hours: string;
  };
  email: {
    title: string;
    value: string;
  };
  address: {
    title: string;
    street: string;
    city: string;
  };
}

interface Contact {
  title: string;
  subtitle: string;
  description: string;
  form: {
    fields: FormField[];
    submitButton: string;
  };
  contactInfo: ContactInfo;
}

interface Footer {
  copyright: string;
}

export interface SiteData {
  company: Company;
  hero: Hero;
  about: About;
  services: Services;
  pricing: Pricing;
  reviews: Reviews;
  contact: Contact;
  footer: Footer;
} 