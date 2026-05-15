<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Skilled TanStack Start application. Here is a summary of all changes made:

- **`vite.config.ts`** — Added a reverse proxy configuration for `/ingest/static`, `/ingest/array`, and `/ingest` routes to route PostHog requests through the Vite dev server, improving reliability and avoiding ad-blocker issues.
- **`src/utils/posthog-server.ts`** *(new file)* — Created a singleton PostHog Node.js client for server-side event capture using `posthog-node`.
- **`src/routes/__root.tsx`** — Wrapped the app with `PostHogProvider` (client-side SDK initialization with exception tracking enabled) and added a `PostHogAuthSync` component that identifies Clerk-authenticated users in PostHog and resets on sign-out.
- **`src/components/SkillCard.tsx`** — Added `skill_install_command_copied` capture when a user copies an install command, and `skill_opened` capture when a user clicks the Open button. Both events include `skill_title` and `skill_category` properties.
- **`src/routes/index.tsx`** — Added `browse_registry_clicked` and `publish_skill_clicked` captures on the homepage hero CTA buttons.
- **`src/components/Navbar.tsx`** — Added `sign_in_clicked` capture on the Sign In navigation link.
- **`.env`** — Added `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN` and `VITE_PUBLIC_POSTHOG_HOST` environment variables.

| Event | Description | File |
|---|---|---|
| `skill_install_command_copied` | User copies the install command from a skill card | `src/components/SkillCard.tsx` |
| `skill_opened` | User clicks the Open button on a skill card | `src/components/SkillCard.tsx` |
| `browse_registry_clicked` | User clicks the Browse Registry CTA on the home page | `src/routes/index.tsx` |
| `publish_skill_clicked` | User clicks the Publish Skill CTA on the home page | `src/routes/index.tsx` |
| `sign_in_clicked` | User clicks the Sign In button in the navbar | `src/components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1587454)
- [Skill engagement over time](/insights/fitdJXRB) — daily trend of install command copies and skill opens
- [Homepage CTA clicks](/insights/1lbokYVp) — bar chart comparing Browse Registry, Publish Skill, and Sign In clicks
- [Most copied skill categories](/insights/q1WZK8nX) — breakdown of install copies by skill category to see which categories are most popular
- [Browse to install conversion funnel](/insights/yj6VnhCG) — funnel from browsing the registry to copying an install command
- [Unique active users engaging with skills](/insights/pIEzzF3a) — weekly unique users who interact with skill cards

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
