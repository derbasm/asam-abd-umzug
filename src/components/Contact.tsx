'use client';

import { motion } from 'framer-motion';
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

type FormFields = keyof FormData;

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

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted:', data);
    
    const success = await submitForm({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    if (success) {
      reset(); // Reset form on success
      console.log('Message sent successfully!');
    }
  };

  return (
    <div className="relative isolate bg-accent-50 section-spacing" id="contact">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="mobile-heading lg:text-4xl xl:text-5xl font-heading gradient-text text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {contact.title}
          </motion.h2>
          <motion.p
            className="mt-6 text-lg leading-8 text-accent-600 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {contact.description}
          </motion.p>
        </div>
        
        <motion.div
          className="mx-auto mt-12 sm:mt-16 lg:mt-20 grid max-w-4xl grid-cols-1 gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Contact Information */}
          <div className="order-2 lg:order-1">
            <div className="mx-auto max-w-xl lg:mx-0">
              <div className="grid grid-cols-1 gap-6 sm:gap-8">
                <motion.div 
                  className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <div className="icon-box bg-primary-600 text-white group-hover:bg-secondary-600">
                    <PhoneIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-accent-900 group-hover:text-primary-600 transition-colors">
                      {contact.contactInfo.phone.title}
                    </h3>
                    <p className="mt-2 text-accent-600 font-medium">
                      <a href={`tel:${data.company.phone}`} className="hover:text-primary-600 transition-colors">
                        {contact.contactInfo.phone.value}
                      </a>
                    </p>
                    <p className="mt-1 text-sm text-accent-500">{contact.contactInfo.phone.hours}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <div className="icon-box bg-primary-600 text-white group-hover:bg-secondary-600">
                    <EnvelopeIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-accent-900 group-hover:text-primary-600 transition-colors">
                      {contact.contactInfo.email.title}
                    </h3>
                    <p className="mt-2 text-accent-600 font-medium break-all">
                      <a href={`mailto:${contact.contactInfo.email.value}`} className="hover:text-primary-600 transition-colors">
                        {contact.contactInfo.email.value}
                      </a>
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <div className="icon-box bg-primary-600 text-white group-hover:bg-secondary-600">
                    <MapPinIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-accent-900 group-hover:text-primary-600 transition-colors">
                      {contact.contactInfo.address.title}
                    </h3>
                    <p className="mt-2 text-accent-600">{contact.contactInfo.address.street}</p>
                    <p className="text-accent-600">{contact.contactInfo.address.city}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold text-accent-900 mb-2">Kostenlose Beratung</h3>
                <p className="text-accent-600">Schreiben Sie uns eine Nachricht</p>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {contact.form.fields.map((field, index) => (
                  <motion.div 
                    key={field.name} 
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <label htmlFor={field.name} className="block text-sm font-medium text-accent-700 mb-3">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      {field.type === 'textarea' ? (
                        <textarea
                          {...register(field.name as FormFields, { required: field.required })}
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none text-accent-900 placeholder-accent-400"
                          placeholder={`${field.label} eingeben...`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          {...register(field.name as FormFields, { required: field.required })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-accent-900 placeholder-accent-400"
                          placeholder={`${field.label} eingeben...`}
                        />
                      )}
                      {errors[field.name as FormFields] && (
                        <motion.p 
                          className="mt-2 text-sm text-red-600 flex items-center gap-2"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="text-red-500">⚠️</span>
                          {field.error}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                <motion.div 
                  className="pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-primary-700 hover:to-secondary-700 focus:ring-4 focus:ring-primary-200 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        Nachricht wird gesendet...
                      </span>
                    ) : (
                      contact.form.submitButton
                    )}
                  </button>
                </motion.div>

                {/* Success/Error Messages */}
                {isSuccess && (
                  <motion.div 
                    className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 text-green-800">
                      <span className="text-green-600">✅</span>
                      <p className="font-medium">Nachricht erfolgreich gesendet!</p>
                    </div>
                    <p className="mt-1 text-sm text-green-700">
                      Vielen Dank für Ihre Anfrage. Wir melden uns schnellstmöglich bei Ihnen.
                    </p>
                  </motion.div>
                )}

                {error && (
                  <motion.div 
                    className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 text-red-800">
                      <span className="text-red-600">❌</span>
                      <p className="font-medium">Fehler beim Senden</p>
                    </div>
                    <p className="mt-1 text-sm text-red-700">
                      {error}
                    </p>
                  </motion.div>
                )}
                
                {/* Form info */}
                <div className="text-center pt-4">
                  <p className="text-xs text-accent-500">
                    🔒 Ihre Daten werden sicher übertragen und nicht an Dritte weitergegeben
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 