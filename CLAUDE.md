# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # build for production
pnpm preview      # preview production build
pnpm check        # svelte-kit sync + type check
pnpm lint         # prettier + eslint
pnpm format       # auto-format with prettier
pnpm test:unit    # run vitest (watch mode)
pnpm test:unit -- --run  # run vitest once
pnpm test:e2e     # run playwright tests
```

Requires `OPENWEATHER_API_KEY` in `.env`.

## Architecture

SvelteKit app deployed to Cloudflare Workers via `@sveltejs/adapter-cloudflare`. Uses Svelte 5 runes throughout.

**Data flow:** `+page.svelte` manages all state with `$state`/`$effect` runes. On user interaction, it POSTs to `/api/current` which proxies the OpenWeather API (`data/2.5/weather`). Location search uses `/api/search` which hits the OpenWeather Geocoding API.

**Decision logic:** `src/lib/weather.ts` — `isItShortsWeatherToday()` takes a `Forecast` and a temperature trigger. The trigger adjusts upward based on weather conditions (overcast: +21°C min, haze: +20°C min, other bad weather: +23°C min).

**Settings:** Stored in `localStorage` (`weatherSettings`) — unit (celsius/fahrenheit) and trigger temperature. Loaded via `onMount` and reloaded when settings modal closes.

**URL params:** `?location=` or `?lat=&lon=` hydrate the initial request on mount.

**Types:** `src/lib/types.ts` mirrors the OpenWeather API `Forecast` response shape. `src/lib/utils.ts` has temperature conversion and location name rendering helpers.

## Svelte 5 conventions

Use runes (`$state`, `$derived`, `$effect`) — no stores. Use classes in `.svelte.ts` files for complex state machines.
