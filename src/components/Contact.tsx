'use client';

import { useForm } from 'react-hook-form';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useTranslations } from '@/hooks/useTranslations';
import { useContactForm } from '@/hooks/useContactForm';
import { trackEvent } from '@/lib/analytics';

const SERVICE_OPTIONS = [
  { value: '', label: 'Bitte wählen...' },
  { value: 'Privatumzug', label: 'Privatumzug' },
  { value: 'Büroumzug', label: 'Büroumzug' },
  { value: 'Möbelmontage', label: 'Möbelmontage' },
  { value: 'Verpackungsservice', label: 'Verpackungsservice' },
  { value: 'Transport', label: 'Transport (A nach B)' },
  { value: 'Haushaltsauflösung', label: 'Haushaltsauflösung / Entrümpelung' },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  movingDate: string;
  fromCity: string;
  toCity: string;
  message: string;
}

const inputClass =
  'block w-full rounded-md border-0 px-3.5 py-2 text-accent-900 shadow-sm ring-1 ring-inset ring-accent-300 placeholder:text-accent-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-shadow duration-200';

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
    const success = await submitForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      movingDate: formData.movingDate,
      fromCity: formData.fromCity,
      toCity: formData.toCity,
      message: formData.message,
    });

    if (success) {
      trackEvent('contact_submit', {
        location: 'contact_form',
        service: formData.service || 'unspecified',
      });
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
              {/* Name + Phone */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-accent-900 mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('name', {
                      required: 'Name ist erforderlich',
                      minLength: { value: 2, message: 'Mindestens 2 Zeichen' },
                    })}
                    type="text"
                    id="name"
                    className={inputClass}
                    placeholder="Ihr Name"
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-accent-900 mb-1.5">
                    Telefon <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('phone', { required: 'Telefonnummer ist erforderlich' })}
                    type="tel"
                    id="phone"
                    className={inputClass}
                    placeholder="+49 176 ..."
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-accent-900 mb-1.5">
                  E-Mail <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('email', {
                    required: 'E-Mail ist erforderlich',
                    pattern: { value: /^\S+@\S+$/i, message: 'Gültige E-Mail-Adresse eingeben' },
                  })}
                  type="email"
                  id="email"
                  className={inputClass}
                  placeholder="ihre.email@beispiel.de"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium leading-6 text-accent-900 mb-1.5">
                  Gewünschte Leistung
                </label>
                <select
                  {...register('service')}
                  id="service"
                  className={inputClass}
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Moving date */}
              <div>
                <label htmlFor="movingDate" className="block text-sm font-medium leading-6 text-accent-900 mb-1.5">
                  Geplantes Umzugsdatum
                </label>
                <input
                  {...register('movingDate')}
                  type="date"
                  id="movingDate"
                  className={inputClass}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* From / To */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fromCity" className="block text-sm font-medium leading-6 text-accent-900 mb-1.5">
                    Von (Ort / PLZ)
                  </label>
                  <input
                    {...register('fromCity')}
                    type="text"
                    id="fromCity"
                    className={inputClass}
                    placeholder="z.B. 59077 Hamm"
                  />
                </div>
                <div>
                  <label htmlFor="toCity" className="block text-sm font-medium leading-6 text-accent-900 mb-1.5">
                    Nach (Ort / PLZ)
                  </label>
                  <input
                    {...register('toCity')}
                    type="text"
                    id="toCity"
                    className={inputClass}
                    placeholder="z.B. 44137 Dortmund"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium leading-6 text-accent-900 mb-1.5">
                  Weitere Informationen
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={3}
                  className={inputClass}
                  placeholder="z.B. Anzahl Zimmer, Etage, besondere Gegenstände (Klavier, Safe), etc."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Wird gesendet...' : 'Kostenlose Anfrage senden'}
              </button>

              <p className="text-xs text-accent-400 text-center">
                * Pflichtfelder – Ihre Daten werden vertraulich behandelt.
              </p>

              {isSuccess && (
                <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                  <p className="text-sm font-medium text-green-800">
                    ✅ Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                </div>
              )}

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4">
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
