import i18n from '@/i18n';
import type { TFunction } from 'i18next';

export async function getTranslator(lng?: string): Promise<TFunction> {
  const targetLng =
    lng || i18n.language || (i18n.options.fallbackLng as string[])[0];

  if (i18n.language !== targetLng) {
    await i18n.changeLanguage(targetLng);
  }

  return i18n.t;
}

export function getSupportedLangs(): string[] {
  return Object.keys(i18n.options.resources || {});
}
