
// Security monitoring and logging utilities
export interface SecurityEvent {
  type: 'login_attempt' | 'login_success' | 'login_failure' | 'signup_attempt' | 'signup_success' | 'signup_failure' | 'password_reset' | 'unauthorized_access';
  userId?: string;
  email?: string;
  timestamp: Date;
  details?: Record<string, any>;
  userAgent?: string;
  ipAddress?: string;
}

export const logSecurityEvent = (event: Omit<SecurityEvent, 'timestamp' | 'userAgent'>) => {
  const securityEvent: SecurityEvent = {
    ...event,
    timestamp: new Date(),
    userAgent: navigator.userAgent,
  };

  // Log to browser console for development
  console.log('Security Event:', securityEvent);

  // In production, you might want to send this to a logging service
  // Example: await fetch('/api/security-log', { method: 'POST', body: JSON.stringify(securityEvent) });
};

export const sanitizeErrorMessage = (error: any): string => {
  // Sanitize error messages to prevent information leakage
  if (typeof error === 'string') {
    return error.includes('Invalid login credentials') ? 'Authentication failed' : 'An error occurred';
  }
  
  if (error?.message) {
    const message = error.message.toLowerCase();
    if (message.includes('invalid') || message.includes('credentials') || message.includes('password')) {
      return 'Authentication failed';
    }
    if (message.includes('network') || message.includes('connection')) {
      return 'Network error occurred';
    }
    if (message.includes('rate limit') || message.includes('too many')) {
      return 'Too many requests, please try again later';
    }
  }
  
  return 'An unexpected error occurred';
};
