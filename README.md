## Commands: port 3003

start next project: bun run dev
run db: bunx convex dev

## Memo technos
- Manage DB on your convex account

- Bun (replace npm commands with bun or and npx with bunx)
- shadcn for nextjs (install with bunx)
- Convex: db + auth (solution serverless pour gestion de données)
  See convex db: https://dashboard.convex.dev
- Auth: Follow doc of convex auth
- jotai: React state management library
- react-use: usable hooks
- lucide-react: icons
- quill
- nuqs: search param state management for react. Like useState but stored in the URL query string

* For github providers, get callback url for convex and create new OAuth app in github developper settings.
  See github OAuth App: https://github.com/settings/applications/2795292

* for google: go to google cloud console
  -> create project
  -> ecran de consentement OAuth: create app -> externe + ajouter un domaine autorisé (c'est l'http action url qu'on recupere dans convex, sans le <https://> )
  -> google cloud -> credentials: create credentials ID client OAuth
  -> authorized js origin = http://localhost:PORT
  -> uri de redirection autorisée = convex http action + callback = https://fleet-capybara-363.convex.site/api/auth/callback/google
  -> copy client id et secret et run:
  bunx convex env set AUTH_GOOGLE_ID <clientId>
  bunx convex env set AUTH_GOOGLE_SECRET <secret>

# production
* docker compose up -d
dockerised container that runs next (db convex is serverless)
