# Validation — 2026-09-28

- `node --check app.js`: passed.
- `node --test tests/site.test.cjs`: 3 passed (anchors/assets, project mapping, identity/accessibility baseline).
- Desktop browser: all 4 projects, Backend/C++/All filters, all 4 project dialogs and repository destinations checked.
- Escape closes the native dialog; focus returns to the project trigger.
- Canvas pause and shape switch checked.
- Mobile: 390px and 320px widths checked with no horizontal overflow.
- Mobile navigation opens and closes after following an anchor.
- Email copy reports success in the browser; the implementation also displays a manual-copy fallback on failure.
- Browser error log was empty during verification.

Reduced-motion and offscreen/hidden-document pause are implemented. No exhaustive assistive-technology audit or device-farm performance certification is claimed. Project graphics are illustrations, not real-time application data.
