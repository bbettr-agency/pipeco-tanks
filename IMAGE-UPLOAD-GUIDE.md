# PIPECO — Image Upload Guide

This explains **where to put each PIPECO photograph** and **how to make it appear**
on the website. No code changes are needed beyond one line per image.

## How images work on this site

- Every image is driven from a single registry: **`config/image-config.ts`**.
- Each "slot" either shows a **real photo** (when `src` is set) or a tidy
  **labelled placeholder** (when `src` is `null`).
- To publish a photo you do two things:
  1. **Upload** the file into the matching folder under `public/images/…`
  2. **Set `src`** on the slot in `config/image-config.ts` to that path.

Example (GRP product):

```ts
// 1. file added at: public/images/products/grp-tanks/grp-tank.jpg
// 2. in config/image-config.ts:
productGrp: {
  …
  src: "/images/products/grp-tanks/grp-tank.jpg", // was: null
},
```

> Paths in `src` are **web paths** — they start at `/images/…` (drop the
> `public/` prefix). The hero already works this way:
> `src: "/images/homepage/hero/hero.jpg"`.

## Where each photograph goes

| Folder (`public/images/…`) | Use it for | Registry slot |
|---|---|---|
| `homepage/hero/` | Main hero background (wide landscape) | `hero` ✅ in use |
| `homepage/capabilities/` | Engineering / installation on site | `capabilities` |
| `homepage/industries/` | Industries & applications imagery | *(future)* |
| `homepage/why-pipeco/` | "Why Pipeco" supporting imagery | *(future)* |
| `products/grp-tanks/` | GRP sectional tank | `productGrp` |
| `products/pressed-steel-tanks/` | Pressed steel sectional tank | `productSteel` |
| `products/stainless-steel-tanks/` | Stainless steel sectional tank | `productStainless` |
| `mining-refuge-chambers/` | Underground refuge chambers | `refuge` |
| `projects/completed-installations/` | Completed project photos | `install1`, `install2`, `install3` |
| `projects/installation-process/` | Install-in-progress photos | *(future)* |
| `turnkey-solutions/civil-foundations/` | Foundations / dwarf walls | *(future)* |
| `turnkey-solutions/elevated-steel-stands/` | Elevated steel stands | *(future)* |
| `turnkey-solutions/tank-installations/` | Tanks being installed | *(future)* |
| `company/facilities/` | Facilities / depot | *(future)* |
| `company/team/` | Team / people | *(future)* |

## Recommended aspect ratios

Each slot keeps the layout stable at a set ratio (crop to suit):

- **hero** — wide landscape (the current photo is 16:9, `~2560×1440`)
- **products (GRP / steel / stainless)** — landscape (~16:10 / 4:3 / 16:11)
- **capabilities / refuge** — portrait (4:5)
- **completed installations** — one landscape (4:3) + two square (1:1)

## Photo guidelines

- Use **authentic PIPECO photography** only — no stock imagery.
- Prefer **JPG** (photos) at a sensible size: **~2000–2560px** on the long edge,
  **under ~800 KB** each (compress before uploading). `next/image` optimises the
  rest automatically.
- Keep engineering details true and unaltered.
- Alt text lives on each slot in `config/image-config.ts` — update it to describe
  the specific photo for SEO and accessibility.

## Need a slot wired up?

Add the file to the right folder and either set `src` yourself, or send the
filename and I'll wire the slot.
