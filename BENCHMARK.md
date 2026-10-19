# VBD-medusa: synthetic vulnerability benchmark

This fork is a **synthetic, openly labelled benchmark**. It is not the upstream project
and must not be used as one. Each sample is an isolated pair of branches off `baseline`:

- `baseline`: the pinned upstream commit plus any hardening; the common ancestor.
- `smpl/<NNN>/safe`: the genuine negative (validated control) of sample `NNN`.
- `smpl/<NNN>/vuln`: `safe` plus exactly one commit that weakens the control.

The class and the coordinates of every sample live only in `GROUND_TRUTH.csv` on this
orphan branch, never in the analysed branches.

| sample | file | class |
|---|---|---|
| 001 | `packages/medusa/src/api/admin/users/me/route.ts` | F115 |
| 002 | `packages/medusa/src/api/auth/[actor_type]/[auth_provider]/route.ts` | F115 |
| 003 | `www/apps/api-reference/app/schema/route.ts` | F115 |
| 004 | `www/apps/api-reference/app/base-specs/route.ts` | F115 |
| 005 | `www/apps/cloud/app/api/changelog/route.ts` | F115 |
| 006 | `packages/medusa/src/api/auth/verification/request/route.ts` | F115 |
