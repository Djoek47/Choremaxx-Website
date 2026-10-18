import localFont from 'next/font/local';

/** Self-hosted General Sans — replaces render-blocking Fontshare CSS. */
export const generalSans = localFont({
  src: '../public/fonts/GeneralSans-Variable.woff2',
  variable: '--font-general-sans',
  display: 'swap',
  weight: '200 700',
});
