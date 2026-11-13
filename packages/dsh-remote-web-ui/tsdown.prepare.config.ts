import { clientBundle } from '../../shared/tsdown.client.ts'

/**
 * Consumer-side build for git installs (the `prepare` script): transpile
 * straight from src without tsc project references, which need the sibling
 * harness checkout that only dev machines and CI have. Types are NOT
 * checked here — `pnpm run typecheck` owns that. The client bundle is
 * emitted too: the modules node half serves lib/client.js to browsers, so a
 * git-installed package must ship it. (The standalone mobile bundle was
 * removed in 0.4.0 — the official UI is adapted in place, so this config
 * mirrors tsdown.config.ts exactly.)
 */
export default clientBundle('@shengdingbot/dsh-remote-web-ui', ['src/index.ts'], {
  // Same externals as tsdown.config.ts. A git install runs THIS config, so
  // omitting them here silently bundles a second copy of the harness packages
  // (notably @deepseek-ai/dsh-host-webserver) into lib/index.js — the plugin
  // then talks to its own copy of a service the host already provides.
  libExternal: [
    '@deepseek-ai/dsh-client-connection',
    '@deepseek-ai/dsh-client-locale',
    '@deepseek-ai/dsh-client-ui-primitives',
    '@deepseek-ai/dsh-client-ui-settings',
    '@deepseek-ai/dsh-client-ui-sidebar',
    '@deepseek-ai/dsh-client-ui-slots',
    '@deepseek-ai/dsh-host-webserver',
    '@deepseek-ai/dsh-settings',
  ],
})
