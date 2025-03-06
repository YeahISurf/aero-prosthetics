import { render, screen } from '@testing-library/react';
import OptimizedImage from '../OptimizedImage';
import * as imageLoader from '@/lib/performance/imageLoader';

// Mock the imageLoader functions
jest.mock('@/lib/performance/imageLoader', () => ({
  defaultImageLoader: jest.fn(({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`),
  shouldLazyLoad: jest.fn(),
  generateSrcSet: jest.fn(),
}));

// Mock the IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  disconnect: jest.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

describe('OptimizedImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct props', () => {
    // Mock shouldLazyLoad to return false (high priority image)
    (imageLoader.shouldLazyLoad as jest.Mock).mockReturnValue(false);

    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={400}
        height={300}
        importance="high"
        quality={90}
      />
    );

    // Check if the image is rendered with correct props
    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
    
    // Check if the container has the correct dimensions
    const container = image.parentElement;
    expect(container).toHaveStyle({ width: '400px', height: '300px' });
  });

  it('applies lazy loading for medium importance images', () => {
    // Mock shouldLazyLoad to return true (medium priority image)
    (imageLoader.shouldLazyLoad as jest.Mock).mockReturnValue(true);

    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={400}
        height={300}
        importance="medium"
      />
    );

    // Check if IntersectionObserver was used
    expect(mockIntersectionObserver).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    (imageLoader.shouldLazyLoad as jest.Mock).mockReturnValue(false);

    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={400}
        height={300}
        className="custom-class"
      />
    );

    // Check if the image has the custom class (not the container)
    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('class', expect.stringContaining('custom-class'));
  });

  it('shows placeholder while image is loading', () => {
    (imageLoader.shouldLazyLoad as jest.Mock).mockReturnValue(false);

    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={400}
        height={300}
        progressiveLoading={true}
      />
    );

    // Check if the container is present
    const container = screen.getByAltText('Test image').parentElement;
    expect(container).toBeInTheDocument();
    
    // Since isLoaded state starts as false, there should be a placeholder div
    // But we need to query it differently since it's using dynamic classes
    const placeholderDiv = container?.querySelector('div');
    expect(placeholderDiv).not.toBeNull();
    expect(placeholderDiv).toBeInTheDocument();
  });
});
