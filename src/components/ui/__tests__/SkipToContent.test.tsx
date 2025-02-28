import { render, screen } from '@testing-library/react';
import SkipToContent from '../SkipToContent';

describe('SkipToContent', () => {
  it('renders correctly', () => {
    render(<SkipToContent />);
    
    // The skip link should be visually hidden by default
    const skipLink = screen.getByText('Skip to content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
    
    // Check that it has the sr-only class for screen reader accessibility
    expect(skipLink).toHaveClass('sr-only');
  });

  it('becomes visible on focus', async () => {
    render(<SkipToContent />);
    
    const skipLink = screen.getByText('Skip to content');
    
    // Focus the link
    skipLink.focus();
    
    // Check that it has the focus class that makes it visible
    expect(skipLink).toHaveClass('focus:not-sr-only');
  });
});
