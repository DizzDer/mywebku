# Design notes

## Direction

An editorial portfolio rather than a dashboard: warm paper, near-black type, signal orange, large typographic rhythm and restrained rules. The identity uses the existing DizzDer handle and the name/location already in the original portfolio. No invented clients, employment history, ratings or years of experience.

## References studied

- [Bruno Simon](https://bruno-simon.com/): a memorable interaction can itself demonstrate craft. Here that becomes a small, original Canvas study, with an immediate path to projects instead of a game gate.
- [Brittany Chiang](https://brittanychiang.com/): readable project evidence and clear routes to the work. The portfolio keeps repository links and concrete implementation notes.
- [Rauno Freiberg](https://rauno.me/): bold typographic composition and attention to interaction details. This implementation has its own layout, palette and geometry.

No code, screenshots or visual assets were copied from the reference sites.

## Interaction rules

Content is visible immediately; no loading screen, scroll hijacking or custom cursor. The sculpture pauses offscreen and when the document is hidden. Reduced motion starts it paused. It can be changed with buttons, so dragging is not required. Native dialog supplies modal focus containment and Escape; closing restores focus to the opening button. Filters use real buttons and announce result counts.

The project illustrations are original CSS/SVG diagrams. They are conceptual illustrations, not claims about live service metrics. Details identify the scope and limits of each project.

## Scope and performance

No framework, dependency loader, analytics, API keys or contact backend. Canvas caps device-pixel ratio at 2 and uses a small mesh. The content does not depend on Canvas. Fonts have system fallbacks; the main document and all local assets are static and use relative paths for GitHub Pages.
