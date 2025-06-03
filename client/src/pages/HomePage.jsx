import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Star, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { booksData } from '@/data/booksData';

const HomePage = () => {
  const popularBooks = booksData
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const statsCards = [
    {
      icon: BookOpen,
      count: booksData.length,
      title: 'Knygų',
      description: 'Mūsų kolekcijoje'
    },
    {
      icon: Star,
      count: '4.6',
      title: 'Vidutinis Įvertinimas',
      description: 'Mūsų skaitytojų'
    },
    {
      icon: Users,
      count: '2.5K+',
      title: 'Aktyvių Skaitytojų',
      description: 'Mūsų bendruomenėje'
    },
    {
      icon: TrendingUp,
      count: '150+',
      title: 'Naujų Apžvalgų',
      description: 'Kiekvieną mėnesį'
    }
  ];

  return (
    <div className="min-h-screen">
      <motion.section
        className="heroSekcija py-20 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Atraskite
                <span className="block">Knygų Pasaulį</span>
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                Mūsų biblioteka siūlo geriausias knygas su išsamiomis apžvalgomis, 
                įvertinimais ir rekomendacijomis. Prisijunkite prie mūsų skaitytojų bendruomenės!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="mygtukoEfektas stiklas text-lg px-8 py-4 hoverEfektas"
                >
                  <Link to="/visos-knygos">
                    Naršyti Knygas
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative">
                <img  
                  className="rounded-2xl seselis w-full h-96 object-cover"
                  alt="Biblioteka su knygomis"
                 src="https://images.unsplash.com/photo-1554896485-c6d2cc4111a8" />
                <div className="absolute inset-0 gradientas opacity-20 rounded-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 bg-muted/30"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  className="knyguKortele p-6 rounded-xl text-center hoverEfektas"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="gradientas w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">
                    {card.count}
                  </h3>
                  <p className="font-semibold text-foreground mb-1">
                    {card.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold tekstasGradientas mb-4">
              Populiariausios Knygos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Atraskite populiariausias knygas pagal mūsų skaitytojų bendruomenės įvertinimus
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularBooks.map((book, index) => (
              <motion.div
                key={book._id}
                className="knyguKortele p-6 rounded-xl hoverEfektas"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <img  
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    alt={`${book.title} knygos viršelis`}
                   src={book.imageUrl || "https://images.unsplash.com/photo-1568741310257-971279e30a9c"} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {book.title}
                </h3>
                <p className="text-muted-foreground mb-3">
                  {book.author}
                </p>
                
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(book.rating)
                          ? 'reitingasZvaigzde fill-current'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">
                    {book.rating}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {book.description}
                </p>
                
                <Button
                  asChild
                  className="w-full mygtukoEfektas"
                  variant="outline"
                >
                  <Link to={`/knyga/${book._id}`}>
                    Skaityti Daugiau
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              asChild
              size="lg"
              className="mygtukoEfektas px-8 py-4"
            >
              <Link to="/visos-knygos">
                Peržiūrėti Visas Knygas
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;