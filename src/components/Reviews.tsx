'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

const reviews = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    location: 'Berlin',
    text: 'Absolut professioneller Service! Das Team war pünktlich, freundlich und sehr vorsichtig mit unseren Möbeln. Der Umzug verlief reibungslos und schneller als erwartet.',
  },
  {
    id: 2,
    name: 'Thomas K.',
    rating: 5,
    location: 'Hamburg',
    text: 'Hervorragende Arbeit! Die Preisgestaltung war transparent, und das Team hat alle unsere Erwartungen übertroffen. Besonders die Möbelmontage war erstklassig.',
  },
  {
    id: 3,
    name: 'Lisa B.',
    rating: 5,
    location: 'München',
    text: 'Ein großes Lob an das gesamte Team! Die Kommunikation war ausgezeichnet, und selbst kurzfristige Änderungen wurden problemlos umgesetzt.',
  },
  {
    id: 4,
    name: 'Michael H.',
    rating: 5,
    location: 'Frankfurt',
    text: 'Sehr zufrieden mit dem Service. Das Team war hochprofessionell und hat unseren Firmenumzug perfekt koordiniert. Alle Termine wurden eingehalten.',
  },
  {
    id: 5,
    name: 'Julia W.',
    rating: 5,
    location: 'Köln',
    text: 'Fantastischer Service von Anfang bis Ende. Die Berater waren sehr kompetent und haben uns optimal bei der Planung unterstützt. Gerne wieder!',
  },
  {
    id: 6,
    name: 'Andreas P.',
    rating: 5,
    location: 'Stuttgart',
    text: 'Bester Umzugsservice, den ich je hatte! Das Team war nicht nur effizient, sondern auch sehr freundlich und hilfsbereit. Absolut empfehlenswert.',
  },
];

export default function Reviews() {
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
            Bewertungen
          </motion.h2>
          <motion.p
            className="mt-2 text-3xl font-bold tracking-tight text-accent-900 sm:text-4xl font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Was unsere Kunden sagen
          </motion.p>
          <motion.p
            className="mt-6 text-lg leading-8 text-accent-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Erfahren Sie, warum unsere Kunden uns vertrauen und weiterempfehlen.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {reviews.map((review, index) => (
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