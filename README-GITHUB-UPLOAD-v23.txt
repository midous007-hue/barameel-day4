BARAMEEL RUN — ALEXANDRIA COLLECTION / UPDATE v23

THIS UPDATE FIXES
1. Faster first screen:
   - screen01-start.webp replaces the heavy PNG in index.html.
   - Removed the old preload of all six runner artworks from Screen 01.
2. Faster Collection screen:
   - screen06-puzzle.webp is a lightweight version of the supplied final Screen 06 artwork.
   - The 10 lower collection cards now use tiny WebP thumbnails instead of loading all 10 full master PNGs.
   - Only the selected image's full master is used for the large 3x3 puzzle.
3. Large puzzle:
   - Only QR-discovered pieces are colored/visible.
   - Undiscovered pieces stay dark.
   - Gold separators remain visible between pieces.
   - At 9/9 the three image-only flashes run, then the separators disappear and the complete master image is revealed.
   - No rotating gold frame.
4. Lower 10 images:
   - Each card is a 3x3 mosaic.
   - Unfound pieces are dark/desaturated.
   - Found pieces become full-color in their exact positions.
   - Each card keeps its X/9 counter.
5. Reward points:
   - The last scanned piece's points animate upward rapidly to the exact value.
   - The number briefly enlarges and returns to normal size.
6. Buttons on Screen 06:
   - MY REWARDS -> screen04.html (current player dashboard).
   - SCAN MORE! -> screen05.html.
   - NICE ONE is no longer used as the action.
7. Player dashboard:
   - YOUR POINTS, YOUR MARKS, THIS WEEK and CHECKPOINTS are populated from local game state.
   - A new unique QR piece increments CHECKPOINTS once.
8. QR logic remains:
   collection01|imageXX|pieceYY
   and compatible imageXX-pieceYY variants are accepted.

GITHUB UPLOAD

ROOT — replace these files:
- index.html
- screen04.html
- screen05.html
- screen06.html
- app.js
- styles.css
- sw.js

ROOT — add/replace these assets:
- assets/screen01-start.webp
- assets/screen06-puzzle.webp

COLLECTION — replace:
- assets/collections/collection01/collection.json

COLLECTION — add:
- assets/collections/collection01/thumbs/image01-thumb.webp
- assets/collections/collection01/thumbs/image02-thumb.webp
- assets/collections/collection01/thumbs/image03-thumb.webp
- assets/collections/collection01/thumbs/image04-thumb.webp
- assets/collections/collection01/thumbs/image05-thumb.webp
- assets/collections/collection01/thumbs/image06-thumb.webp
- assets/collections/collection01/thumbs/image07-thumb.webp
- assets/collections/collection01/thumbs/image08-thumb.webp
- assets/collections/collection01/thumbs/image09-thumb.webp
- assets/collections/collection01/thumbs/image10-thumb.webp

DO NOT DELETE
- all existing screen02-*.png / screen03-*.png / screen04-*.png runner artwork
- assets/screen05-scanner.png
- assets/collections/collection01/masters/image01-master.png ... image10-master.png
- assets/collections/collection01/qr-codes/ (all 90 QR PNGs)
- existing audio files

OPTIONAL CLEANUP
- Delete the accidental duplicate assets/screen06-puzzle.png.png if it still exists.
- The old assets/screen06-puzzle.png can remain; v23 does not reference it.

IMPORTANT
The 10 masters remain PNG and their names do NOT change.
The new thumbs are only performance helpers; they are not replacement masters.

AFTER COMMIT
1. Wait for GitHub Pages to publish.
2. On the phone, hard-refresh the site.
3. If the old Screen 06 still appears, close the tab completely and reopen the site once; v23 has a new service-worker cache name.
4. Test with the existing QR PNGs from collection01/qr-codes.
