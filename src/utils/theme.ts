
export const initializeTheme = () => {
  // Check localStorage first
  const savedTheme = localStorage.getItem('theme');
  
  // If no saved theme, check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Determine which theme to use
  const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  
  // Apply the theme
  if (shouldUseDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  
  return shouldUseDark;
};
