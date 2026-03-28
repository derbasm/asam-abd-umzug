import { z } from 'zod';

const phoneRegex = /^[+0-9()\-\s/]{6,25}$/;

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

export const contactRequestSchema = z.object({
  name: z.string().trim().min(2, 'Name muss mindestens 2 Zeichen haben.').max(80, 'Name ist zu lang.'),
  email: z.string().trim().email('Bitte eine gueltige E-Mail-Adresse eingeben.').max(254, 'E-Mail ist zu lang.'),
  phone: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .regex(phoneRegex, 'Bitte eine gueltige Telefonnummer eingeben.')
      .optional()
  ),
  service: z.preprocess(emptyToUndefined, z.string().trim().max(100, 'Service ist zu lang.').optional()),
  message: z.preprocess(emptyToUndefined, z.string().trim().max(5000, 'Nachricht ist zu lang.').optional()),
  website: z.preprocess(emptyToUndefined, z.string().max(0).optional()),
});

export const adminLoginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Benutzername ist zu kurz.')
    .max(60, 'Benutzername ist zu lang.')
    .regex(/^[a-zA-Z0-9_.-]+$/, 'Benutzername enthaelt ungueltige Zeichen.'),
  password: z.string().min(8, 'Passwort ist zu kurz.').max(200, 'Passwort ist zu lang.'),
});

export function formatZodError(error: z.ZodError): string {
  const firstIssue = error.issues[0];
  return firstIssue?.message ?? 'Ungueltige Eingabe.';
}
