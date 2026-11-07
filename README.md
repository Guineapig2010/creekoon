# Creek Rolling Tycoon

Make tennis balls, roll them down a real-scale 3D creek, and turn every finish into cash.
Start with one ball and a wooden chute at the trail-entrance finish. End with seven
factories running flat out, from the Farlands entrance about 530 m upstream down to the same
finish gate, with well over a thousand balls in the creek at once.

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

## What's in the game

### The creek, laid out on the creator's map

The creek follows the creator's annotated Arroyo Trabuco map (`data/field_features.geojson`,
with the USGS main channel where the map has no marks) at **half scale**: every distance on
the map is halved, while balls, water, rocks and trees stay real size. North is up in the map
view. Walking upstream from the finish:

- The **Trail Entrance** factory just above the finish (unpinned on the map).
- The **Crawfish Springs confluence** and, across from photo pin A, the brushy opening where
  you climb the Shelf to reach the Springs.
- The **falls** on the primary (creek-right) route, about 104 m above the finish. The
  **alternate branch** (creek-left, stepping down through the woods) rejoins below the
  plunge pool.
- The **route split** 33 m above the falls (67 m on the map), with the **taped sign** just
  upstream, and the **Waterfall** launch above it.
- The long reach under the **Continental Shelf**, a wooded rock terrace on the creek's
  **east bank** (on your right walking upstream). It runs all the way up to the deep pools.
  The Shelf launch and the Folk Draft drop are on this reach.
- **Flat Rocks**, the usual historical start, 270 m above the split on the west bank. It is
  a thick sandstone ledge overhanging a dark undercut, with a cobble bar and shallow water
  (modelled on the creator's photo).
- **The Clearing and deep pools** (Nigatron), grass on the west and the Shelf on the east.
- The **Farlands entrance**, where the Shelf ends. The creek begins a little way into the
  Farlands, in shallow gravel braids.

Only places on the creator's map are in the game. Every launch site, trouble spot and creek
upgrade is at one of them.

**Crawfish Springs** is its own secondary stream:

- It runs from the spring pool and the **double ponds** in the deep forest up on the Shelf.
- A runoff chute takes it down through the woods.
- It cuts a gully through the east bank into the creek below the falls. Water runs the whole
  way: no stretch of the stream dries out or disappears under the ground.
- Springs balls run down that stream and continue in the creek to the finish.

`tools/mapcompare.mjs` draws the game's creek over the creator's marks to check the match.

### Play

- **Seven permanent factories**, one at every launch site: Trail Entrance, Waterfall,
  Crawfish Springs, Continental Shelf, Flat Rocks, the Clearing and the Farlands Entrance.
  Each runs its own press, feeder, recipe and upgrades on its own clock, with one shared
  balance.
  - Machines run flat out: a full creek never holds a launch back. Trouble spots cost balls
    and time instead, and their fixes win both back.
  - Balls near you (and near the camera, or the ball you follow) get the full physics. Balls
    farther away ride the current on a cheap streamed path and take each trouble spot's odds,
    so the creek can hold thousands of balls.
  - When the finish basket and overflow crate are both full, the crew lifts balls out by hand.
  - The Bank Workshop carts surplus balls between factories.
- **Ball lifecycle IDs**: each ball has one ID, origin site, launch site and recipe from
  manufacture to finish or loss.
- **Recipes, orders, upgrades**: six recipes, eight optional shipment orders and 71
  upgrades, 7 of them lore upgrades.
- **First person**: walk the banks and wade the shallows. You can climb the Shelf to the
  Springs and follow any ball down the creek. The north-up map shows the Tycoon and
  Field-notes layers.
- **Archive and field notes**: the Creek League archive is read-only and kept separate from
  your simulated production.
- **Physics**: a fixed 120 Hz step with buoyancy, drag against a baked flow field (eddies,
  plunge-pool rollers, spring boils, the Folk Draft downdraft) and collisions against the
  same terrain and rocks you see.
- **Saves**: older saves upgrade automatically, and the original is kept as a backup. Sites
  and upgrades at places that are not on the map move to the nearest real place or are
  refunded.

See `CHANGELOG.md` for details, tuning values and provisional placements.

## Code layout

```
index.html, style.css      page shell and HUD styling
dist/game.js               prebuilt bundle (npm run build)
data/*.geojson             field-map sources (creator traces, simplified NHD main channel)
src/main.js                boot, save migration and backup, game loop
src/core/                  simulation — no DOM, runs headless in Node
  layout.js                the creek and Springs centrelines and anchors from the creator's map (generated)
  config.js                launch sites, reaches, recipes, orders, all upgrades, factory numbers
  creek.js                 channel geometry, heightfield, water, flow field, wind, rocks, colliders
  physics.js               ball dynamics, contacts, ball-to-ball collisions, recipe effects
  game.js                  factories, ball streaming, carts, orders, payouts, save format v2
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
tools/runsite.mjs          run times and loss points for balls from any launch site
tools/mapcompare.mjs       the game's creek drawn over the creator's map marks (SVG)
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
2. Every launch reaches the original finish, through both waterfall branches and the Springs
   stream, and pays once. The Route Split Gate on Balanced uses both branches. Checkpoints pay
   nothing.
3. Factory accounting across three sites and the Bank Workshop, with pause, drain and release.
4. Payout math (Flat Rocks: $182, $242 with an order slot), reload in transit, the same-step
   order cap.
5. The Clearing's deep pools and their fixes; machines never held by the creek; a fast press
   waiting on its post and the launch fix.
6. All seven factories flat out, over a thousand balls in flight (far balls streamed), exact
   cash, save under load.
7. Canon checks (draft direction, Code Rot, landmarks, archive entries, NCN and replicas).
8. First-person walks with the real walker: the whole creek from the finish to the head of the
   creek in the Farlands, and the Shelf climb up the Springs stream to the double ponds.
9. Progression from a Continental Shelf save to the first Farlands finish.

Graphics quality (⚙ menu) changes the terrain and water mesh resolution, shadows, particle
counts and pixel ratio. Physics and payouts are identical at every setting.
