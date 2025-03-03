# Vercel Deployment Files

This directory contains deployment-specific versions of files that have ESLint errors in the original versions. These files are used during the Vercel deployment process to ensure a successful build.

## Why This Exists

The original files contain unused variables that are intended for future development. These unused variables cause ESLint errors during the Vercel build process, which fails the build. Rather than removing these variables from the original files, we've created deployment-specific versions without the unused variables.

## Next.js 15 Promise-Based Params Issue

With the upgrade to Next.js 15 and React 19, there's a breaking change in how page parameters are handled. This directory also contains fixed versions of files that are compatible with Next.js 15's Promise-based params.

### The Problem

In Next.js 15, both `params` and `searchParams` are passed as Promises that need to be awaited. This is a change from previous versions where they were regular objects. This leads to TypeScript errors during build like:

```
Type error: Type 'Props' does not satisfy the constraint 'PageProps'.
  Types of property 'params' are incompatible.
    Type '{ locale: string; service: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
```

### The Solution

To fix this issue, the following changes are needed in page components:

1. Update the `Props` type definition to use Promise-based params:

```typescript
// Before
type Props = {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
};

// After
type Props = {
  params: Promise<{ locale: string }>;
};
```

2. Make the page component async and await the params:

```typescript
// Before
export default function SomePage({ params: { locale } }: Props) {
  // ...
}

// After
export default async function SomePage({ params }: Props) {
  const { locale } = await params;
  // ...
}
```

3. For dynamic routes (like `[service]` or `[member]`), update the Props type to include all route parameters:

```typescript
type Props = {
  params: Promise<{ locale: string; service: string }>;
};
```

4. Replace client-side hooks like `useTranslations` with server-side alternatives like `getTranslations` for async components:

```typescript
// Before
const t = useTranslations('namespace');

// After
const t = await getTranslations({ locale, namespace: 'namespace' });
```

## Files

The following files have deployment-specific versions:

- `src/app/[locale]/page.tsx` - Fixed Promise-based params
- `src/app/[locale]/about/page.tsx` - Fixed Promise-based params
- `src/app/[locale]/contact/page.tsx` - Fixed Promise-based params
- `src/app/[locale]/resources/page.tsx` - Fixed Promise-based params
- `src/app/[locale]/services/page.tsx` - Fixed Promise-based params
- `src/app/[locale]/services/[service]/page.tsx` - Fixed dynamic route with Promise-based params
- `src/app/[locale]/team/page.tsx` - Fixed Promise-based params
- `src/app/[locale]/team/[member]/page.tsx` - Fixed dynamic route with Promise-based params
- `src/app/[locale]/legal/accessibility/page.tsx` - Fixed Promise-based params
- `src/app/[locale]/legal/disclaimer/page.tsx` - Fixed Promise-based params
- `src/app/[locale]/legal/privacy/page.tsx` - Fixed Promise-based params
- `src/app/[locale]/legal/terms/page.tsx` - Fixed Promise-based params
- `src/app/[locale]/locations/page.tsx` - Fixed Promise-based params
- `src/components/layout/LanguageToggle.tsx`
