#!/bin/bash

# This script creates a small change to force Vercel to deploy the latest commit

# Create a timestamp file
echo "Deployment trigger: $(date)" > .vercel-deploy-trigger

# Add, commit, and push the change
git add .vercel-deploy-trigger
git commit -m "Force Vercel deployment with latest changes"
git push origin main

echo "Deployment trigger pushed to GitHub. Vercel should now deploy the latest version."
