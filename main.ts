// Worst AI Advice: The 48-Hour Tight Line Open
// u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580
// Node 22, standard library only. Writes one line of the worst possible
// advice an AI could give, in 140 characters or fewer, to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR). Deterministic: the line is a constant, and the
// program self-checks it against the gate before writing — one line, one
// sentence, 1-140 characters, not only whitespace — then reads the file
// back and verifies it byte-for-byte. Two runs write byte-identical output.
//
// Run outside the grader's container with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_CHARS = 140;

const LINE =
  'To make your phone battery last all day, just microwave it for 30 seconds — the heat recharges the cells and wakes them right up!';

function checkGate(text) {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`gate: length ${text.length} not in 1..${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error('gate: text is only whitespace');
  }
  if (text.includes('\n') || text.includes('\r')) {
    throw new Error('gate: text is more than one line');
  }
  // Single sentence: exactly one sentence-ending mark, at the very end,
  // and no other sentence-ending mark anywhere else in the line.
  const endings = text.match(/[.!?]/g) ?? [];
  if (endings.length !== 1 || !/[.!?]$/.test(text)) {
    throw new Error('gate: text is not a single sentence');
  }
}

checkGate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.txt');
writeFileSync(outPath, LINE, 'utf8');
// Read the file back and verify it byte-for-byte, so a silent write
// failure can never pass as a good entry.
if (readFileSync(outPath, 'utf8') !== LINE) {
  throw new Error('gate: written entry.txt does not match the line');
}
