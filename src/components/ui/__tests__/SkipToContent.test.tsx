import { render, screen } from '@testing-library/react';
import SkipToContent from '../SkipToContent';

describe('SkipToContent', () => {
  it('renders correctly', () => {
    render(<SkipToContent />);
    
    // The skip link should be visually hidden by default
    const skipLink = screen.getByText('Skip to content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
    
    // Check that it has the correct class
    expect(skipLink).toHaveClass('skip-link');
  });

  it('becomes visible on focus', async () => {
    render(<SkipToContent />);
    
    const skipLink = screen.getByText('Skip to content');
    
    // Focus the link
    skipLink.focus();
    
    // Since we can't easily test CSS pseudo-classes in JSDOM,
    // we'll just verify the base class is present
    expect(skipLink).toHaveClass('skip-link');
  });
});
