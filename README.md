
# Portfolio

[![Tests](https://github.com/JamieP-205/portfolio/actions/workflows/test.yml/badge.svg)](https://github.com/JamieP-205/portfolio/actions/workflows/test.yml)

The source for my portfolio website. I'm a second-year Computing Technologies student at Ulster University, and this is where I'll show the projects I've built while I apply for a 2027/28 placement.

## Status

Live at https://jamieparr.netlify.app. Netlify deploys every push to `main` automatically.

## How it's built

Plain HTML and CSS, with no framework and no build step.

## How I use AI on this project

I'm building this step by step using my own knowledge, online sources and AI, which helps explain broken code while I make the changes and commit them. Commit messages will say if Claude Code contributed to code.


## Running the tests

npm ci
npx playwright install chromium
npm test
The tests open the site in Chromium and check that it loads without errors, that every navigation link works, that nothing scrolls sideways on phone or desktop widths, that there are no automatically detectable accessibility issues in light or dark mode, and that the 404 page links home.

