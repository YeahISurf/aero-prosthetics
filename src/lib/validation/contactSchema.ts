import * as yup from 'yup';

export const contactSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().matches(
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    'Invalid phone number'
  ),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
  preferredLocation: yup.string().oneOf(['anaheim', 'victorville']),
  preferredContact: yup.string().oneOf(['email', 'phone']).required('Preferred contact method is required'),
  consent: yup.boolean().oneOf([true], 'You must consent to our privacy policy'),
  phiConsent: yup.boolean().oneOf([true], 'You must consent to the use of your health information'),
  communicationConsent: yup.boolean(),
});

export type ContactFormData = yup.InferType<typeof contactSchema>;
