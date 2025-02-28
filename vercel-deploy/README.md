# Vercel Deployment Files

This directory contains deployment-specific versions of files that have ESLint errors in the original versions. These files are used during the Vercel deployment process to ensure a successful build.

## Why This Exists

The original files contain unused variables that are intended for future development. These unused variables cause ESLint errors during the Vercel build process, which fails the build. Rather than removing these variables from the original files, we've created deployment-specific versions without the unused variables.

## How It Works

1. The original files are ignored during deployment using `.vercelignore`.
2. The deployment-specific versions in this directory are copied to the correct locations before the build process starts.
3. This copying is done by the `scripts/prepare-vercel-build.js` script, which is run as a `prebuild` script in `package.json`.

## Files

The following files have deployment-specific versions:

- `src/app/[locale]/services/[service]/page.tsx`
- `src/app/[locale]/team/[member]/page.tsx`
- `src/components/layout/LanguageToggle.tsx`

## Future Development

Once the unused variables are actually used in the code, the deployment-specific versions can be removed, and the original files can be used for deployment. To do this:

1. Remove the entries from `.vercelignore`
2. Remove the `prebuild` script from `package.json`
3. Delete this directory and the `scripts/prepare-vercel-build.js` script
