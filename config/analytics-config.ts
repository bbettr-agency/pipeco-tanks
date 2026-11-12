/**
 * Analytics / advertising configuration.
 *
 * Only the Meta Pixel is wired up for now (consent-gated). GA4 / GTM are NOT
 * installed yet; the quote funnel already pushes a `generate_lead` dataLayer
 * event so a future GTM container can pick it up without code changes.
 */
export const analyticsConfig = {
  metaPixelId: "2305316480009795",

  /**
   * Hostnames allowed to run production advertising tracking. Everything else —
   * localhost, dev, and unrelated Vercel preview deployments (which use
   * per-deployment hostnames) — is excluded, so no production Pixel events fire
   * from them. `pipeco-tanks.vercel.app` is the current production host;
   * `pipecoza.com` / `www.pipecoza.com` are the future official domain.
   */
  allowedHosts: [
    "pipecoza.com",
    "www.pipecoza.com",
    "pipeco-tanks.vercel.app",
  ],
} as const;

/** Whether the given hostname is an approved production tracking host. */
export function isTrackingHost(hostname: string): boolean {
  return (analyticsConfig.allowedHosts as readonly string[]).includes(hostname);
}
