# Changelog

## 2.1.0 — The creek laid out on the creator's map

### Changed

- **The creek follows the creator's annotated Arroyo Trabuco map**, north up, at half scale.
  The source is `data/field_features.geojson`, with the USGS main channel where the map has
  no marks.
  - Map distances are halved; balls, water, rocks and trees stay real size.
  - The centreline is generated into `src/core/layout.js`.
  - The old layout (a gentle S-curve with every place squeezed into 98 m) is gone.
- **New order and distances, walking upstream from the finish:**
  - Old Rolling Grounds.
  - The Crawfish Springs confluence (s 497), with the brushy Shelf climb across from photo
    pin A.
  - The falls (104 m above the finish). The waterfall is no longer next to the start.
  - The route split and taped sign, 33 m above the falls (67 m on the map). Waterfall Run is
    above it.
  - The long Shelf reach and the Shelf launch.
  - **Flat Rocks**, 270 m above the split and no longer jammed in right after the
    waterfall.
  - The Clearing and deep pools.
  - The Farlands entrance (s 33.5), where the Shelf ends.
  - The seven Farlands reaches, unchanged.
- **Continental Shelf on the right (east) bank.** It is a wooded rock terrace along the creek
  from the Springs climb all the way up to the deep pools; it was previously on the left. It
  is a cliff only at the Shelf drop.
- **Crawfish Springs is its own secondary stream.**
  - The spring pool and the deep-forest double ponds sit about 2.7 m up on the Shelf, 43 m
    east of the creek.
  - A runoff chute runs down through the woods and cuts a gully through the east bank into
    the creek below the falls.
  - It is a second channel in the simulation. Its balls hand over to the creek at the
    confluence and are paid once at the finish.
  - The Springs equipment, driftwood, Code Rot and crayfish moved onto the stream.
- **Flat Rocks is modelled on the creator's photo.**
  - A thick tan sandstone ledge, about 1.75 m tall, overhangs a deep dark undercut, with a
    thinner slab inside.
  - A bar of rounded grey, blue-grey and tan cobbles runs between the ledge and the wide,
    shallow water.
  - Taped race signs hang on the ledge face, with willows close behind.
  - The Flat Rocks launch is just downstream of the ledge.
- **The waterfall split is a real fork.** The alternate branch is 51 m long, on the
  creek-left (east), stepping down seven times and rejoining below the plunge pool.
- **Sites, payouts and run times follow the new distances.**
  - Site order: Grounds $10 (5 s), Waterfall Run $30 (~2 min), Crawfish Springs $65
    (~2 min), Continental Shelf $120 (~3 min), Flat Rocks $170 (~5 min), Alder Bend $220,
    Upper Gorge $400 (~7 min), then the Farlands reaches up to Cold Spring Headwaters
    (~9.5 min).
  - Long open reaches allow about 1.5 balls in flight per metre. The ball budget is
    unchanged.
- **Saves from before this change load with the new layout.** Ball positions from the old
  geography no longer exist:
  - Unpaid rolling balls return to the front of their own factory's queue, keeping their ID,
    recipe and markings.
  - Order slots are released and reserved again on relaunch, and carts return their loads.
  - The player respawns at a factory.
- **Faster world build.** A coarse nearest-centreline grid, coarser far banks in the bed
  bake, and lighter rocks, terrain and water meshes.
- **Walking:** the walker can climb from the creek's corridor into the Springs stream's
  corridor.

### Tests actually run (headless playtest, quick mode, plus browser checks)

- **Playtest sections B, 1–4, 5, 7 and 8 pass.**
  - Section 2 now includes the Springs stream: balls go down the stream, into the creek and
    are paid once. Both waterfall branches are used. With the Splitstone Gate on Balanced,
    both lanes carry balls and come back together past the merge.
  - Section 7 checks the map order, the distances, the Shelf on the east bank, the Springs as
    a separate stream up on the Shelf, and the Flat Rocks ledge.
  - Section 8 walks the whole creek from the Grounds factory to the Farlands entrance, and
    climbs the Shelf up the Springs stream to the double ponds.
  - Section 5: Willow Narrows goes from 53 to 100 balls/min through the pinch with the fix.
- **Section 6:** the full 650-ball budget in flight at the peak, with every factory launching
  and exact cash. Physics costs about 19% of one core at about 585 balls.
- **Browser (Chromium, software GL):**
  - First-person views at the Grounds, Flat Rocks, the Springs ponds, the falls and the Shelf
    reach.
  - The north-up overhead map.
  - `tools/mapcompare.mjs`, which draws the game's creek over the creator's marks.

### Provisional

- The finish (trail entrance) is unpinned on the map. It is placed about 80 m below photo
  pin A.
- Where the USGS line and the creator's marks disagree, the marks win. Near the waterfall
  they differ by about 75 m.
- The alternate branch keeps within 5 m of the creek; the map shows about 25 m.
- The Flat Rocks ledge length and the pond outlines are illustrative.

## 2.0.0 — New Creek Nation expansion

### Added

- **Seven new reaches above the Upper Gorge.** Slate Steps, Willow Narrows, Splitstone Fork,
  Long Eddy Basin, Spillway Falls, Boulder Sluice and Cold Spring Headwaters. Each has the
  specified price, base payout and target run time. Also new: the **Flat Rocks** start on the
  Shelf route ($900, $45, after Waterfall Run). The creek now runs 246.5 m from the headwaters
  to the original finish gate. Splitstone, the Sluice rib and the Waterfall split are forks
  with a merge checkpoint; either lane is legal and a ball is paid exactly once.
- **Permanent factory at every open site.** Each runs its own press, feeder, hopper,
  launch post, recipe, upgrades, timers and stats on its own clock. All share one cash balance.
  - Each site has pause press / pause feeder / new releases switches and a drain action,
    available from Crawfish Springs on.
  - A new site arrives with a basic line once you own one anywhere.
  - Factory, Balls and Spacing Sensor upgrades are bought per site, with a site selector in
    the shop and the resulting machine rate shown before purchase.
- **Ball lifecycle IDs.** One ID from manufacture to finish or loss. The origin site, launch
  site and recipe never change, including after a cart transfer and across reloads.
- **Fair release and backpressure.** Each reach has a safe number of balls in flight. When a
  reach is full, the longest-waiting site gets the next slot. Launches yield to balls passing
  from upstream, with a 3 s fairness timeout. A network ball budget (650) applies on top.
  Every blocked site states why, for example "Willow Narrows backed up" or "Yielding to
  passing balls".
- **Bank Workshop** (Alder Bend). Carts move surplus balls from one factory to another on
  1–3 supply routes. Each route shows a shipment preview with source, count, destination
  space and ETA. It is extended by Staging Silos, the Double-Deck cart, the Passing Loop on
  the single-track yard segment, the Priority Switch and the Fast Bank Lift.
- **Six recipes:** Standard, Dry-Weave +4%, Soft-Core +6%, Clean-Seam +8%, Rapids Felt +10%
  and Workshop Select +14%. Each has real handling effects in the physics. Changing recipe
  takes a changeover time, and the Batch Scheduler can queue up to three batches.
  Payout = route base + ball-upgrade bonuses + rounded recipe % + order bonus.
- **50 new upgrades** (42 from the table plus the 8 lore upgrades), in the Factory,
  Logistics, Creek, Finish and Controls tabs alongside the original 30. Each installs visible
  equipment or a control. Purchases open a before/after measurement in the Network panel,
  and the Efficiency Bench compares two windows.
- **Eight optional shipment orders.** One at a time, with no fee and no penalty. The bonus is
  reserved when a qualifying ball launches and paid once when it finishes. A lost ball frees
  its slot. Two-Post Service has a 50-per-post cap.
- **First-person exploration, on by default.** WASD and mouse on desktop, a dual-stick layout
  on phones, and an **E** prompt for interactions. You walk on the real terrain and rocks;
  cliffs, trunks and machines block you. You can wade the shallows, and deep water returns you
  to the last safe bank spot. The view has footsteps, head bob and machine hum.
- **Camera modes.** **M** opens a north-up overhead map with Tycoon and Field-notes layers, a
  live reach list, site labels with status, and a permanent legend separating Current, Folk
  Draft and Code Rot observations. **F**/**C** follow a ball, with a ball detail panel (ID,
  origin, launch site, recipe, payout, NCN, Replica). **Esc** returns you to where you stood.
- **Enclosed riparian woodland** along the creek: trunks you collide with, crowns, shrubs,
  fallen logs and reeds. Density varies by place: the open Clearing, dense Springs and
  headwaters, and a sunnier lower creek.
- **Places.**
  - The waterfall split: the primary creek-right route goes over the falls and the alternate
    branch steps down on the left. A taped sign stands upstream of the split.
  - The Continental Shelf, and Crawfish Springs with its double ponds, runoff chute, crayfish
    and Code Rot decals.
  - The Clearing with Nigatron, and the Farlands entrance line and sign.
  - The Folk Draft, modelled as a downdraft that only pushes airborne balls down and
    downstream.
- **Finish station.** It holds the read-only **Creek League Archive** (exact race labels;
  signed and decimal IDs kept as text), the **Field Notes** and your **Factory Records**. A
  north-up **Arroyo Trabuco field map** is built from the kit's GeoJSON
  (`tools/build-fieldmap.mjs`); camera-viewpoint pins are kept separate from the features
  they show.
- **NCN serials and replica stencils.** NCN serials are a separate namespace from the old
  roster. Replica stencils are cosmetic and always marked Replica; a replica keeps its own
  factory ID.
- **Intro cards** at the Shelf, Springs, Alder Bend, Upper Gorge and Slate Steps, with a skip
  button. They can be reopened from ⚙ → Feature help. A milestone card marks the first Cold
  Spring Headwaters finish.
- **Settings:** look sensitivity, field of view, head bob, quiet watch view, and `?quality=`
  in the URL.

### Changed (compatibility fixes to base features)

- **Save format v2.** Base-game v1 saves migrate on load:
  - Cash, unlocks, upgrades, settings, the queue, rolling balls (positions, origin, payout,
    paid flag, checkpoint progress) and paid finishes are all preserved.
  - The old line and its upgrades become the fixed factory at the saved site, and other open
    sites get a basic line.
  - The untouched v1 save is kept under `creek-rolling-tycoon-save-v1-backup`.
- **Launch-point relocation (moving the workbench on a cart) is gone.** Every site is now
  permanent, so "selecting" a site only chooses which factory you manage and roll at.
- **The base "Creek backed up" logic is now per reach.** The old single-route spacing
  check is replaced by reach capacities and fair turns.
- **The Make & Roll button rolls at the factory you are standing beside** (or the selected
  one in map view).
- **A UI error no longer stops the game loop.** Factories keep running; each distinct error
  is logged once.
- **Workshop accounting:** balls a cart brings back undelivered are no longer counted as
  transferred out. Two-Post per-post reservations are released on finish or loss.

### Tuning values and provisional placements

All tuning values are first-pass and marked `TUNING` in the source:

- `config.js`: launch positions, costs, payouts, reach capacities, recipe percentages,
  orders and machine timings.
- `creek.js`: Code Rot zones and the game-only islands.
- `game.js`: ball budget, fairness timeout, gate alternation and cart speeds.

Two of them deserve a mention:

- **Willow Narrows** has a stock safe capacity of **16 balls in flight**, raised to the full
  34 by the Willow Exit Flare. This is what makes the Narrows a genuine bottleneck under
  several upstream factories.
- **Progression pace** is about 25–40 minutes per new reach for a simple player who starts
  from an Upper Gorge save, about 3.6 hours to the first Headwaters finish.

Placements marked `PROVISIONAL` (in `creek.js` and `render/expansion.js`) are approximate,
compressed to game scale and labelled "approx." on the map:

- The waterfall split and the alternate branch path.
- The taped sign. In game scale it stands about 1.8 m upstream of the split, which stands in
  for "about 20 ft".
- Flat Rocks.
- The Crawfish Springs double ponds, which are illustrative rather than surveyed.
- The brushy Shelf climb.
- The Clearing.
- The Farlands entrance.
- The regular finish, whose historical coordinates are unverified.

Norway Cavern, Crayfish Pond, Peyton's Pool, Nigus Howling Point and the leaf-hidden cavern
are deliberately **unmapped**.

Geography reconciliation:

- The base layout is kept: the Springs sit above the Shelf, which sits above the waterfall.
- The Shelf is a raised ledge on the creek's right.
- The Folk Draft acts at the Shelf drop (s 76.6–79.6).
- The Clearing is at the downstream end of Alder Bend, with the Farlands entrance just above
  it.

### Tests actually run

**Headless playtest.** Full mode: `node tools/playtest.mjs B 1 2 3 4 5 6 7 8` and
`node tools/playtest.mjs 9`. Quick mode was also run during development. Results:

- **B. Base game.** $10 first ball, early automation, press waits on a full hopper,
  save/reload with no double pay.
- **1. Migration.** Genuine early, mid and finished v1 saves, generated with the previous
  release's code. Cash, unlocks, machines, queue, rolling balls and paid totals all match.
  Milestone controls appear correctly. 120 s of play afterwards with nothing paid twice; the
  v1 data is unchanged.
- **2. Geography.** All 8 new launches reach the original gate, pass every checkpoint and are
  paid once. Both waterfall branches, both Splitstone lanes and both sides of the Sluice rib
  are used. Checkpoints alone pay nothing.
- **3. Factory accounting.** Three sites plus a Bank Workshop transfer route. Per-site and
  network books reconcile. Pause, drain and "new releases off" affect only their own site.
- **4. Payout math.** $650 and $755 confirmed, reload in transit (paid once, order 1/0), the
  same-step order cap and same-step settlement.
- **5. Upgrade impact.** Willow Narrows backup, then Shield + Flare: 65 → 112 balls/min
  through the pinch and releases held 55% → 0%. A Servo press waiting 47% of the time;
  fixing the launch raised launches 47 → 80 in 120 s.
- **6. Stress.** 14 factories with the longest route: 423 balls in flight at the peak, every
  factory launching, cash exact, about 90 ms of simulation per simulated second, save at full
  load with every ball in one stage. This is below the ~500 the brief asked for: the reach
  capacities cap balls in flight at about 590.
- **7. Canon checks.** See the playtest output for the full list.
- **8. Traversal.** A first-person traversal with the real walker, from a factory to the
  Farlands entrance.
- **9. Progression.** From an Upper Gorge save with no debug money, a simple buyer bot
  opened Slate at 24 min, Willow 47, Splitstone 72, Long Eddy 101, Spillway 131, Sluice 169
  and the Headwaters at 211. The first Headwaters finish came at 217 min. The next purchase
  was visible at every check, and short runs kept paying.

Total: 69 checks passed, 0 failed.

**Browser (Chromium via Playwright, software GL).**

- Desktop at 1280×800:
  - First-person spawn, walking, map overlay, follow camera and ball detail.
  - The Archive, Field Notes, Field Map, and Sites, Network and Orders panels.
  - Intro cards, headwaters views, and migration of a real v1 save in the browser with the
    backup kept.
- Phone at 390×844 with touch: HUD, stick, interact and map buttons, the panel, the map and
  the archive.
