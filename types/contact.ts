// Contact form types for Travel & Tours website

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferredTour?: string;
}

export interface FormState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

