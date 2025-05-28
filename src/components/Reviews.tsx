'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { useTranslations } from '@/hooks/useTranslations';

export default function Reviews() {
  const { data } = useTranslations();
  const { reviews } = data;

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
          <motion.p
            className="mt-2 text-3xl font-bold tracking-tight text-accent-900 sm:text-4xl font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {reviews.title}
          </motion.p>
          <motion.p
            className="mt-6 text-lg leading-8 text-accent-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {reviews.description}
          </motion.p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {reviews.items.map((review, index) => (
            <motion.article
              key={review.id}
              className="flex flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-accent-200 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                <div className="flex items-center gap-x-4">
                  <div className="flex-1">
                    <h3 className="font-semibold leading-7 text-accent-900">
                      {review.name}
                    </h3>
                    <p className="text-sm leading-6 text-accent-600">
                      {review.location}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-base leading-6 text-accent-600">
                  {review.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
} 