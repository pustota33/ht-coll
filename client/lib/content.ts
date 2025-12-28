export type Product = {
  slug: string;
  name: string;
  price: number; // in USD
  previewUrl: string;
  gumroadUrl: string;
  cover?: string; // 16:9 image URL
  specs?: {
    bpm?: string;
    key?: string;
    format?: string;
    size?: string;
    type?: string;
  };
  description?: string;
  demos?: string[];
};

export type Plugin = {
  slug: string;
  name: string;
  previewUrl: string;
  gumroadUrl: string;
  cover?: string; // 16:9 image URL
  description?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover?: string; // 16:9 image URL
  content: string; // Full HTML content
  products?: string[]; // Array of product slugs to feature
};

const demoMp3 =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

export const products: Product[] = [
  {
    slug: "schranz-alpha",
    name: "Schranz Alpha",
    price: 24,
    previewUrl: demoMp3,
    gumroadUrl: "https://gumroad.com/l/schranz-alpha",
    cover: "https://picsum.photos/id/1011/1280/720",
    specs: { bpm: "140–155", key: "Various", format: "WAV 24-bit", size: "850MB", type: "Drums & Loops" },
    description:
      "Aggressive kicks, metallic percussion and relentless loops crafted for modern hard techno and schranz.",
    demos: [demoMp3, demoMp3, demoMp3],
  },
  {
    slug: "dna-kicks-vol1",
    name: "DNA Kicks Vol.1",
    price: 19,
    previewUrl: demoMp3,
    gumroadUrl: "https://gumroad.com/l/dna-kicks-vol1",
    cover: "https://picsum.photos/id/1015/1280/720",
    specs: { bpm: "145–150", key: "Various", format: "WAV 24-bit", size: "420MB", type: "Kick One-Shots" },
    description: "Brutal, saturated kick one‑shots designed to cut through any warehouse system.",
    demos: [demoMp3, demoMp3, demoMp3],
  },
  {
    slug: "industrial-textures",
    name: "Industrial Textures",
    price: 22,
    previewUrl: demoMp3,
    gumroadUrl: "https://gumroad.com/l/industrial-textures",
    cover: "https://picsum.photos/id/1020/1280/720",
    specs: { bpm: "130–160", key: "N/A", format: "WAV 24-bit", size: "600MB", type: "Atmos & FX" },
    description:
      "Grainy atmospheres, machine drones and found sounds for cold, industrial aesthetics.",
    demos: [demoMp3, demoMp3, demoMp3],
  },
  {
    slug: "rave-stabs",
    name: "Rave Stabs",
    price: 17,
    previewUrl: demoMp3,
    gumroadUrl: "https://gumroad.com/l/rave-stabs",
    cover: "https://picsum.photos/id/1025/1280/720",
    specs: { bpm: "Any", key: "Various", format: "WAV 24-bit", size: "250MB", type: "Stabs & Shots" },
    description: "Oldschool rave energy with a modern aggressive twist.",
    demos: [demoMp3, demoMp3, demoMp3],
  },
  {
    slug: "club-tools",
    name: "Club Tools",
    price: 21,
    previewUrl: demoMp3,
    gumroadUrl: "https://gumroad.com/l/club-tools",
    cover: "https://picsum.photos/id/1031/1280/720",
    specs: { bpm: "140–150", key: "N/A", format: "WAV 24-bit", size: "500MB", type: "Utility & FX" },
    description: "Builders, falls, uplifters, hard fills and transitions built for damage.",
    demos: [demoMp3, demoMp3, demoMp3],
  },
  {
    slug: "fm-kicks",
    name: "FM Kicks",
    price: 18,
    previewUrl: demoMp3,
    gumroadUrl: "https://gumroad.com/l/fm-kicks",
    cover: "https://picsum.photos/id/1035/1280/720",
    specs: { bpm: "145–160", key: "Various", format: "WAV 24-bit", size: "300MB", type: "Kick One-Shots" },
    description: "Digitally fierce FM‑driven kicks with surgical transient control.",
    demos: [demoMp3, demoMp3, demoMp3],
  },
];

export const plugins: Plugin[] = [
  {
    slug: "kick-engine",
    name: "Kick Engine (Rack)",
    previewUrl: demoMp3,
    gumroadUrl: "https://gumroad.com/l/kick-engine",
    cover: "https://picsum.photos/id/1040/1280/720",
    description: "Powerful Max for Live rack for designing and sculpting custom hard techno kicks with real-time modulation and transient control.",
  },
  {
    slug: "schranz-seq",
    name: "Schranz Sequencer (Max)",
    previewUrl: demoMp3,
    gumroadUrl: "https://gumroad.com/l/schranz-seq",
    cover: "https://picsum.photos/id/1043/1280/720",
    description: "Advanced Max for Live sequencer optimized for polyrhythmic schranz patterns and hypnotic drum arrangements.",
  },
  {
    slug: "acid-303",
    name: "ACID 303 Presets",
    previewUrl: demoMp3,
    gumroadUrl: "https://gumroad.com/l/acid-303",
    cover: "https://picsum.photos/id/1045/1280/720",
    description: "Curated preset pack for Serum and Vital with aggressive acid lines and modulation chains perfect for hard techno synthesis.",
  },
  {
    slug: "noise-walls",
    name: "Noise Walls (Rack)",
    previewUrl: demoMp3,
    gumroadUrl: "https://gumroad.com/l/noise-walls",
    cover: "https://picsum.photos/id/1049/1280/720",
    description: "Ableton Rack for layering grainy textures, industrial noise and evolving pads with granular processing and filtering.",
  },
  {
    slug: "granular-drift",
    name: "Granular Drift (VST)",
    previewUrl: demoMp3,
    gumroadUrl: "https://gumroad.com/l/granular-drift",
    cover: "https://picsum.photos/id/1047/1280/720",
    description: "Ultra-modern granular processing plugin designed for evolving pads, glitchy effects and experimental hard techno sound design.",
  },
];

export const blog: BlogPost[] = [
  {
    slug: "hard-techno-kicks",
    title: "Designing Relentless Hard Techno Kicks",
    excerpt:
      "A step‑by‑step approach to transients, saturation and low‑end control for club‑ready impact.",
    cover: "https://picsum.photos/id/1050/1280/720",
    products: ["schranz-alpha", "dna-kicks-vol1", "fm-kicks"],
    content: `
<h2>The Foundation: Understanding Kick Architecture</h2>
<p>A hard techno kick isn't just a sound—it's a carefully engineered weapon designed to cut through 130+ dB warehouse systems and grab the listener's attention within milliseconds. The key to relentless kicks lies in understanding their three essential components: the initial transient, the body, and the tail.</p>

<p>The transient is everything. In hard techno, you're competing with dozens of other elements in the frequency spectrum. A weak attack means your kick gets buried instantly. We're talking about designing a click, snap, or impact that's sharp enough to feel aggressive but controlled enough not to distort.</p>

<h2>Layering for Maximum Impact</h2>
<p>Professional hard techno producers never rely on a single kick sample. Instead, they layer: a sub-bass for low-end extension, a mid-kick for punch, and a clicky top-end for definition. This gives you full spectral coverage from 20Hz to 5kHz, ensuring your kick translates across all sound systems.</p>

<p>Start with a foundational kick that has a solid 808-style sub. Then layer a punchy acoustic kick sample on top, adding that classic hard techno personality. Finally, add a short filtered noise burst to create aggression.</p>

<h2>Saturation and Distortion: The Secret Sauce</h2>
<p>This is where good kicks become legendary. Saturation isn't just for warmth—it's for aggression. By pushing your kick into a good saturation plugin, you're adding harmonic richness and edge. Hard techno is all about feeling the kick in your chest and hearing it crystal clear on a club system simultaneously.</p>

<p>Use soft saturation on the sub to add harmonics without losing definition. Then apply aggressive distortion to the mid and high-end layers. The distortion adds those metallic, almost synthetic qualities that define modern hard techno aesthetics.</p>

<h2>Transient Control and Compression</h2>
<p>After saturation, your kick needs intelligent compression. Use a slow-release compressor set to a 4:1 ratio to glue the layers together while maintaining punch. The key is making sure the compressor catches the sustain, not the attack—you want that initial impact to stay crisp.</p>

<p>For even more precision, use a transient shaper. A good transient shaper lets you enhance the initial attack microseconds before compression, giving you full control over how "present" your kick feels. This is the difference between a good kick and one that dominates the mix.</p>

<h2>EQ for Club Translation</h2>
<p>Don't just trust your monitors. A hard techno kick needs a presence peak around 2-3kHz for definition, a clean fundamental around 60-80Hz for sub weight, and subtle boosts around 300Hz for that "click" that punches through.</p>

<p>Cut anything muddy between 200-400Hz that's competing with your bass line. This is crucial for clarity in dense arrangements.</p>

<h2>Practical Workflow: Building Your Signature Kick</h2>
<p>1. Start with a dry 808 drum hit as your foundation<br/>
2. Layer an acoustic kick or tape-saturated sample for midrange<br/>
3. Add a noise burst filtered to 3-5kHz for top-end definition<br/>
4. Apply 2-3dB of soft saturation to the whole stack<br/>
5. Compress with a 4:1 ratio, 10ms attack, 200ms release<br/>
6. Shape transients: boost attack by 20-30%, reduce sustain by 15%<br/>
7. EQ: +4dB at 60Hz, +3dB at 2.5kHz, cut -3dB at 350Hz<br/>
8. Final limiting to catch peaks</p>

<p>The result? A kick that feels massive in the club but remains defined and punchy on any system. This is the approach used across professional hard techno production, and it's exactly what separates bedroom producers from those filling dancefloors.</p>

<h2>Advanced: Dynamic Layering</h2>
<p>Once you master static kicks, explore dynamic variations. Create velocity-responsive versions where harder hits trigger additional saturation or reverb. Use automation to evolve your kick over 16 or 32 bars, gradually adding high-frequency elements or modulation.</p>

<p>This keeps sets from becoming monotonous while maintaining the core aggressive character hard techno demands.</p>
    `,
  },
  {
    slug: "schranz-groove",
    title: "Programming Schranz Groove in 2025",
    excerpt:
      "From polyrhythms to industrial swing — techniques for non‑stop forward momentum.",
    cover: "https://picsum.photos/id/1052/1280/720",
    products: ["schranz-seq", "club-tools"],
    content: `
<h2>What Is Schranz, Really?</h2>
<p>Schranz—the German word for "shrill" or "rough"—represents the intersection of industrial minimalism and rhythmic hypnosis. Unlike straightforward techno, schranz grooves are built on polyrhythmic complexity, relentless forward momentum, and an almost aggressive repetition that induces trance-like states on the dancefloor.</p>

<p>The key difference? Schranz doesn't swing—it grinds. The hi-hats, fills, and cymbal rolls are placed with surgical precision, creating a sense of controlled chaos rather than smooth pocket feel.</p>

<h2>The Foundation: Polyrhythmic Thinking</h2>
<p>Schranz grooves thrive on rhythmic tension. Instead of a straight 4x4 beat, you're layering multiple rhythmic patterns that don't align with the primary grid. A common approach: 16th-note snare on the "and" of beat 3, kick fills on triplet subdivisions, and hi-hat patterns that imply a different time signature.</p>

<p>This creates cognitive dissonance—your brain wants to predict the pattern, but just when it thinks it has it, a fill breaks the expectation. That tension is what makes schranz hypnotic.</p>

<h2>Drum Programming Essentials</h2>
<p><strong>The Kick:</strong> Schranz uses shorter, punchier kicks than deep techno. Think 150-180ms decay rather than 500ms. The kick should sound industrial, almost synthetic. Layer it with a deeper 808 sub for weight, but keep the main kick aggressive and cutting.</p>

<p><strong>The Snare:</strong> This is your rhythmic wildcard. Start with a tight, metallic snare sound. Program unexpected snare hits: 16th-note doubles, fills on triplets, occasional 32nd-note rolls. The unpredictability is the point.</p>

<p><strong>Hi-Hats and Cymbals:</strong> Use multiple hat sounds—closed hats for the grid, open hats for texture, and ride cymbals for fills. The golden rule: never repeat the same hat pattern twice in a row. Vary the timings by 5-10ms, add swing only to specific notes, and use velocity variations extensively.</p>

<h2>Building Fills and Breaks</h2>
<p>Schranz is defined by its fills. Every 8 or 16 bars, break the established pattern with something unexpected. Common fill techniques:</p>

<p><strong>The Triplet Fill:</strong> Switch to 16th-note triplet hi-hats while keeping the main kick and snare locked to the 4x4 grid. This creates rhythmic tension that resolves when you return to straight 16ths.</p>

<p><strong>The Kick Roll:</strong> Double or triple your kick pattern on specific beats. A kick roll every 32 bars creates a moment of climax before returning to the main groove.</p>

<p><strong>The Filtered Drum Break:</strong> Gradually filter out all drums to 500Hz, creating a sudden moment of silence or low-end rumble before snapping back with full intensity.</p>

<h2>Swing, Timing, and Micro-Adjustments</h2>
<p>Schranz requires obsessive attention to timing. Don't just quantize everything to the grid. Add 3-8ms of human feel to specific notes while keeping the kick locked tight. The snare on beat 3 might be 5ms late. The open hat might be 3ms early. These micro-adjustments create groove without sacrificing the industrial precision schranz demands.</p>

<p>Use your DAW's humanize function sparingly—adjust timing manually for maximum control.</p>

<h2>Practical Step-by-Step Groove</h2>
<p>Let's build a 16-bar schranz groove from scratch:<br/>
• Bars 1-8: Basic pattern (kick 4x4, snare beats 2&4, closed hats 8th notes)<br/>
• Bar 9: Introduce 16th-note snare on beat 3<br/>
• Bar 10-11: Layer an open hat roll, 16th-note triplets<br/>
• Bar 12: Kick fill (double on beat 4)<br/>
• Bar 13-15: Return to core groove, but shift snare timing by 7ms<br/>
• Bar 16: Filtered break or cymbal swell</p>

<p>Repeat with variations. Change which beat gets the snare double. Shift the kick fill to beat 2. Introduce new hat sounds. The goal is constant evolution within a hypnotic framework.</p>

<h2>Advanced: Granular and Textural Layers</h2>
<p>Modern schranz often layers granular textures beneath the drum pattern. These aren't melodic—they're purely textural. A granular cloudscape, stretched vocal snippets, or reversed industrial noise creates an atmosphere of controlled chaos while the drums maintain strict groove.</p>

<p>These textures should evolve throughout the track, introducing new granules or adjusting the grain density every 4-8 bars.</p>

<h2>The Mindset</h2>
<p>Schranz programming is about controlled unpredictability. Your listener should feel locked into a groove while constantly being surprised by what comes next. This requires patience, experimentation, and an understanding that sometimes the "wrong" placement is exactly right for schranz aesthetics.</p>

<p>Start with the rules, then break them systematically. That's the schranz way.</p>
    `,
  },
  {
    slug: "mixing-industrial",
    title: "Mixing Industrial Elements Without Mud",
    excerpt:
      "EQ strategies and mid‑range management when layering noise, textures and metallic hits.",
    cover: "https://picsum.photos/id/1053/1280/720",
    products: ["industrial-textures", "noise-walls"],
    content: `
<h2>The Industrial Mixing Challenge</h2>
<p>Industrial hard techno is sonically dense by design. You're layering metallic percussion, granular drones, filtered noise, and aggressive drums all competing for attention in the 200Hz-5kHz range—the exact frequencies that make or break clarity.</p>

<p>The difference between a professional mix and amateur muddy mess? Strategic frequency management and an uncompromising approach to spectral balance.</p>

<h2>Understanding the Mud Zone</h2>
<p>The 200-400Hz range is the primary culprit. This is where kick fundamentals, bass notes, snare bodies, and noise textures all collide. If you're stacking multiple elements here without careful EQ, everything becomes indistinct and fatiguing.</p>

<p>The solution: think of your mix in spectral layers. Assign different elements to different frequency zones and maintain clear separation between them.</p>

<h2>Spectral Mapping: Creating Clarity</h2>
<p><strong>Sub Layer (20-80Hz):</strong> This is sacred territory. Only your kick sub and bass fundamentals should live here. Everything else gets high-passed at 80Hz minimum. No exceptions. This gives you a clean, defined low end.</p>

<p><strong>Warm/Mud Zone (80-250Hz):</strong> This is dangerous. Use narrow, surgical cuts. If your kick body sits at 120Hz, cut everything else around there. If your snare has a boxy resonance at 200Hz, target it with a -2 to -4dB cut on a narrow Q.</p>

<p><strong>Punch/Definition (250Hz-3kHz):</strong> This is where presence lives. Your snare should have energy here. Kick clicks, metallic percussion, and cymbal sizzle all belong in this region. But careful placement is key—a metallic hi-hat and snare don't both need their fundamental presence at 2.5kHz.</p>

<p><strong>Air/Clarity (3kHz-10kHz):</strong> This is where high-frequency detail and aggression happen. Filtered noise bursts, hi-hat brightness, and vocal presence peaks live here. More separation is possible here; stack more freely.</p>

<p><strong>Ultra-High (10kHz+):</strong> Use sparingly. A touch of air and top-end shimmer from filtered cymbal rides, but overdo this and you create fatigue.</p>

<h2>Critical EQ Moves for Industrial Tracks</h2>
<p><strong>1. High-Pass Everything (Except Kicks and Bass)</strong><br/>
Start with an 80Hz high-pass on every track that doesn't need sub content. Snares, hats, textures, pads—all high-passed. This eliminates the first major source of mud.</p>

<p><strong>2. Surgical Cuts Over Boosts</strong><br/>
When mud emerges, cut narrow (high-Q) bands on the offending frequencies rather than boosting other elements. If your noise texture is cloudy, cut -2dB at 300Hz with a Q of 8, rather than boosting air at 5kHz.</p>

<p><strong>3. Use Sidechain EQ</strong><br/>
Insert a dynamic EQ that cuts 300Hz specifically when the kick hits. The kick dominates that region, so removing competing frequencies during the kick's attack creates space without seeming like you're doing anything. The kick feels larger; other elements stay audible.</p>

<p><strong>4. Metallic Element Separation</strong><br/>
If you're layering multiple metallic sounds (claps, snares, cymbals), place them strategically. One should peak at 2kHz (punch), another at 4kHz (brightness), another at 6kHz (shimmer). They share space without masking each other.</p>

<h2>Practical EQ Chain for Layered Textures</h2>
<p>Taking a granular noise texture as an example:<br/>
1. High-pass at 250Hz (no sub content needed)<br/>
2. Cut -4dB at 400Hz, Q=6 (reduce mud potential)<br/>
3. Boost +2dB at 1.2kHz, Q=2 (add definition)<br/>
4. Boost +3dB at 3.5kHz, Q=2 (brightness, separates from drums)<br/>
5. Dynamic EQ: Cut -6dB at 350Hz when kick triggers</p>

<p>Result? The texture sounds clear, defined, and never competes with the kick.</p>

<h2>Compression Strategy for Industrial Elements</h2>
<p>Use compression to control dynamics, not to squash. A fast-attack, medium-release compressor at 2:1 ratio helps control wild texture bursts while maintaining energy.</p>

<p>For noisy elements, use serial compression: first a lookahead limiter to catch peaks, then a slower 2:1 compressor for consistent tone.</p>

<h2>Layering Multiple Noise/Texture Sources</h2>
<p>Industrial tracks often use 4-6 texture layers simultaneously. The trick: each should occupy distinct frequency zones and have different timbral characteristics.</p>

<p>Example layering (from low to high):<br/>
• Layer 1: Filtered industrial drone (peak at 80Hz)<br/>
• Layer 2: Granular texture (peak at 350Hz)<br/>
• Layer 3: Reversed vocal sample (peak at 1.5kHz)<br/>
• Layer 4: Metallic resonance (peak at 3kHz)<br/>
• Layer 5: High-frequency noise burst (peak at 6kHz)</p>

<p>Each occupies its own space. None fights for frequency real estate.</p>

<h2>The Final Mix Bus Strategy</h2>
<p>Never trust your individual tracks. The mix bus is where everything combines, and that's when mud emerges. Use a linear-phase EQ on your master bus—not to correct, but to monitor.</p>

<p>If you're seeing energy buildup at 250Hz on the master spectrum analyzer, go back to individual tracks and make cuts, don't boost the master. The master should add barely anything—maybe +1dB at 60Hz for sub weight, +0.5dB at 4kHz for transparency.</p>

<h2>Headroom and Loudness</h2>
<p>Industrial tracks want to sound aggressive and compressed. But don't confuse aggressive with distorted. Maintain -6dB to -3dB of headroom on your master before the limiter. This prevents the mix from turning to mush under loudness processing.</p>

<h2>The Bottom Line</h2>
<p>Industrial mixing is about precision. Every frequency is contested. Rather than throwing all elements together and hoping, map your frequencies, assign elements deliberately, and make surgical cuts. The result is clarity within aggression—exactly what industrial hard techno demands.</p>

<p>Start by listening to professional industrial tracks with a spectrum analyzer. See where elements sit. Then do the same in your own mixes. Over time, you develop an intuition for where conflicts emerge before they become problems.</p>

<p>That's professional industrial mixing.</p>
    `,
  },
];

export function withUtm(url: string, name: string) {
  const u = new URL(url, window.location.origin);
  u.searchParams.set("utm_source", "site");
  u.searchParams.set("utm_medium", "button");
  u.searchParams.set("utm_campaign", name.toLowerCase().replace(/\s+/g, "-"));
  return u.toString();
}
