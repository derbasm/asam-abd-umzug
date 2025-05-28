'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

type FormData = {
  name: string;
  email: string;
  phone: string;
  moveDate: string;
  fromAddress: string;
  toAddress: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Here you would typically send the data to your backend
    console.log(data);
  };

  return (
    <div className="relative isolate bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-accent-900 sm:text-4xl font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Kontaktieren Sie uns
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-accent-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Lassen Sie uns Ihren Umzug gemeinsam planen. Kontaktieren Sie uns für ein unverbindliches Angebot.
          </motion.p>
        </div>
        <motion.div
          className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <div className="mx-auto max-w-xl lg:mx-0">
              <div className="grid grid-cols-1 gap-8">
                <div className="flex gap-x-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                    <PhoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-accent-900">Telefon</h3>
                    <p className="mt-2 leading-7 text-accent-600">+49 (0) 123 456789</p>
                    <p className="mt-2 leading-7 text-accent-600">Mo-Fr: 08:00 - 18:00 Uhr</p>
                  </div>
                </div>
                <div className="flex gap-x-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                    <EnvelopeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-accent-900">E-Mail</h3>
                    <p className="mt-2 leading-7 text-accent-600">info@modern-umzug.de</p>
                  </div>
                </div>
                <div className="flex gap-x-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                    <MapPinIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-accent-900">Standort</h3>
                    <p className="mt-2 leading-7 text-accent-600">Musterstraße 123</p>
                    <p className="leading-7 text-accent-600">12345 Berlin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl lg:mx-0">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-accent-900">
                  Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">Name ist erforderlich</p>}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-accent-900">
                  E-Mail
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">Gültige E-Mail erforderlich</p>}
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-accent-900">
                  Telefon
                </label>
                <div className="mt-2.5">
                  <input
                    type="tel"
                    {...register('phone', { required: true })}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">Telefonnummer ist erforderlich</p>}
                </div>
              </div>
              <div>
                <label htmlFor="moveDate" className="block text-sm font-semibold leading-6 text-accent-900">
                  Umzugstermin
                </label>
                <div className="mt-2.5">
                  <input
                    type="date"
                    {...register('moveDate', { required: true })}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                  {errors.moveDate && <p className="mt-1 text-sm text-red-600">Umzugstermin ist erforderlich</p>}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="fromAddress" className="block text-sm font-semibold leading-6 text-accent-900">
                  Von (Adresse)
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    {...register('fromAddress', { required: true })}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                  {errors.fromAddress && <p className="mt-1 text-sm text-red-600">Startadresse ist erforderlich</p>}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="toAddress" className="block text-sm font-semibold leading-6 text-accent-900">
                  Nach (Adresse)
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    {...register('toAddress', { required: true })}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                  {errors.toAddress && <p className="mt-1 text-sm text-red-600">Zieladresse ist erforderlich</p>}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-accent-900">
                  Nachricht
                </label>
                <div className="mt-2.5">
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Anfrage senden
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 