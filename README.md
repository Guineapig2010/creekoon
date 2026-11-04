# Creek Rolling Tycoon

Make tennis balls, roll them down a real-scale 3D creek, and turn every finish into cash.
Start with one ball and a wooden chute. End with a Turbo line feeding a creek full of balls
from the Upper Gorge, 98 m upstream of the same finish gate.

**make → roll → finish → earn → upgrade**

## Play

The game is a static web page. The prebuilt bundle in `dist/` is committed, so nothing needs
to be installed to play.

Serve the folder with any static file server, for example:

```bash
node tools/serve.mjs
```

Then open <http://localhost:8080/>. You can also use `python3 -m http.server 8080`.
Opening `index.html` straight from disk (`file://`) works in most browsers too, because the
bundle is a single classic script.

Progress saves to your browser's local storage every few seconds, after every purchase,
and when the tab is hidden or closed.

### Controls

| Action | Mouse / keyboard | Touch |
|---|---|---|
| Make & Roll | click the big ball button, or **Space** | tap the button |
| Pan | drag | one-finger drag |
| Orbit / tilt | right-drag (or Shift-drag) | two-finger twist / drag |
| Zoom | mouse wheel | pinch |
| Follow a ball | click it, or **F** (follow) / **C** (close-up) | tap it, or the buttons |
| Views | **H** home, **O** overview, **B** bench, **G** finish gate | buttons, top right |

The shop and launch points are in the right-hand panel (on a phone, the **Shop** button opens
it). The ⚙ menu has sound, automation, graphics quality and save reset. Orange stakes along the
creek mark spots where creek equipment can go. Tap one to open its shop entry.

## What's in the game

- **One continuous creek.** It runs 98.5 m from the Upper Gorge down to the permanent finish
  gate. There are six launch points: Old Rolling Grounds (free), Waterfall Run ($350),
  Continental Shelf ($1,500), Crawfish Springs ($6,500), Alder Bend ($22,000) and Upper Gorge
  ($75,000). A ball launched further upstream rolls through every section below it and must
  pass each downstream launch marker as a checkpoint. Base payouts are $10, $30, $65, $120,
  $220 and $400.
- **Real scale.** Balls are 6.7 cm and 58 g, with felt, a curved seam, spin, and felt that
  darkens when wet. The creek, chutes and machines are built to the same scale.
- **Physics.** A fixed 120 Hz step with sub-stepping for fast balls, and collision against the
  same heightfield and rocks you see. Rolling resistance and bounce vary by surface: gravel,
  rock, sand, wood, the rubber mat. Buoyancy uses the submerged spherical cap, with drag
  relative to a local flow field. That field covers chutes, slow bank pockets, eddies behind
  rocks, plunge-pool rollers, spring boils and the Folk Draft downdraft at the Shelf.
- **30 upgrades** in four shop tabs: Factory, Creek, Balls and Finish. Each one shows its
  price, prerequisite and effect, and each installs a visible model or animation. Ball
  upgrades only apply to balls made after you buy them.
- **Live status.** "Press waiting", "Hopper empty" and "Creek backed up" appear next to the
  relevant machine, and the shop highlights the upgrade that would help (it never buys it for
  you).
- **Moving the workbench.** Switching launch points sends it along the bank on a cart. The
  hopper contents are kept and launches pause during the move. Balls already in the creek keep
  their original route and payout.
- **Synthesised sound.** Wood knock, rock tap, splash, gate click and creek ambience, with
  per-sound voice limits so high throughput stays listenable.

## Code layout

```
index.html, style.css      page shell and HUD styling
dist/game.js               prebuilt bundle (npm run build)
src/main.js                boot, game loop, save/load wiring
src/core/                  simulation — no DOM, runs headless in Node
  config.js                launch points, the 30 upgrades, ball specs, factory numbers
  creek.js                 channel geometry, heightfield, water level, flow field, rocks, colliders
  physics.js               ball dynamics, contacts, ball-to-ball collisions
  game.js                  economy, press/feeder/basket, checkpoints, payouts, stalls, save format
src/render/                three.js renderer (terrain, water, falls, balls, equipment, effects, camera)
src/audio.js               WebAudio sound effects
src/ui.js                  HUD, shop, launch points, settings
tools/playtest.mjs         headless run of the delivery checklist
tools/linestats.mjs        per-section timing / loss stats for a production line
tools/spots.mjs            trouble-spot comparison with and without each creek upgrade
tools/serve.mjs            tiny static server
```

## Development

```bash
npm install
```

```bash
npm run build
```

The second command rebuilds `dist/game.js` (minified, with a source map); `npm run dev`
rebuilds on every change.

```bash
npm run playtest
```

This runs the headless playtest (about a minute; `node tools/playtest.mjs quick` is faster).
It drives the same simulation the browser runs and checks:

1. The first ball pays exactly $10. Three finishes buy the Auto Press, and full basic
   automation arrives in about 20 s of ordinary clicking.
2. The press and feeder stop and restart correctly with a full or empty hopper. Jams clear
   by themselves, and purchases switch on their equipment.
3. Every launch point reaches the original gate through every section below it, passes its
   checkpoints, pays once, and hits its target time. Filled-line cash per minute rises with
   each longer start.
4. Switching to a short route mid-flight: no launches during the cart move, and balls already
   rolling keep their original route and payout.
5. Glancing rock hits, waterfall splashes, eddies, and balls bumping in narrow runs. Every
   creek upgrade is measured against the stock creek, by losses or by average time through
   its section.
6. Save and reload with balls moving, after a purchase, and during a cart move, with no
   duplicate payouts. Also measures physics cost on the full Turbo line (about 110 balls in
   flight, roughly 25 ms of CPU per simulated second).

Graphics quality (⚙ menu) changes the terrain and water mesh resolution, shadows, particle
counts and pixel ratio. Physics and payouts are identical at every setting.
