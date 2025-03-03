import { render } from '@testing-library/react';
import SchemaScript from '../SchemaScript';

describe('SchemaScript', () => {
  it('renders correctly with schema data', () => {
    const testSchema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Test Organization',
      url: 'https://example.com',
    });

    const { container } = render(<SchemaScript schema={testSchema} />);
    
    // Find the script element
    const scriptElement = container.querySelector('script');
    
    // Check that the script element exists
    expect(scriptElement).toBeInTheDocument();
    
    // Check that it has the correct type
    expect(scriptElement).toHaveAttribute('type', 'application/ld+json');
    
    // Check that it has the suppressHydrationWarning attribute
    expect(scriptElement).toHaveAttribute('suppressHydrationWarning', '');
    
    // Check that it contains the schema data
    expect(scriptElement?.innerHTML).toContain('Test Organization');
    expect(scriptElement?.innerHTML).toContain('https://example.com');
  });

  it('handles empty schema data gracefully', () => {
    const { container } = render(<SchemaScript schema="" />);
    
    // Find the script element
    const scriptElement = container.querySelector('script');
    
    // Check that the script element exists even with empty data
    expect(scriptElement).toBeInTheDocument();
    
    // Check that it has the correct type
    expect(scriptElement).toHaveAttribute('type', 'application/ld+json');
    
    // Check that it has the suppressHydrationWarning attribute
    expect(scriptElement).toHaveAttribute('suppressHydrationWarning', '');
    
    // Check that it contains empty content
    expect(scriptElement?.innerHTML).toBe('');
  });
});
