// import { getRequestConfig } from 'next-intl/server';
import configModule from '../config';

// Interface for IntlError to match actual implementation
interface IntlError extends Error {
  code: string;
}

// Interface for the config module
interface ConfigModule {
  ({ requestLocale }: { requestLocale: Promise<string> }): Promise<{
    locale: string;
    messages: Record<string, unknown>;
    onError: (error: IntlError) => string | never;
    fallbacks?: { '*': string };
  }>;
}

// Mock dynamic imports
jest.mock('next-intl/server', () => ({
  getRequestConfig: jest.fn((callback) => callback),
}));

// Mock the actual import functionality
jest.mock('../../../locales/en.json', () => ({
  default: { mock: 'en-messages' }
}), { virtual: true });

jest.mock('../../../locales/es.json', () => ({
  default: { mock: 'es-messages' }
}), { virtual: true });

describe('i18n config', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set fallback to English when locale is not English', async () => {
    const config = configModule as ConfigModule;
    const result = await config({ requestLocale: Promise.resolve('es') });
    
    expect(result.locale).toBe('es');
    expect(result.fallbacks).toEqual({ '*': 'en' });
  });

  it('should not set fallback when locale is English', async () => {
    const config = configModule as ConfigModule;
    const result = await config({ requestLocale: Promise.resolve('en') });
    
    expect(result.locale).toBe('en');
    expect(result.fallbacks).toBeUndefined();
  });

  it('should have an onError handler to handle missing translations', async () => {
    const config = configModule as ConfigModule;
    const result = await config({ requestLocale: Promise.resolve('es') });
    
    expect(typeof result.onError).toBe('function');
    
    // Test the onError handler with a MISSING_MESSAGE error
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    // Create error with proper Error inheritance
    const missingMessageError = new Error('test.world') as IntlError;
    missingMessageError.code = 'MISSING_MESSAGE';
    
    const returnValue = result.onError(missingMessageError);
    
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Missing translation for key: test.world in locale: es'
    );
    expect(returnValue).toBe('');
    
    // Test that other errors are rethrown
    const otherError = new Error('Some other error') as IntlError;
    otherError.code = 'OTHER_ERROR';
    expect(() => result.onError(otherError)).toThrow(otherError);
    
    consoleWarnSpy.mockRestore();
  });
}); 