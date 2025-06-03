import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, BookOpen, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { booksData } from '@/data/booksData';
import { useToast } from '@/components/ui/use-toast';

const BookDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    const currentBook = booksData.find(b => b._id === id);
    setBook(currentBook);

    if (currentBook) {
      const related = booksData
        .filter(b => b._id !== id && b.genres.some(genre => currentBook.genres.includes(genre)))
        .slice(0, 3);
      setRelatedBooks(related);
    }
  }, [id, booksData]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Nuoroda Nukopijuota!",
      description: "Knygos nuoroda nukopijuota į iškarpinę.",
    });
  };

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-muted-foreground">Kraunama knygos informacija...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="outline" asChild className="mygtukoEfektas">
            <Link to="/visos-knygos" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Grįžti į Visas Knygas
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="sticky top-24">
              <img  
                className="w-full h-auto object-cover rounded-xl seselis mb-6"
                alt={`${book.title} viršelis`}
               src={book.imageUrl || "https://images.unsplash.com/photo-1568741310257-971279e30a9c"} />
              <div className="flex space-x-2 mb-6">
                <Button onClick={handleShare} variant="outline" className="mygtukoEfektas flex items-center flex-1">
                  <Share2 className="mr-2 h-4 w-4" /> Dalintis
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold tekstasGradientas mb-4">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Autorius: {book.author}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(book.rating)
                        ? 'reitingasZvaigzde fill-current'
                        : 'text-muted-foreground/50'
                    }`}
                  />
                ))}
                <span className="ml-2 text-lg font-medium text-foreground">
                  {book.rating.toFixed(1)}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">({Math.floor(Math.random() * 200 + 50)} atsiliepimai)</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <span>Išleista: {new Date(book.publishDate).toLocaleDateString('lt-LT', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                <span>{book.pages} puslapiai</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold text-foreground mb-2">Žanrai</p>
              <div className="flex flex-wrap gap-2">
                {book.genres.map((genre, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <p className="text-lg font-semibold text-foreground mb-2">Aprašymas</p>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {book.fullDescription || book.description}
              </p>
            </div>

            <div className="mb-8 p-6 bg-muted/30 rounded-xl">
              <p className="text-lg font-semibold text-foreground mb-3">Knygos Informacija</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><span className="font-medium text-foreground">Leidėjas:</span> {book.publisher || 'N/A'}</li>
                <li><span className="font-medium text-foreground">ISBN:</span> {book.isbn || 'N/A'}</li>
                <li><span className="font-medium text-foreground">Kopijų skaičius:</span> {book.amountOfCopies > 0 ? `${book.amountOfCopies} (Turima)` : 'Nėra sandėlyje'}</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {relatedBooks.length > 0 && (
          <motion.section
            className="mt-16 pt-12 border-t"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold tekstasGradientas mb-8 text-center">
              Panašios Knygos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBooks.map((relatedBook, index) => (
                <motion.div
                  key={relatedBook._id}
                  className="knyguKortele p-6 rounded-xl hoverEfektas"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.7, duration: 0.5 }}
                >
                  <img  
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    alt={`${relatedBook.title} viršelis`}
                   src={relatedBook.imageUrl || "https://images.unsplash.com/photo-1568741310257-971279e30a9c"} />
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {relatedBook.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    {relatedBook.author}
                  </p>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(relatedBook.rating)
                            ? 'reitingasZvaigzde fill-current'
                            : 'text-muted-foreground/50'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs font-medium">
                      {relatedBook.rating.toFixed(1)}
                    </span>
                  </div>
                  <Button asChild variant="outline" className="w-full mygtukoEfektas">
                    <Link to={`/knyga/${relatedBook._id}`}>
                      Peržiūrėti Detales
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default BookDetails;