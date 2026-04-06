'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { useTranslations } from '@/hooks/useTranslations';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Image data
const swiperImages = [
  {
    id: 1,
    src: '/images/swipper/01.webp',
    alt: 'Umzugsservice Bild 1',
  },
  {
    id: 2,
    src: '/images/swipper/02.webp',
    alt: 'Umzugsservice Bild 2',
  },
  {
    id: 3,
    src: '/images/swipper/03.webp',
    alt: 'Umzugsservice Bild 3',
  },
  {
    id: 4,
    src: '/images/swipper/04.webp',
    alt: 'Umzugsservice Bild 4',
  },
  {
    id: 5,
    src: '/images/swipper/05.webp',
    alt: 'Umzugsservice Bild 5',
  },
  {
    id: 6,
    src: '/images/swipper/06.webp',
    alt: 'Umzugsservice Bild 6',
  },
];

export default function ImageSwiper() {
  const { data } = useTranslations();

  return (
    <div className="relative bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            {data.gallery.subtitle}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-accent-900 sm:text-4xl font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
            {data.gallery.title}
          </p>
          <p className="mt-6 text-lg leading-8 text-accent-600">
            {data.gallery.description}
          </p>
        </div>

        {/* Swiper */}
        <div className="mt-8 lg:mt-10">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            loop={true}
            className="!pb-6"
          >
            {swiperImages.map((image, index) => (
              <SwiperSlide key={image.id}>
                <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden bg-white">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={600}
                      className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      quality={85}

                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <p className="text-lg text-accent-600 mb-8">
            {data.gallery.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={data.hero.cta.primary.link}
              className="btn-primary"
            >
              {data.hero.cta.primary.text}
            </a>
            <a
              href={`tel:${data.company.phone}`}
              className="inline-flex items-center justify-center gap-x-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-lg ring-1 ring-primary-600 hover:bg-primary-50 transition-all duration-200"
            >
              {data.gallery.cta.callButton}
            </a>
          </div>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #1e40af !important;
          background: white !important;
          border-radius: 50% !important;
          width: 50px !important;
          height: 50px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
          border: 2px solid #1e40af !important;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bold !important;
        }

        .swiper-pagination-bullet {
          background: #d1d5db !important;
          opacity: 1 !important;
          width: 12px !important;
          height: 12px !important;
        }

        .swiper-pagination-bullet-active {
          background: #1e40af !important;
          transform: scale(1.2) !important;
        }

        .swiper-pagination {
          bottom: 0 !important;
        }
      `}</style>
    </div>
  );
}
