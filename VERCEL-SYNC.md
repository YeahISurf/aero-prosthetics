# Vercel Deployment Synchronization

This project uses a special deployment process with Vercel that requires keeping files in sync between the main source code and deployment-specific versions.

## Understanding the Problem

The project uses two sets of files:
1. **Source files** in the `src/` directory - These are used for local development
2. **Vercel-specific files** in the `vercel-deploy/` directory - These are copied to replace source files during Vercel deployment

When you run `npm run dev` locally, you're using the files in the `src/` directory. But when you deploy to Vercel, the `prebuild` script replaces some files with versions from the `vercel-deploy/` directory.

This can cause inconsistencies if you update files in `src/` but don't update their counterparts in `vercel-deploy/`.

## Solution: Automatic Synchronization

We've added a synchronization script to keep both sets of files in sync:

### Available Commands

- `npm run sync-vercel` - Updates files in `vercel-deploy/` with your latest changes from `src/`
- `npm run check-sync` - Checks which files need to be synchronized without making changes

### Workflow

Follow this workflow to ensure your changes appear properly on both local development and Vercel deployment:

1. Make changes to files in the `src/` directory as normal
2. Test locally with `npm run dev`
3. Before deploying, run `npm run sync-vercel` to update the Vercel-specific files
4. Commit all changes (both in `src/` and `vercel-deploy/`)
5. Push to deploy on Vercel

### Automatic Checking

A Git pre-push hook will automatically check if files are in sync before pushing. If any files need synchronization, the push will be rejected with instructions.

## Which Files Need Synchronization

The files that require synchronization are defined in `scripts/prepare-vercel-build.cjs`. The current list includes:

- Various page components in `src/app/[locale]/`
- Layout components
- And more

If you add new files to this list in `prepare-vercel-build.cjs`, they will automatically be included in the synchronization process.

## Why This Setup?

This setup helps maintain ESLint compliance during the Vercel build process while allowing for more flexible development locally. 