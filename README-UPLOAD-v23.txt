BARAMEEL RUN — ALEXANDRIA COLLECTION 01 — UPDATE v23

WHAT THIS UPDATE FIXES
1) Screen 01 loads much faster: heavy runner preloading was removed and the start artwork now uses a compressed WebP.
2) Screen 06 now loads the optimized WebP artwork.
3) Screen 06 loads only the selected master image; the 10 lower cards no longer load 10 full-size masters.
4) Lower cards show ONLY the pieces already found. The printed card numbers 1–10 and /9 remain part of the artwork.
5) The large puzzle shows ONLY found pieces inside the 3x3 printed cells. Missing pieces remain dark/empty.
6) When all 9 pieces of the selected image are found, the 3x3 dividers disappear by switching to the complete master image, then the image itself flashes 3 times and settles.
7) Reward points animate as a fast count-up to the exact QR piece value, then briefly grow and return to normal size.
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
- assets/screen05-scanner.webp
- assets/screen06-puzzle.png
- assets/screen06-puzzle.webp
- assets/collections/collection01/collection.json
- assets/collections/collection01/thumbs/image01.webp ... image10.webp
- No 90 new thumbnail-piece files are required.
