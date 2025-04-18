import i18n from '@/i18n';
import type { TFunction } from 'i18next';

/**
 * 获取指定语言的翻译函数 (t function)。
 * 这个函数是异步的，以防 i18next 需要异步加载资源或切换语言。
 * @param lng - 语言代码 (例如 'en', 'zh')。如果未提供，则使用当前或回退语言。
 * @returns Promise<TFunction> - 返回一个解析为翻译函数的 Promise。
 */
export async function getTranslator(lng?: string): Promise<TFunction> {
  const targetLng =
    lng || i18n.language || (i18n.options.fallbackLng as string[])[0];

  // 如果 i18n 实例的当前语言与目标语言不一致，则切换语言
  // 注意：changeLanguage 是异步的
  if (i18n.language !== targetLng) {
    await i18n.changeLanguage(targetLng);
  }

  return i18n.t;
}

/**
 * 获取当前支持的语言列表
 * @returns string[]
 */
export function getSupportedLangs(): string[] {
  return Object.keys(i18n.options.resources || {});
}
