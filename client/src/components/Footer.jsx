import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <motion.footer
      className="bg-muted/50 py-12 border-t"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-lg font-semibold text-foreground mb-3">
              Bibliotekos Vieta
            </p>
            <div className="flex items-start text-muted-foreground mb-2">
              <MapPin className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-primary" />
              <span>Knygų al. 123, Skaitymo miestas, SM 12345</span>
            </div>
            <div className="flex items-start text-muted-foreground">
              <Clock className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-primary" />
              <span>Pirm–Penkt: 9:00 – 20:00<br />Šešt–Sekm: 10:00 – 18:00</span>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold text-foreground mb-3">
              Greitosios Nuorodos
            </p>
            <ul className="space-y-2">
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Pagrindinis</a></li>
              <li><a href="/visos-knygos" className="text-muted-foreground hover:text-primary transition-colors">Visos Knygos</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Apie Mus</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Kontaktai</a></li>
            </ul>
          </div>

          <div>
            <p className="text-lg font-semibold text-foreground mb-3">
              Sekite Mus
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Bibliotekos Knygų Apžvalgos. Visos teisės saugomos.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Sukurta su aistra skaitytojams.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;