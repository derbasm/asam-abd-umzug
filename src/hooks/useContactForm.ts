import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  movingDate?: string;
  fromCity?: string;
  toCity?: string;
  message?: string;
}

interface ContactFormState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export const useContactForm = () => {
  const [state, setState] = useState<ContactFormState>({
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const submitForm = async (data: ContactFormData) => {
    setState({ isLoading: true, isSuccess: false, error: null });

    // Build enriched message from moving details
    const messageParts: string[] = [];
    if (data.movingDate) messageParts.push(`Umzugsdatum: ${data.movingDate}`);
    if (data.fromCity) messageParts.push(`Von: ${data.fromCity}`);
    if (data.toCity) messageParts.push(`Nach: ${data.toCity}`);
    if (data.message) messageParts.push(`Nachricht: ${data.message}`);

    const enrichedMessage = messageParts.join('\n');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service || '',
          message: enrichedMessage,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Es ist ein Fehler aufgetreten.');
      }

      setState({
        isLoading: false,
        isSuccess: true,
        error: null,
      });

      return true;
    } catch (error) {
      setState({
        isLoading: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : 'Es ist ein Fehler aufgetreten.',
      });

      return false;
    }
  };

  return {
    ...state,
    submitForm,
  };
}; 