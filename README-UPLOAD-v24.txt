BARAMEEL RUN — ALEXANDRIA COLLECTION 01 — UPDATE v24

WHAT THIS UPDATE FIXES
1) Screen 01 loads faster on mobile: a dedicated 471px-wide mobile WebP is used below 600px, while the desktop artwork remains unchanged.
2) Screen 06 uses a dedicated mobile WebP below 600px and keeps the optimized desktop WebP above that size.
3) Screen 06 no longer swaps in a full master image. The 3x3 puzzle is always the real grid, and only discovered pieces are layered into their own cells using the existing 360px thumbnails. This also avoids loading large master images.
4) Lower cards show ONLY the QR-discovered pieces. The printed card frames/numbers remain part of the artwork, while the piece dividers stay visible because the overlay has real 3x3 cells with small gaps.
5) The large puzzle shows ONLY found pieces inside the 3x3 printed cells. Missing pieces remain completely empty, so the original printed dividers stay visible.
6) When all 9 pieces are found, the 3x3 structure remains visible. Only the discovered image content flashes three times, then settles; no gold completion ring and no full-image swap are used.
7) Reward points animate as a fast count-up to the exact QR piece value, then briefly grow and return to normal size, with the label POINTS EARNED.
8) “SCAN MORE!” is now an active hotspot that returns to the scanner.
9) “MY REWARDS” is an active hotspot to the the live run dashboard (Screen 04).
10) Collection JSON remains the source of truth for image/piece/rarity/points data.

IMPORTANT GITHUB UPLOAD
Do NOT delete or replace your existing 18 runner images.
Do NOT delete the 10 master images.
Do NOT delete the 90 QR-code PNGs.
Do NOT delete existing collection data except the files explicitly included in this update.

FILES TO REPLACE AT REPOSITORY ROOT
- index.html
- screen05.html
- screen06.html
- app.js
- styles.css
- sw.js

FILES TO ADD/REPLACE UNDER assets/
- assets/screen01-start.webp
- assets/screen01-start-mobile.webp
- assets/screen05-scanner.webp
- assets/screen06-puzzle.png
- assets/screen06-puzzle.webp
- assets/screen06-puzzle-mobile.webp
- assets/collections/collection01/collection.json
- assets/collections/collection01/thumbs/image01.webp ... image10.webp
- No 90 new thumbnail-piece files are required.
