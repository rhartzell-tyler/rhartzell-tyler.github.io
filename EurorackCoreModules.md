# The Core Eurorack Module Types
(Think of this as the “AWS Services Map” but for synths — each category has a job, a failure mode, and a reason to exist.)

## 1. Sound Sources (Oscillators & Noise)
These generate raw material — the “compute” of your synth.

### VCO (Voltage Controlled Oscillator)
- Produces periodic waveforms: sine, triangle, saw, square, pulse
- Pitch controlled by 1V/oct input
- Foundation of subtractive synthesis
- Analog VCOs drift slightly (musical), digital ones stay locked (precise)

### Wavetable Oscillators
- Digital tables of complex waveforms
- Morphing between shapes gives evolving timbres
- FM/Phase Mod Oscillators
- Designed for Yamaha‑style FM or phase modulation
- Very harmonically rich, metallic, bell-like tones

### Noise Sources
- White, pink, blue noise
- Used for percussion, randomness, or feeding filters

## 2. Modifiers (Filters, Waveshapers, Distortion)
These sculpt the raw sound — the “transform” layer.

### VCF (Voltage Controlled Filter)
- Low‑pass, high‑pass, band‑pass, notch
- Resonance adds emphasis or self‑oscillation
- Classic types: Moog ladder, MS‑20, SEM, Steiner‑Parker

### Waveshapers / Folders
- Add harmonics by folding or distorting the waveform
- Key to West Coast synthesis (Buchla style)

### VCAs (Voltage Controlled Amplifiers)
- Control volume or modulation depth
- The most boring‑sounding but most essential module
- Everything goes through a VCA eventually

## 3. Control Sources (Envelopes, LFOs, Function Generators)
These create movement — the “automation” layer.

### ADSR / AR Envelopes
- Shape amplitude or filter movement over time
- Triggered by gates
- ADSR = Attack, Decay, Sustain, Release

### LFO (Low Frequency Oscillator)
- Slow periodic modulation
- Vibrato, tremolo, filter sweeps

### Function Generators (Maths, etc.)
- Slew limiters, envelopes, LFOs, logic, envelopes that loop
- Swiss‑army‑knife modulation sources
- Can generate envelopes, cycles, envelopes triggered by CV, etc.

## 4. Sequencers & CV Generators
These decide what notes happen and when.

### Step Sequencers
- Classic 8/16/32‑step patterns
- Pitch CV + gate outputs

### Random / Stochastic Sequencers
- Marbles, Turing Machine
- Controlled randomness for generative music

### Quantizers
- Take any CV and force it into a musical scale
- Essential for tuning chaos

## 5. Utilities (The Unsung Heroes)
These are the glue — the “networking and IAM” of Eurorack.

### Attenuators / Attenuverters
- Scale or invert CV
- Crucial for controlling modulation depth

### Mixers
- Audio mixers
- CV mixers
- Matrix mixers (route anything to anything)

### Multiples (Passive or Buffered)
- Split signals
- Buffered mults preserve pitch accuracy

### Slew Limiters
- Smooth out stepped CV
- Turn gates into envelopes
- Glide/portamento for pitch

### Logic Modules
- AND, OR, XOR for gates
- Rhythmic pattern creation

### Switches / Sequential Switches
- Route signals based on triggers
- Create evolving patterns

## 6. Effects (FX)
These add space, texture, and polish.

### Delays
- Analog BBD
- Digital multi‑tap
- Tape emulations

### Reverb
- Spring tanks
- Digital shimmer, halls, plates

### Distortion / Overdrive
- Wave clipping
- Saturation
- Fuzz

### Granular / Spectral FX
- Time‑stretching
- Freezing
- Clouds‑style ambient textures

## 7. MIDI & External Interface Modules
This is the category you’re already eyeing.

### MIDI‑to‑CV Converters
- Convert MIDI note → 1V/oct CV
- Convert MIDI velocity → CV
- Convert MIDI CC → modulation CV
- Provide gate/trigger outputs

### CV‑to‑MIDI
- Useful if you want your modular to control external synths

### Audio Input/Output Interfaces
- Bring external audio into the rack
- Send modular‑level signals to mixers or DAWs

## 8. Clocking & Timing
The “orchestration layer” of your modular.

### Master Clocks
- Generate BPM‑based pulses
- Sync everything

### Clock Dividers / Multipliers
- Create rhythmic subdivisions
- Turn 120 BPM into 60, 30, 240, etc.

### Trigger Sequencers
- Drum patterns
- Rhythmic modulation

## 9. Digital Brains / DSP Modules
These are the “Lambda functions” of Eurorack — powerful, flexible, sometimes overkill.

### Multi‑Function DSP Modules
- Ornament & Crime
- Disting EX
- Zadar
- Can be oscillators, envelopes, quantizers, LFOs, etc.

### Samplers / Loopers
- Play back audio
- Granular manipulation
- CV‑controlled sample selection

## How This Connects to Your DIY Synth Project
Since your goal is MIDI keyboard → MIDI‑to‑CV → analog circuits, the modules most relevant to you are:

### Critical for your setup
- MIDI‑to‑CV interface
- VCO (or your DIY oscillator)
- VCF
- VCA
- Envelope generator
- LFO
- Mixer
- Output module (optional but helpful)

### Optional but extremely fun
- Wavefolder
- Random generator
- Clock divider
- Sequencer
- Distortion or delay