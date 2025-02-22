/* eslint-disable no-restricted-globals */
// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like. You can also remove this file if you'd prefer
// not to use a service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

// Precache all assets generated by the build process.
// URLs are injected into the self.__WB_MANIFEST variable.
// This must be present in the service worker file for precaching to work.
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing to handle navigation requests with index.html
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');

registerRoute(
    // Define criteria for routing requests
    ({ request, url }) => {
        // Exclude non-navigation requests
        if (request.mode !== 'navigate') {
            return false;
        }

        // Exclude requests that start with /_
        if (url.pathname.startsWith('/_')) {
            return false;
        }

        // Exclude URLs with file extensions
        if (url.pathname.match(fileExtensionRegexp)) {
            return false;
        }

        // Handle all other navigation requests
        return true;
    },
    createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// Example runtime caching route for .png images
registerRoute(
    // Cache same-origin .png requests
    ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
    new StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            // Limit cache size to 50 entries
            new ExpirationPlugin({ maxEntries: 50 }),
        ],
    })
);

// Allow the web app to trigger skipWaiting via registration.waiting.postMessage
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});