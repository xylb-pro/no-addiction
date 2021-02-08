export const scrollToElement = (id: string) => {
  document
    .getElementById(id)
    ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
};
