# Creek Rolling Tycoon

Make tennis balls, roll them down a real-scale 3D creek, and turn every finish into cash.
Start with one ball and a wooden chute. End with fourteen factories feeding a creek full of
balls from the Cold Spring Headwaters, 246 m upstream of the same finish gate.

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

You walk the creek in first person. Every open launch site is its own factory that keeps
running while you walk, look at the map or follow a ball.

| Action | Mouse / keyboard | Touch |
|---|---|---|
| Walk / run | **WASD** or arrows, **Shift** to run | left stick (push fully to run) |
| Look | mouse (click the view to capture it) or drag | drag on the right side |
| Interact (factory, map board, finish station, for-sale stake, field note) | **E** | **E** button |
| Make & Roll at the factory beside you | **Space** or the ball button | ball button |
| North-up overhead map | **M** (click a site label to manage it) | **Map** button |
| Follow a ball / close-up | **F** / **C** (the ball nearest the centre of view) | buttons, top right |
| Back to where you were standing | **Esc** | **← Back** |
| Walk back to the selected factory | **H** | **Factory** button |
| Quiet watch view | **Q** | **Watch** button |

The right-hand panel has four tabs: **Shop** (Factory, Logistics, Creek, Balls, Finish,
Controls; factory items are bought for one site, chosen at the top), **Sites** (every launch
site with its counts, recipe, pause/drain/release switches and unlock price), **Network** (flow
monitor, alerts, split timers, Bank Workshop routes, gate, presets, efficiency bench, before /
after measurements) and **Orders**. The finish station holds the read-only **Creek League
Archive**, the **Field Notes** and your **Factory Records**. The ⚙ menu has sound, automation,
head bob, look sensitivity, field of view, graphics quality, feature help and a two-step save
reset. Add `?quality=low` to the URL to force low graphics on a slow device.

## Code layout

```
index.html, style.css      page shell and HUD styling
dist/game.js               prebuilt bundle (npm run build)
data/*.geojson             field-map sources (creator traces, simplified NHD main channel)
src/main.js                boot, save migration and backup, game loop
src/core/                  simulation — no DOM, runs headless in Node
  config.js                launch sites, reaches, recipes, orders, all upgrades, factory numbers
  creek.js                 channel geometry, heightfield, water, flow field, wind, rocks, colliders
  physics.js               ball dynamics, contacts, ball-to-ball collisions, recipe effects
  game.js                  factories, admission and fairness, carts, orders, payouts, save format v2
  archive.js               read-only Creek League archive and field notes
  fieldmap.js              generated from data/ by tools/build-fieldmap.mjs
src/render/                three.js renderer
  scene.js                 world assembly, first-person / map / follow camera modes
  player.js                first-person walker (terrain, rocks, trunks, wading, deep-water return)
  riparian.js              enclosed creek woodland
  expansion.js             new equipment, carts, landmarks, Code Rot, crayfish, Nigatron
  terrain.js, water.js, balls.js, equipment.js, effects.js, camera.js, textures.js
src/audio.js               WebAudio sound effects, footsteps, machine hum
src/ui.js                  HUD, panels, map overlay, archive, field map, touch controls
tools/playtest.mjs         headless delivery checks (base regressions + the nine expansion tests)
tools/traverse.mjs         first-person traversal autopilot (used by the playtest)
tools/fixtures/            genuine v1 saves (early, mid, finished) for the migration test
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

This runs the headless playtest (a few minutes; `node tools/playtest.mjs quick` is faster,
and `node tools/playtest.mjs 4 6` runs only the listed sections, `B` for the base checks). It
drives the same simulation the browser runs and checks:

B. Base game: the first ball pays $10, early automation, press/hopper behaviour, save/reload.
1. Migration of genuine early, mid-game and finished v1 saves.
2. Every new launch reaches the original finish through both forks and their merges, and pays
   once; checkpoints pay nothing.
3. Factory accounting across three sites and the Bank Workshop, with pause, drain and release.
4. Payout math ($650 / $755), reload in transit, the same-step order cap.
5. Willow Narrows backup and its fix; a fast press waiting on its post and the launch fix.
6. Fourteen factories, the longest route and ~420 balls in flight; fairness, exact cash,
   save under load.
7. Canon checks (draft direction, Code Rot, landmarks, archive entries, NCN and replicas).
8. First-person traversal from a factory to the Farlands entrance with the real walker.
9. Progression from an Upper Gorge save to the first Cold Spring Headwaters finish.

Graphics quality (⚙ menu) changes the terrain and water mesh resolution, shadows, particle
counts and pixel ratio. Physics and payouts are identical at every setting.
