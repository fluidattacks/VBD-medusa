# VBD-medusa — Synthetic Vulnerability Benchmark

**This repository is a deliberately-vulnerable test benchmark. It is NOT for
production, NOT for deployment, and NOT to be contributed upstream.**

It is a fork of `medusajs/medusa`, owned by Fluid Attacks, in which a controlled
set of **synthetic, openly-labeled** security weaknesses has been introduced on
the `synthetic-vulns` branch. Its only purpose is to evaluate vulnerability
detectors (SAST tools and security agents) — the same category of resource as
OWASP Benchmark, OWASP WebGoat, and NIST SARD.

## How it is built

Every sample follows a clean↔vulnerable "twin" model:

- The **parent commit** of each injection holds the clean code.
- The **child (injection) commit** introduces exactly one synthetic weakness,
  isolated so the diff is the defect itself.
- Each injection commit message states plainly that it adds a synthetic,
  deliberately-vulnerable sample, names the weakness class, and gives a one-line
  exploitation path.

The realism lives in the code body (no `// VULNERABLE` giveaways), so a detector
cannot cheat off a comment. The labeling lives at the repository, commit, and
manifest level, so the artifact is fully auditable.

## Ground truth

- `GROUND_TRUTH.csv` — one row per injected (genuine) sample.
- `GROUND_TRUTH_rejected.csv` — candidates that were assessed and **rejected** as
  "forced" (the function is not a genuine host for the claimed class), with the
  reason. Rejections are a first-class output: they keep the benchmark honest.

An eval harness feeds the detector the code while withholding these manifests and
the commit messages, then scores the detector against them.

## Weakness classes in scope

- **F115** — Security controls bypass or absence.

## Provenance

Candidate functions were proposed upstream by a model that matches repository
functions to real client vulnerability shapes. Each candidate was then put
through a genuineness gate before any code change; only genuine hosts were
injected.
