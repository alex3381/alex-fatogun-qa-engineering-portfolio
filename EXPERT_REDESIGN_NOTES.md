# Expert redesign notes

This version was not produced by simply adding charts to the previous portfolio. It was restructured around the way a recruiter or QA hiring manager is likely to scan evidence.

## What changed

1. **Bird Game became a real case study, not a project card.**
   - Requirements, execution, defects, Jira, automation and CI now form one continuous story.

2. **Charts are used only where they add meaning.**
   - Initial manual execution: 38 Pass, 2 Fail, 1 Blocked.
   - Historical Jira structure: 16 Stories, 7 Epics, 3 Tasks, 2 Bugs.
   - Automation: 24/24 Chromium regression + 3/3 browser compatibility = 27/27 local executions.

3. **Historical and final states are kept separate.**
   - Jira charts are explicitly dated 10 Aug 2026 and exclude later BG-29/BG-30.
   - CI is not described as the full 27/27 local automation run.

4. **Defect decisions are now a major part of the portfolio.**
   - BG-27: fixed and retested.
   - BG-28: controlled 20/20 follow-up, Not Reproducible.
   - BG-30: known/deferred technical risk.

5. **Evidence is easier to inspect.**
   - Local evidence images have a lightbox.
   - Direct links lead to requirements, test cases, Jira, defect reports, automation and test summaries.

6. **The other repositories support the main story rather than competing with it.**
   - TutorialsNinja: manual + automation.
   - EventHub: end-to-end automation.
   - Login project: manual QA deep dive.

7. **Professional presentation improvements.**
   - Recruiter-facing hero statement.
   - Cleaner navigation.
   - Stronger information hierarchy.
   - Local system fonts; no font downloads.
   - PDF and Word CV options.
   - SEO metadata, JSON-LD, robots.txt and sitemap.xml.
   - Responsive navigation and mobile layout.
   - No external JavaScript or CSS frameworks.

## Expert V3 presentation layer

The V3 build adds restrained, accessibility-aware interaction rather than decorative animation for its own sake:

- scroll progress indicator;
- animated hero grid, soft moving light and background orbs;
- gradient headline emphasis and availability pulse;
- animated evidence metrics;
- auto-looping 7-second Bird Game demo that pauses off-screen;
- sequential QA lifecycle reveal;
- staggered section entrances;
- animated chart reveals with click-to-enlarge behaviour;
- active navigation state as the reader moves through the page;
- polished hover states for project, evidence, defect and skills cards;
- motion disabled or simplified when the visitor prefers reduced motion.

The intention is to make the site feel like a modern QA/product-engineering portfolio while keeping evidence legible and employer-focused.


## V4 update
- Replaced the earlier metric-card layouts with two cleaner showcase panels based on the approved redesigned dashboard images.
- Added the new assets under `assets/images/ui-showcase/`.
- Preserved lightbox enlargement so the evidence visuals are still easy to inspect.

## V5 refinement update
- Rebalanced the hero layout so the copy block and the evidence snapshot align more cleanly.
- Rebuilt the Bird Game case-study hero into two matching case cards: a live demo card and a project snapshot card.
- Improved spacing, padding, and caption alignment around the dashboard images.
- Corrected the live-demo presentation so the video sits inside a more deliberate framed panel instead of feeling oversized next to the metrics panel.
- Added responsive refinements so the aligned card system holds together better on tablet and mobile widths.
