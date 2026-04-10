# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Static marketing/docs site for **Pabawi** — a unified web interface for classic infrastructure management (Puppet, Bolt, Ansible, SSH, Proxmox, AWS). Hosted on GitHub Pages at `pabawi.example42.com`.

No build tools, no package manager, no framework. Raw HTML + CSS + JS, deployed directly from `main`.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page — hero, features, use cases, roadmap |
| `about.html` | About / team / philosophy |
| `docs.html` | Documentation with sidebar navigation |
| `css/style.css` | All styles — single file, CSS custom properties for theming |
| `js/main.js` | Progressive enhancements — nav active state, copy buttons, scroll animations, mobile menu, terminal cursor |
| `_config.yml` | Jekyll config (Jekyll is disabled via `.nojekyll`) |
| `CNAME` | GitHub Pages custom domain |

## Conventions

- **Dark theme only** — CSS variables defined in `:root` on `css/style.css:8`. Never hardcode colors; always use CSS vars (`--brand`, `--accent`, `--bg-card`, etc.).
- **Typography** — Inter for UI, JetBrains Mono for code/terminal blocks. Both loaded from Google Fonts.
- **Animations** — Fade-up on scroll via `IntersectionObserver` in `js/main.js:43`. Add class `feature-card`, `usecase-card`, `persona-card`, `roadmap-card`, or `value-card` to get the animation automatically.
- **Copy buttons** — Add `.copy-btn` inside a `.code-block` or `.docs-code` wrapper containing a `<pre>` to get clipboard copy behavior.
- **Docs sidebar** — Section headings in `docs.html` must have `id` attributes and matching `<a href="#id">` entries in `.docs-sidebar` for the scroll-spy to work.
- **Nav active state** — Driven by `window.location.pathname` matching `href`; no manual `active` class needed at runtime (though `index.html` hardcodes it as a fallback).

## Deployment

Push to `main` — GitHub Pages deploys automatically. No CI, no build step.
