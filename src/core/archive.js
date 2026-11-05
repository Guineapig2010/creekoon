// Read-only Creek League archive and expedition field notes. Historical records stay
// separate from the player's simulated factory. Nothing in the game writes to this data:
// a lost factory ball, an order, a factory record or a reload never touches it.
// Signed and decimal IDs are kept as text and sorted by their numeric value.

export const RACE_RECORDS = Object.freeze([
  { event: 'Early historic race', results: ['1st #15 dru', '2nd #7 the big E', '3rd #19 top 100'] },
  { event: 'Major all-ball race', results: ['1st #64 Max Inventory', '2nd #76 中国共产党', '3rd #-390 Enriquez'] },
  { event: 'Mr. C’s major race', results: ['1st #62 Mr. C', '2nd #124 Chungus funk', '3rd #91 mango', '4th #33 T St.', '5th #107 triple Chungus'] },
  { event: '12-ball race', results: ['1st #81 ACELERADa', '2nd #92 de Quavious pork', '3rd #78 Bowser fart'] },
  { event: 'pray for the left’s major race', results: ['1st #89 pray for the left', '2nd #25 Danethekiller', '3rd #110 NIGUS Chungus', '4th #3 phonk', '5th #94 John Pork', '6th #65 Event Horizon'] },
  { event: 'Great 300-Ball Race', results: ['1st #94 John Pork', '2nd #229 screw', '3rd #174 back Chungus rooms', '4th #4 Island Casino', '5th #150 Lowe’s Chungus'] },
]);

// Featured archive entries. `id` is the historical label (text); `key` is a stable internal id.
export const FEATURED = Object.freeze([
  { key: 'h_m390', id: '-390', name: 'Enriquez', status: 'Archived', note: '3rd in the major all-ball race.' },
  { key: 'h_m151', id: '-151', name: 'Marbella', status: 'Archived' },
  { key: 'h_m15', id: '-15', name: '271k', status: 'Archived' },
  { key: 'h_0', id: '0', name: 'Creek roller', status: 'Archived', note: 'The zero of the Negative and Zero Division.' },
  { key: 'h_43', id: '43', name: '— vacant —', status: 'Vacant', note: 'Left vacant: that competitor never existed.' },
  { key: 'h_90', id: '90', name: 'MONTAGEM', status: 'Recovered', note: 'Distinct from #90.1.' },
  { key: 'h_90_1', id: '90.1', name: 'MONTAGEM variant', status: 'Variant', note: 'Separate from the recovered original #90.' },
  { key: 'h_99', id: '99', name: '99 grüne Luftballons', status: 'Recovered', note: 'Distinct from #99.1.' },
  { key: 'h_99_1', id: '99.1', name: '99 grüne Luftballons variant', status: 'Variant', note: 'Separate from the recovered original #99.' },
  { key: 'h_101', id: '101', name: 'buzz Chungus', status: 'Chungus Nation', note: 'Chungus Nation started at #101, after #100.' },
  { key: 'h_110', id: '110', name: 'NIGUS Chungus', status: 'Chungus Nation', note: 'Distinct from #135 Vegas Chungus.' },
  { key: 'h_119', id: '119', name: 'Norway Chungus', status: 'Recovered', note: 'Recovered from Norway Cavern during the Great 300-Ball Race.' },
  { key: 'h_119_1', id: '119.1', name: 'RIP Norway Chungus', status: 'RIP variant', note: 'A separate historical entry. Kept alongside the recovered original #119.' },
  { key: 'h_135', id: '135', name: 'Vegas Chungus', status: 'Chungus Nation', note: 'Distinct from #110 NIGUS Chungus.' },
  { key: 'h_155', id: '155', name: 'Rizz Chungus', status: 'Archived' },
  { key: 'h_189', id: '189', name: 'RC Chungus', status: 'Chungus Nation' },
  { key: 'h_192', id: '192', name: '— unassigned —', status: 'Vacant', note: 'No exact name survives in the roster record.' },
  { key: 'h_200', id: '200', name: 'Chungus nation', status: 'Chungus Nation', note: 'Chungus Nation reached #200.' },
  { key: 'h_226', id: '226', name: '— vacant / skipped —', status: 'Vacant', note: 'Numbering jumps from #225 to #227.' },
  { key: 'h_255', id: '255', name: 'flip Thursday', status: 'Watchlist / Unconfirmed', note: 'Likely match for the old-league ball found on the expedition follow-up (remembered as “Spin Thursday”), pending direct confirmation.' },
  { key: 'h_269', id: '269', name: 'LOS method', status: 'Archived', note: 'Listed under its own name.' },
]);

export const UNNUMBERED = Object.freeze([
  { key: 'u_faded', name: 'Faded recoveries', note: 'Several heavily faded balls recovered during the Great 300-Ball Race. Unidentified; no IDs assigned.' },
  { key: 'u_blue', name: 'Blue Particle Ball', note: 'Recovered the day after the 300-ball race. Unnumbered.' },
  { key: 'u_red', name: 'Red Particle Ball', note: 'Found in a bush after the blue ball went in. Unnumbered.' },
]);

export const ARCHIVE_CARDS = Object.freeze([
  { title: 'Chungus Nation', body: 'Started at #101, right after #100, and reached #200. Featured: #101 buzz Chungus, #119 Norway Chungus, #189 RC Chungus and #200 Chungus nation. #110 NIGUS Chungus and #135 Vegas Chungus are different competitors. #269 LOS method stays under its own name. #43, #192 and #226 stay vacant.' },
  { title: 'Norway Cavern extraction', body: 'During the Great 300-Ball Race a cut tree branch dislodged trapped balls and recovered #119 Norway Chungus. The original and the separate historical #119.1 RIP Norway Chungus are both kept. The game’s Norway-Style Branch Sweeper is only inspired by this; it moves the player’s production balls, never historical ones.' },
  { title: 'Creek Roller and the signed IDs', body: '#0 Creek roller, #-390 Enriquez, #-151 Marbella and #-15 271k keep their zero and minus signs everywhere, including replica art. Replica stencils are cosmetic: a replica keeps its own factory ID and production recipe and can never become a recovered original.' },
  { title: 'Faded recoveries and the Particle balls', body: 'Unnamed faded recoveries stay unidentified with no invented IDs. The later Blue Particle Ball and Red Particle Ball are unnumbered entries.' },
  { title: 'New Creek Nation (possible future)', body: 'A rebuild called New Creek Nation is a possibility, with a winter or spring idea noted. In the game you can build New Creek Nation workshops; their production numbers (NCN) are a separate namespace from the old roster.' },
]);

export const FIELD_NOTES = Object.freeze({
  expedition: [
    'The latest outing was an expedition and inventory count, not a race. The last actual race was roughly a month earlier at the time of the report. There are no standings and no winner.',
    'The creek was first described as empty of tennis balls. A follow-up reported one old-league ball found.',
    'Evidence card (no photo): the find is likely #255 flip Thursday — the ball remembered as “Spin Thursday”. Status stays provisional until the find is confirmed directly.',
    'Absent balls are Watchlist / Unconfirmed. An inaccurate count does not create a new RIP entry. Only a ball still absent after the next real race and a better verified count can become eligible for a new RIP variant.',
    'Heavy Code Rot was reported in the territory above the Continental Shelf. Crawfish Springs was especially affected, including its crayfish.',
    'The Folk Draft begins blowing through the upper zone. It is a downdraft: it pushes exposed airborne things down. It does not lift, does not flow upstream, and is not Code Rot.',
  ],
  places: [
    { name: 'Continental Shelf', text: 'Runs along the right side of the creek near the waterfall. The Shelf starts near the Springs and runs along the creek’s right side. The final stretch before normal creek is from the creator’s close-up marking; the rest is an approximate bank trace.' },
    { name: 'Crawfish Springs', text: 'Sits in a secondary runoff chute off the main creek, with a large double-pond spring and crawfish. Reached from the brushy opening just before the Springs, then a climb up the Shelf.' },
    { name: 'The Clearing and deep pools', text: 'Where the creator found Nigatron, a large water bug, while carrying race balls upstream. Open sky, grasses on the left and the wooded Shelf on the right in the photo’s viewing direction.' },
    { name: 'Farlands', text: 'The yellow line marks the entrance. The Farlands continue upstream for the rest of the creek. Only one or two expeditions have gone in.' },
    { name: 'Waterfall split', text: 'At the fork the creek-right branch is the primary waterfall route; the alternate route goes the other way through a separate channel. The taped sign is roughly 20 feet upstream of the split.' },
    { name: 'Flat Rocks', text: 'The usual historical start, by the big flat rocks.' },
    { name: 'Regular finish', text: 'By the trail entrance. Its exact coordinates are unverified.' },
  ],
  otherNames: ['Norway Cavern', 'Crayfish Pond (a hawk was seen here; separate from Crawfish Springs)', 'Peyton’s Pool', 'Waterfall Zone', 'Nigus Howling Point', 'An unnamed leaf-hidden cavern (separate from Norway Cavern)'],
});

// Names offered by the Archive Replica Stencil Jig (cosmetic; marked Replica)
export const REPLICA_NAMES = Object.freeze(['#0 Creek roller', '#-390 Enriquez', '#-151 Marbella', '#-15 271k', '#15 dru', '#62 Mr. C', '#64 Max Inventory', '#89 pray for the left', '#94 John Pork', '#119 Norway Chungus', '#200 Chungus nation']);

/** Sort historical IDs numerically while keeping their exact text. */
export function sortIds(list) {
  return list.slice().sort((a, b) => parseFloat(a.id) - parseFloat(b.id) || a.id.length - b.id.length);
}
