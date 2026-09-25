BARAMEEL RUN — NEW 01–06 FIXED BUILD

Upload the artwork into /assets using EXACTLY these names:

SCREEN 01
screen01-start.png

SCREEN 02 — 6 runner artworks
screen02-brona.png
screen02-chiller.png
screen02-dreamer.png
screen02-racer.png
screen02-rookie.png
screen02-skater.png

SCREEN 03 — 6 runner artworks
screen03-brona.png
screen03-chiller.png
screen03-dreamer.png
screen03-racer.png
screen03-rookie.png
screen03-skater.png

SCREEN 04 — 6 runner artworks
screen04-brona.png
screen04-chiller.png
screen04-dreamer.png
screen04-racer.png
screen04-rookie.png
screen04-skater.png

SCREEN 05
screen05-scanner.png

SCREEN 06
screen06-puzzle.png

COLLECTION 01 is already included in this package:
assets/collections/collection01/collection01-master.png
assets/collections/collection01/collection01.json
assets/collections/collection01/pieces/collection01-piece-01.png ... 09.png

AUDIO
The previous BARAMEEL RUN reward-levelup sound is included at:
audio/reward-levelup.mp3
Tap/back/select/confirm/scan/error effects are reproduced with the same browser-generated style used in the previous build, so no extra upload is required for those effects.

FIXES IN THIS BUILD
1. Screen 02 runner selection now has a transparent hotspot over the printed CHOOSE YOUR RUNNER/confirm area and actually opens screen03.html.
2. Screen 01 nickname field is positioned over the actual blank typing area. The printed TYPE YOUR NICKNAME artwork remains visible until the user types. As soon as a name is entered, the baked text is covered and the entered name is centered in a matching handwritten style.
3. Audio is initialized from a user gesture and the old tap/success sound pattern is restored; the reward-levelup MP3 is also included for successful QR rewards.
4. Only screens 01–06 are included. No screens 07–10.
5. Service-worker cache version is bumped to v4 to prevent stale GitHub Pages files.

IMPORTANT
Do not rename any artwork files. The HTML references these exact filenames.
