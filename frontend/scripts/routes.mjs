/**
 * Список маршрутов для статического пререндера alex-gsm.at (DE & EN)
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
  // Deutsche Hauptversion
  { path: '/' },
  { path: '/about' },
  { path: '/education' },
  { path: '/experience' },
  { path: '/skills' },
  { path: '/trends' },
  { path: '/publications' },
  { path: '/publikationen' },
  { path: '/contact' },
  ...articleSlugs.map((slug) => ({
    path: `/publications/${slug}`,
  })),
  ...articleSlugs.map((slug) => ({
    path: `/publikationen/${slug}`,
  })),

  // English version (/en/...)
  { path: '/en' },
  { path: '/en/about' },
  { path: '/en/education' },
  { path: '/en/experience' },
  { path: '/en/skills' },
  { path: '/en/trends' },
  { path: '/en/publications' },
  { path: '/en/contact' },
  ...articleSlugs.map((slug) => ({
    path: `/en/publications/${slug}`,
  })),
];
