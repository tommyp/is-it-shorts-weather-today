import posthog from 'posthog-js'
import { browser } from '$app/environment';

export const load = async () => {
  if (browser) {
    posthog.init(
      'phc_2o4hLdGddFTgjAih9bJi49Bpij6JIzNRtxwWsMNCSab',
      {
        api_host: 'https://eu.i.posthog.com',
        defaults: '2025-11-30'
      }
    )
  }

  return
};