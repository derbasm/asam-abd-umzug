'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslations } from '@/hooks/useTranslations';

interface FormData {
  name: string;
  email: string;
  phone: string;
  moveDate: string;
  fromAddress: string;
  toAddress: string;
  message: string;
}

type FormFields = keyof FormData;

export default function Contact() {
  const { data } = useTranslations();
  const { contact } = data;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Handle success (e.g., show success message, reset form)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error sending message:', error);
    }
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
            {contact.title}
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-accent-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {contact.description}
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
                    <h3 className="text-base font-semibold text-accent-900">{contact.contactInfo.phone.title}</h3>
                    <p className="mt-2 leading-7 text-accent-600">{contact.contactInfo.phone.value}</p>
                    <p className="mt-2 leading-7 text-accent-600">{contact.contactInfo.phone.hours}</p>
                  </div>
                </div>
                <div className="flex gap-x-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                    <EnvelopeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-accent-900">{contact.contactInfo.email.title}</h3>
                    <p className="mt-2 leading-7 text-accent-600">{contact.contactInfo.email.value}</p>
                  </div>
                </div>
                <div className="flex gap-x-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                    <MapPinIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-accent-900">{contact.contactInfo.address.title}</h3>
                    <p className="mt-2 leading-7 text-accent-600">{contact.contactInfo.address.street}</p>
                    <p className="leading-7 text-accent-600">{contact.contactInfo.address.city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl lg:mx-0">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {contact.form.fields.map((field) => (
                <div key={field.name} className={field.name === 'message' ? 'sm:col-span-2' : field.type === 'text' ? 'sm:col-span-2' : ''}>
                  <label htmlFor={field.name} className="block text-sm font-semibold leading-6 text-accent-900">
                    {field.label}
                  </label>
                  <div className="mt-2.5">
                    {field.type === 'textarea' ? (
                      <textarea
                        {...register(field.name as FormFields, { required: field.required })}
                        rows={4}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    ) : (
                      <input
                        type={field.type}
                        {...register(field.name as FormFields, { required: field.required })}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    )}
                    {errors[field.name as FormFields] && (
                      <p className="mt-1 text-sm text-red-600">{field.error}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                {contact.form.submitButton}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 