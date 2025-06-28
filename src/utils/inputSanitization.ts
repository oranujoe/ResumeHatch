
// Input sanitization utilities for security
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
};

export const sanitizeEmail = (email: string): string => {
  return email
    .toLowerCase()
    .trim()
    .replace(/[^\w@.-]/g, '') // Only allow valid email characters
    .substring(0, 255); // Limit length
};

export const sanitizeName = (name: string): string => {
  return name
    .trim()
    .replace(/[^a-zA-Z\s'-]/g, '') // Only allow letters, spaces, hyphens, apostrophes
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 100); // Limit length
};

export const validateAndSanitizeInput = (input: string, type: 'string' | 'email' | 'name'): string => {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input provided');
  }

  switch (type) {
    case 'email':
      return sanitizeEmail(input);
    case 'name':
      return sanitizeName(input);
    default:
      return sanitizeString(input);
  }
};
