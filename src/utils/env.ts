export const ENV = {
  isProd: process.env.NODE_ENV === 'production',
  isMobile: () => window.innerWidth < 720,
};
