# TFL Tierlist

Just a neat visualization for the tier list of our Pokemon Draft League. See <https://stealth.rocks/>.

As of now, everything on the site is from the `/website` directory; `/server` and `/draft-websocket-server` are mostly unused. While `/server` is a WIP that is supposed to be a backend for a full-fledged league management app one day, `/draft-websocket-server` can be used to push live team updates to the site when drafting. It is deployed to Heroku but only turned on for drafts.

Raw data is in `/website/data/tierlist.json` and `/website/data/teams.json`, the rest is fetched from `pokeapi.co` and saved to `/website/src/lib/generated`, where it is being consumed by the static site. Use `yarn workspace tfl-tierlist generate-tierlist` to update. Shouldn't be needed often, as Pokémon data doesn't really change. It is needed for team changes, however. The GitHub action does not run this script and relies on the checked-in data.

Uses Svelte-Kit, its static site generator, and plain SCSS.
