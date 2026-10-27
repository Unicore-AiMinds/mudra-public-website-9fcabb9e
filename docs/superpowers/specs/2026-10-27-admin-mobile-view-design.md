# Website admin (Mudra Admin): phone layout (design)

**Date:** 2026-10-27
**Branch:** `feature/admin-mobile-view` (from `Demo`, the code the live sites run)
**Mockup (approved 2026-10-27):** `2026-10-27-admin-mobile-view-mockups.html` (same folder),
screens 1, 2–2d, 3–12, plus sections C (edge cases) and D (bugs, decided later).

## Why

The clinic wants to use the website admin (`/admin`) on phones. Today the data pages' table is
800 px wide, so Status, View and Delete are off-screen (Delete at x=929 on a 384 px phone), and the
Submission Details popup's Email runs into Phone. Login, side menu, dashboard and filters already
fit a phone.

## Rules

- Phone layout below **1024 px** (the width where the admin's side menu already folds away,
  Tailwind `lg`). **1024 px and wider must stay pixel- and behaviour-identical.**
- The website admin keeps its own look and words (Inter, Playfair, slate, Dental teal `#0a7490`,
  Meditouch purple `#5A2C8B`). Only the layout changes.
- **No bug fixes in this work** (user: "first we'll build mobile version, then decide about
  bugs"). Section D of the mockup stays open. Screens drawn "with the bug fixed" (dashboard Recent
  Submissions, red Delete button) keep today's behaviour for now.
- DEV database only for local work; checks never save (writes intercepted).

## What changes on phones (<1024 px)

1. **Data pages** (Dental Metrix / Meditouch, `AdminDataTable`):
   - the table becomes one card per submission: name as title with the status pill (same select,
     same colours, same confirmation), then Date (`MMM dd, yyyy · HH:mm`), Email, Phone (tappable
     `tel:` link, none when empty), Service; View and Delete share the bottom row;
   - a **Sort by** select above the cards: Date (Newest/Oldest First), Name (A-Z/Z-A),
     Service (A-Z/Z-A), Status (A-Z/Z-A), setting the existing `sortField` / `sortDirection`;
     default unchanged; shown whenever the page has data (kept even when the date filter empties the current page, so the sort can be changed back; review finding);
   - pagination: Previous · "`{currentPage} of {totalPages}`" · Next (only when more than one
     page, as today);
   - when there are no cards: "No submissions found." / while loading: "Loading submissions..."
     (phone only; desktop unchanged);
   - header, Export to Excel, search and filters unchanged (already stacked).
2. **Submission Details popup:** fields one per line on phones; phone number tappable.
3. **Dashboard:** layout unchanged; the Status Overview bar chart shows all 5 labels on phones
   (smaller label size, no skipped labels); the two lists let long names/services wrap.
4. **Top bar:** "Welcome back!" and the date are centred on phones/tablets (user request); the ☰ button stays on the left.
5. Login, side menu, toasts, confirmation popups: unchanged.

## Bug fixes (step 1, approved 2026-10-27; desktop and phones)

Fixed, each with a live check that failed first: #1 blank data page with more than 10 submissions
(`startIndex` defined; "Showing x to y of z" uses the real total), #2 Delete popup button now red
"Delete", #3 dashboard Recent Submissions service line and clinic icon, #4 page goes back to 1 on
search / status / per-page change, #5 long email wraps in the details popup, #6 popup backgrounds
cover the whole screen (parent `space-y-6` margin removed with `!mt-0`), #8 Conversion Rate 0%
instead of NaN%, #10 load errors shown (data layer now passes errors on; data pages show "Failed to
fetch submissions" and clear old rows; dashboard shows its existing error screen with Retry),
#11 (quick part) "Demo Credentials" box removed from the login page.

## Bug fixes (step 2, approved 2026-10-27; desktop and phones)

Fixed, each with a live check that failed first: #7 dashboard box renamed "Scheduled" (it counts all
scheduled enquiries; no scheduled-on date exists), #9 date filter (Today / Last 7 Days / Last 30 Days)
is applied by the API over all submissions before paging, and changing it goes back to page 1,
heading "x of y submissions" uses the real total, a failed status save keeps the old status,
older search requests are ignored when a newer one has started.

## Still open

- #11 / #12 security: password still in the website code; the public key can read, change and
  delete enquiries (the ERP uses the same key, so this needs a separate server-side design).

## Verification

Live browser checks at 360, 384, 412, 820, 1023 px (no sideways scroll, every card control
reachable, sort, pages with fake rows, details popup layout, chart labels; status drop-down on cards is labelled "Status for <name>") and a desktop pixel
comparison of every admin screen at 1440 and 1024 px against `Demo`: identical.
