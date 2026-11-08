/**
 * Список маршрутов для статического пререндера alex-gsm.at
 */
export const articleSlugs = [
  'wm-linz-gastro',
  'lask-liverpool',
  'linz-hitze',
  'larin-catenaccio',
  'partybus',
  'drogen-razzia',
  'jku-spartipps',
  'gruener-stahl',
  'jobportal-chaos',
  'winterradeln',
  'linz-steyr-pendeln',
];

export const ROUTES = [
  { path: '/' },
  { path: '/about' },
  { path: '/education' },
  { path: '/experience' },
  { path: '/skills' },
  { path: '/trends' },
  { path: '/publications' },
  { path: '/publikationen' },
  { path: '/contact' },
  // Статьи по основному пути
  ...articleSlugs.map((slug) => ({
    path: `/publications/${slug}`,
  })),
  // Немецкие алиасы
  ...articleSlugs.map((slug) => ({
    path: `/publikationen/${slug}`,
  })),
];
