import { handleErrorWithSentry } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://477d1a318b5a7c50f9969649a62f1870@o160551.ingest.us.sentry.io/4509487676391424',

	tracesSampleRate: 1.0,

	// Enable logs to be sent to Sentry
	enableLogs: true
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
