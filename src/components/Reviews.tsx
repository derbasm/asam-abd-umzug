'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { useTranslations } from '@/hooks/useTranslations';

export default function Reviews() {
  const { data } = useTranslations();
  const { reviews } = data;

  return (
    <div className="bg-gradient-to-b from-white to-accent-50 section-spacing" id="reviews">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-base font-semibold leading-7 text-primary-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {reviews.subtitle}
          </motion.h2>
          <motion.h2
            className="mt-2 mobile-heading lg:text-4xl xl:text-5xl font-heading gradient-text text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {reviews.title}
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-accent-600 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {reviews.description}
          </motion.p>
        </div>
        
        <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {reviews.items.map((review, index) => (
            <motion.article
              key={review.id}
              className="card-interactive group h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-accent-900 group-hover:text-primary-600 transition-colors duration-200">
                      {review.name}
                    </h3>
                    <p className="text-sm text-accent-500 mt-1">
                      📍 {review.location}
                    </p>
                  </div>
                  
                  {/* Star rating */}
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-4 w-4 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                    <span className="text-sm font-medium text-yellow-600 ml-1">
                      {review.rating}.0
                    </span>
                  </div>
                </div>
                
                {/* Review text */}
                <div className="flex-1">
                  <blockquote className="text-accent-600 leading-relaxed italic">
                    "{review.text}"
                  </blockquote>
                </div>
                
                {/* Bottom border indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* CTA section */}
        <motion.div
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
            <p className="text-lg font-semibold text-accent-900 mb-2">
              ⭐ Über 500 zufriedene Kunden
            </p>
            <p className="text-accent-600 mb-6">
              Werden Sie Teil unserer wachsenden Familie zufriedener Kunden
            </p>
            <motion.a
              href="#contact"
              className="btn-primary btn-mobile inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Jetzt Bewertung lesen
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 