import { contactSchema } from '../contactSchema';

describe('contactSchema', () => {
  it('validates a valid form submission', async () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      subject: 'Inquiry about services',
      message: 'I would like to learn more about your prosthetic services.',
      preferredLocation: 'anaheim',
      preferredContact: 'email',
      consent: true,
      phiConsent: true,
      communicationConsent: true,
    };

    await expect(contactSchema.validate(validData)).resolves.toEqual(validData);
  });

  it('requires firstName', async () => {
    const invalidData = {
      lastName: 'Doe',
      email: 'john.doe@example.com',
      subject: 'Inquiry',
      message: 'This is a test message',
      preferredContact: 'email',
      consent: true,
      phiConsent: true,
    };

    await expect(contactSchema.validate(invalidData)).rejects.toThrow('First name is required');
  });

  it('requires lastName', async () => {
    const invalidData = {
      firstName: 'John',
      email: 'john.doe@example.com',
      subject: 'Inquiry',
      message: 'This is a test message',
      preferredContact: 'email',
      consent: true,
      phiConsent: true,
    };

    await expect(contactSchema.validate(invalidData)).rejects.toThrow('Last name is required');
  });

  it('requires a valid email', async () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      subject: 'Inquiry',
      message: 'This is a test message',
      preferredContact: 'email',
      consent: true,
      phiConsent: true,
    };

    await expect(contactSchema.validate(invalidData)).rejects.toThrow('Invalid email address');
  });

  it('validates phone number format', async () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: 'invalid-phone',
      subject: 'Inquiry',
      message: 'This is a test message',
      preferredContact: 'email',
      consent: true,
      phiConsent: true,
    };

    await expect(contactSchema.validate(invalidData)).rejects.toThrow('Invalid phone number');
  });

  it('requires message to be at least 10 characters', async () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      subject: 'Inquiry',
      message: 'Short',
      preferredContact: 'email',
      consent: true,
      phiConsent: true,
    };

    await expect(contactSchema.validate(invalidData)).rejects.toThrow('Message must be at least 10 characters');
  });

  it('requires consent to be true', async () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      subject: 'Inquiry',
      message: 'This is a test message',
      preferredContact: 'email',
      consent: false,
      phiConsent: true,
    };

    await expect(contactSchema.validate(invalidData)).rejects.toThrow('You must consent to our privacy policy');
  });

  it('requires phiConsent to be true', async () => {
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      subject: 'Inquiry',
      message: 'This is a test message',
      preferredContact: 'email',
      consent: true,
      phiConsent: false,
    };

    await expect(contactSchema.validate(invalidData)).rejects.toThrow('You must consent to the use of your health information');
  });
});
