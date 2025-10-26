#!/bin/bash
cd "c:\Users\100acress.com\Documents\GitHub\Dualis"

# Configure git user
git config user.name "vibhu2208"
git config user.email "vibhu2208@github.com"

# Add remote origin
git remote add origin https://github.com/vibhu2208/Dualis.git

# Push to GitHub
git branch -M main
git push -u origin main
