export const checkIsLinkActive = (pathname: string, href: string) => {
  if (href === '/' && pathname !== '/') return false;
  else if (pathname.includes(href)) return true;
  return false;
};
