import { defaultImageLoader, shouldLazyLoad, generateSrcSet } from '../imageLoader';

describe('imageLoader utilities', () => {
  describe('defaultImageLoader', () => {
    it('returns CDN URLs unchanged', () => {
      const cdnUrl = 'https://cdn.example.com/image.jpg';
      expect(defaultImageLoader({ src: cdnUrl, width: 800 })).toBe(cdnUrl);
      
      const contentfulUrl = 'https://images.ctfassets.net/abc123/image.jpg';
      expect(defaultImageLoader({ src: contentfulUrl, width: 800 })).toBe(contentfulUrl);
    });

    it('adds width and quality parameters to local images', () => {
      const localImage = '/images/hero.jpg';
      const result = defaultImageLoader({ src: localImage, width: 800, quality: 90 });
      expect(result).toBe('/images/hero.jpg?w=800&q=90');
    });

    it('uses default quality of 75 if not specified', () => {
      const localImage = '/images/hero.jpg';
      const result = defaultImageLoader({ src: localImage, width: 800 });
      expect(result).toBe('/images/hero.jpg?w=800&q=75');
    });

    it('returns other URLs unchanged', () => {
      const externalUrl = 'https://example.com/image.jpg';
      expect(defaultImageLoader({ src: externalUrl, width: 800 })).toBe(externalUrl);
    });
  });

  describe('shouldLazyLoad', () => {
    it('returns false for high importance images', () => {
      expect(shouldLazyLoad('high')).toBe(false);
    });

    it('returns true for medium importance images', () => {
      expect(shouldLazyLoad('medium')).toBe(true);
    });

    it('returns true for low importance images', () => {
      expect(shouldLazyLoad('low')).toBe(true);
    });
  });

  describe('generateSrcSet', () => {
    it('generates correct srcSet string for multiple widths', () => {
      const src = '/images/hero.jpg';
      const widths = [320, 640, 960, 1280];
      const result = generateSrcSet(src, widths, 80);
      
      const expected = '/images/hero.jpg?w=320&q=80 320w, /images/hero.jpg?w=640&q=80 640w, /images/hero.jpg?w=960&q=80 960w, /images/hero.jpg?w=1280&q=80 1280w';
      expect(result).toBe(expected);
    });

    it('uses default quality of 75 if not specified', () => {
      const src = '/images/hero.jpg';
      const widths = [320, 640];
      const result = generateSrcSet(src, widths);
      
      const expected = '/images/hero.jpg?w=320&q=75 320w, /images/hero.jpg?w=640&q=75 640w';
      expect(result).toBe(expected);
    });

    it('works with CDN URLs', () => {
      const src = 'https://cdn.example.com/image.jpg';
      const widths = [320, 640];
      const result = generateSrcSet(src, widths);
      
      const expected = 'https://cdn.example.com/image.jpg 320w, https://cdn.example.com/image.jpg 640w';
      expect(result).toBe(expected);
    });
  });
});
