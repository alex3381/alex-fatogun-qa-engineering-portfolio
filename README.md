# Alex Fatogun - QA Engineering Portfolio

A recruiter-focused, evidence-led QA portfolio designed for GitHub Pages.

## Purpose

This version is intentionally structured as a professional QA case-study website rather than a generic project gallery. The Bird Game project is the featured end-to-end case study, with execution metrics, defect decisions, Jira evidence, Playwright automation and CI presented separately so the claims remain accurate and defensible.

## Main sections

- Recruiter-facing hero and portfolio evidence snapshot
- QA working approach
- Bird Game end-to-end QA case study
- Manual execution, Jira and automation charts
- Defect stories: BG-27, BG-28 and BG-30
- Jira and Playwright evidence
- TutorialsNinja and EventHub projects
- Evidence gallery with lightbox
- QA skills and software-development background
- Contact and CV links

## Important accuracy notes

- Bird Game local automation: 24/24 Chromium regression checks + 3/3 browser compatibility checks = 27/27 local executions passed.
- GitHub Actions CI is described separately and is not represented as the full 27/27 local run.
- Historical Jira metrics are labelled as a 10 August 2026 snapshot covering BG-1 to BG-28. Later items BG-29 and BG-30 are not retroactively added to that historical chart.
- BG-30 remains a known/deferred technical issue.
- TutorialsNinja evidence gaps remain visible rather than being presented as complete.

## Local preview

From this folder, run one of the following:

```powershell
python -m http.server 8000
```

or, if Node.js is installed:

```powershell
npx http-server . -p 8000
```

Then open:

```text
http://localhost:8000
```

## GitHub Pages

Recommended repository name:

```text
alex3381.github.io
```

After pushing the contents of this folder to the `main` branch, GitHub Pages can serve the site at:

```text
https://alex3381.github.io/
```

## Files

```text
index.html
favicon.svg
.nojekyll
robots.txt
sitemap.xml
assets/
  css/styles.css
  js/main.js
  documents/
  icons/
  images/
  videos/
```

The website uses local system fonts only; no font files or Google Fonts dependency are required.

## Presentation and motion

The Expert V3 build uses restrained animation to support scanning and presentation rather than distract from the QA evidence:

- animated hero grid and soft pointer-follow light;
- scrolling progress indicator;
- headline shimmer and availability pulse;
- animated metric count-up;
- auto-looping Bird Game demo that pauses off-screen;
- sequential QA lifecycle reveal;
- staggered section entrances;
- chart reveal animation and click-to-enlarge interaction;
- active navigation highlighting;
- polished hover states across project, defect, evidence and skills cards.

Visitors who enable `prefers-reduced-motion` receive a simplified/static experience.
