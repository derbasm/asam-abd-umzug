'use client';

import { useForm } from 'react-hook-form';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslations } from '@/hooks/useTranslations';
import { useContactForm } from '@/hooks/useContactForm';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const { data } = useTranslations();
  const { contact } = data;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { isLoading, isSuccess, error, submitForm } = useContactForm();

  const onSubmit = async (formData: FormData) => {
    console.log('Form submitted:', formData);
    
    const success = await submitForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    if (success) {
      reset(); // Reset form on success
      console.log('Message sent successfully!');
    }
  };

  // Find form field data by name
  const getFieldData = (fieldName: string) => {
    return contact.form.fields.find(field => field.name === fieldName);
  };

  const nameField = getFieldData('name');
  const emailField = getFieldData('email');
  const phoneField = getFieldData('phone');
  const messageField = getFieldData('message');

  return (
    <div className="relative isolate bg-accent-50 section-spacing" id="contact">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-accent-900 sm:text-4xl">
            {contact.title}
          </h2>
          <p className="mt-2 text-lg leading-8 text-accent-600">
            {contact.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <div className="grid grid-cols-1 gap-8">
              <div className="relative">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  </div>
                  <div className="ml-3 text-base">
                    <p className="font-medium text-accent-900">{contact.contactInfo.phone.title}</p>
                    <p className="text-accent-600">
                      <a 
                        href={`tel:${data.company.phone}`}
                        className="hover:text-primary-600 transition-colors"
                      >
                        {data.company.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <EnvelopeIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  </div>
                  <div className="ml-3 text-base">
                    <p className="font-medium text-accent-900">{contact.contactInfo.email.title}</p>
                    <p className="text-accent-600">
                      <a 
                        href={`mailto:${data.company.email}`}
                        className="hover:text-primary-600 transition-colors break-all"
                      >
                        {data.company.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  </div>
                  <div className="ml-3 text-base">
                    <p className="font-medium text-accent-900">{contact.contactInfo.address.title}</p>
                    <p className="text-accent-600">
                      {data.company.address.street}<br />
                      {data.company.address.zip} {data.company.address.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl ring-1 ring-accent-900/5 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-accent-900">
                  {nameField?.label || 'Name'}
                </label>
                <div className="mt-2">
                  <input
                    {...register('name', { 
                      required: nameField?.required ? nameField.error : false,
                      minLength: { value: 2, message: 'Name muss mindestens 2 Zeichen lang sein' }
                    })}
                    type="text"
                    id="name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    placeholder="Ihr Name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-accent-900">
                  {emailField?.label || 'E-Mail'}
                </label>
                <div className="mt-2">
                  <input
                    {...register('email', { 
                      required: emailField?.required ? emailField.error : false,
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
                      }
                    })}
                    type="email"
                    id="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    placeholder="ihre.email@beispiel.de"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-accent-900">
                  {phoneField?.label || 'Telefon'}
                </label>
                <div className="mt-2">
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    placeholder="+49 123 456789"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium leading-6 text-accent-900">
                  {messageField?.label || 'Nachricht'}
                </label>
                <div className="mt-2">
                  <textarea
                    {...register('message', { 
                      required: messageField?.required ? messageField.error || 'Nachricht ist erforderlich' : false,
                      minLength: { value: 10, message: 'Nachricht muss mindestens 10 Zeichen lang sein' }
                    })}
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    placeholder="Beschreiben Sie Ihren Umzug..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Wird gesendet...' : contact.form.submitButton}
                </button>
              </div>

              {/* Success/Error Messages */}
              {isSuccess && (
                <div className="rounded-md bg-green-50 p-4">
                  <p className="text-sm text-green-800">
                    ✅ Nachricht erfolgreich gesendet! Wir melden uns bald bei Ihnen.
                  </p>
                </div>
              )}

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-800">
                    ❌ Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
