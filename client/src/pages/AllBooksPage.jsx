import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Calendar, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { booksData } from '@/data/booksData';

const AllBooksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const minPublishYear = useMemo(() => Math.min(...booksData.map(k => new Date(k.publishDate).getFullYear())), []);
  const maxPublishYear = useMemo(() => Math.max(...booksData.map(k => new Date(k.publishDate).getFullYear())), []);
  
  const [yearRange, setYearRange] = useState([minPublishYear, maxPublishYear]);
  const [sortBy, setSortBy] = useState('rating-desc');

  useEffect(() => {
    setYearRange([minPublishYear, maxPublishYear]);
  }, [minPublishYear, maxPublishYear]);

  const filteredBooks = useMemo(() => {
    let result = booksData.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const bookYear = new Date(book.publishDate).getFullYear();
      const matchesYearRange = bookYear >= yearRange[0] && bookYear <= yearRange[1];
            
      return matchesSearch && matchesYearRange;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating-asc':
          return a.rating - b.rating;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'date-asc':
          return new Date(a.publishDate) - new Date(b.publishDate);
        case 'date-desc':
          return new Date(b.publishDate) - new Date(a.publishDate);
        default:
          return b.rating - a.rating;
      }
    });

    return result;
  }, [searchTerm, yearRange, sortBy, booksData]);

  const clearFilters = () => {
    setSearchTerm('');
    setYearRange([minPublishYear, maxPublishYear]);
    setSortBy('rating-desc');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold tekstasGradientas mb-4">
            Visos Knygos
          </h1>
          <p className="text-xl text-muted-foreground">
            Atraskite {booksData.length} knygas mūsų kolekcijoje
          </p>
        </motion.div>

        <motion.div
          className="filtruSekcija mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Filtrai ir Paieška</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <Label htmlFor="searchTerm">Paieška</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="searchTerm"
                  placeholder="Ieškoti knygų..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-1 lg:col-span-1">
              <Label>Leidimo Metai: {yearRange[0]} - {yearRange[1]}</Label>
              <Slider
                value={yearRange}
                onValueChange={setYearRange}
                min={minPublishYear}
                max={maxPublishYear}
                step={1}
                className="my-4"
                aria-label="Leidimo metų intervalas"
              />
            </div>

            <div className="space-y-2">
              <Label>Rikiuoti Pagal</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Pasirinkite rikiavimo būdą" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating-desc">Įvertinimas (Aukščiausias)</SelectItem>
                  <SelectItem value="rating-asc">Įvertinimas (Žemiausias)</SelectItem>
                  <SelectItem value="title-asc">Pavadinimas (A-Z)</SelectItem>
                  <SelectItem value="title-desc">Pavadinimas (Z-A)</SelectItem>
                  <SelectItem value="date-desc">Leidimo Data (Naujausios)</SelectItem>
                  <SelectItem value="date-asc">Leidimo Data (Seniausios)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-end mt-6">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="mygtukoEfektas"
            >
              Išvalyti Filtrus
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <p className="text-muted-foreground">
            Rasta <span className="font-semibold text-primary">{filteredBooks.length}</span> knygų
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book._id}
              className="knyguKortele p-6 rounded-xl hoverEfektas"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="mb-4">
                <img  
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  alt={`${book.title} knygos viršelis`}
                 src={book.imageUrl || "https://images.unsplash.com/photo-1568741310257-971279e30a9c"} />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                {book.title}
              </h3>
              
              <p className="text-muted-foreground mb-3 font-medium">
                {book.author}
              </p>
              
              <div className="flex items-center mb-3">
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
              
              <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(book.publishDate).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{book.amountOfCopies > 0 ? 'Turima' : 'Nėra'}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {book.genres.slice(0, 2).map((genre, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                  {book.genres.length > 2 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{book.genres.length - 2}
                    </span>
                  )}
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {book.description}
              </p>
              
              <Button
                asChild
                className="w-full mygtukoEfektas"
              >
                <Link 
                  to={`/knyga/${book._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Skaityti Plačiau
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Knygų Nerasta
            </h3>
            <p className="text-muted-foreground mb-6">
              Pabandykite pakeisti paieškos kriterijus arba išvalyti filtrus.
            </p>
            <Button
              onClick={clearFilters}
              className="mygtukoEfektas"
            >
              Išvalyti Filtrus
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllBooksPage;