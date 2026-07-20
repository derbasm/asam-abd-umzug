'use client';

import { useForm } from 'react-hook-form';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from '@/hooks/useTranslations';
import { useContactForm } from '@/hooks/useContactForm';
import { trackEvent } from '@/lib/analytics';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
}

const TRUST_POINTS = [
  'Kostenlose, unverbindliche Besichtigung',
  'Antwort innerhalb von 24 Stunden',
  'Faire Festpreise ohne versteckte Kosten',
];

const inputClass =
  'block w-full rounded-md border-0 py-2 pl-10 pr-3.5 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-shadow duration-200';

const inputErrorClass = 'ring-red-300 focus:ring-red-500';

const iconClass = 'pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-accent-400';

export default function Contact() {
  const { data } = useTranslations();
  const { contact } = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { isLoading, isSuccess, error, submitForm, resetState } = useContactForm();

  const onSubmit = async (formData: FormData) => {
    const success = await submitForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    if (success) {
      trackEvent('contact_submit', { location: 'contact_form' });
      reset();
    }
  };

  const onInvalidSubmit = () => {
    trackEvent('form_error', {
      location: 'contact_form',
      fields: Object.keys(errors).join(','),
      error_type: 'validation',
    });
  };

  return (
    <div className="relative isolate bg-accent-50 section-spacing" id="contact">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Kontakt</p>
          <h2 className="mt-2 mobile-heading lg:text-4xl xl:text-5xl font-heading gradient-text text-balance">
            {contact.title}
          </h2>
          <p className="mt-2 text-lg leading-8 text-accent-600">
            {contact.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                <PhoneIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-accent-900">{contact.contactInfo.phone.title}</p>
                <a
                  href={`tel:${data.company.phone}`}
                  onClick={() => trackEvent('phone_click', { location: 'contact_section' })}
                  className="text-accent-600 hover:text-primary-600 transition-colors mt-1 block"
                >
                  {data.company.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-accent-900">{contact.contactInfo.email.title}</p>
                <a
                  href={`mailto:${data.company.email}`}
                  className="text-accent-600 hover:text-primary-600 transition-colors mt-1 block break-all"
                >
                  {data.company.email}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                <MapPinIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-accent-900">{contact.contactInfo.address.title}</p>
                <p className="text-accent-600 mt-1">
                  {data.company.address.street}<br />
                  {data.company.address.zip} {data.company.address.city}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                <ClockIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-accent-900">Öffnungszeiten</p>
                <p className="text-accent-600 mt-1">{data.company.workingHours}</p>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl ring-1 ring-accent-900/5 p-8">
            <form onSubmit={handleSubmit(onSubmit, onInvalidSubmit)} className="space-y-5">
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input {...register('website')} id="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              {/* Name + Phone */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-accent-900 mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon className={iconClass} aria-hidden="true" />
                    <input
                      {...register('name', {
                        required: 'Name ist erforderlich',
                        minLength: { value: 2, message: 'Mindestens 2 Zeichen' },
                      })}
                      type="text"
                      id="name"
                      className={`${inputClass} ${errors.name ? inputErrorClass : ''}`}
                      placeholder="Ihr Name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                  </div>
                  {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-accent-900 mb-1.5">
                    Telefon <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <PhoneIcon className={iconClass} aria-hidden="true" />
                    <input
                      {...register('phone', { required: 'Telefonnummer ist erforderlich' })}
                      type="tel"
                      id="phone"
                      className={`${inputClass} ${errors.phone ? inputErrorClass : ''}`}
                      placeholder="+49 176 ..."
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                  </div>
                  {errors.phone && <p id="phone-error" className="mt-1.5 text-xs text-red-600">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-accent-900 mb-1.5">
                  E-Mail <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <EnvelopeIcon className={iconClass} aria-hidden="true" />
                  <input
                    {...register('email', {
                      required: 'E-Mail ist erforderlich',
                      pattern: { value: /^\S+@\S+$/i, message: 'Gültige E-Mail-Adresse eingeben' },
                    })}
                    type="email"
                    id="email"
                    className={`${inputClass} ${errors.email ? inputErrorClass : ''}`}
                    placeholder="ihre.email@beispiel.de"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium leading-6 text-accent-900 mb-1.5">
                  Ihre Nachricht
                </label>
                <div className="relative">
                  <ChatBubbleLeftRightIcon className={`${iconClass} top-3`} aria-hidden="true" />
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={4}
                    className={inputClass}
                    placeholder="z.B. gewünschter Umzugstermin, Von/Nach, Anzahl Zimmer, besondere Gegenstände (Klavier, Safe), etc."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    Kostenlose Anfrage senden
                    <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
                  </>
                )}
              </button>

              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {TRUST_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-1.5 text-xs text-accent-500">
                    <CheckCircleIcon className="h-4 w-4 flex-shrink-0 text-primary-600" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-accent-400 text-center">
                * Pflichtfelder – Ihre Daten werden vertraulich behandelt.
              </p>

              {isSuccess && (
                <div role="status" className="rounded-xl bg-green-50 border border-green-200 p-4 flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-green-800">
                    ✅ Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                  <button
                    type="button"
                    onClick={resetState}
                    className="flex-shrink-0 text-green-600 hover:text-green-800 transition-colors"
                    aria-label="Meldung schließen"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                </div>
              )}

              {error && (
                <div role="alert" className="rounded-xl bg-red-50 border border-red-200 p-4">
                  <p className="text-sm text-red-800">❌ {error}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
