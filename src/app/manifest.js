export default function manifest() {
  return {
    name: 'MTS OFFSHORE Group',
    short_name: 'MTS Offshore',
    description:
      'Specialists in Offshore Construction, SPM Marine Terminal Maintenance, Subsea Flowline Installation & Global Project Management.',
    start_url: '/',
    display: 'standalone',
    background_color: '#002b49',
    theme_color: '#002b49',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
