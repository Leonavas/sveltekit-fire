
# Sveltekit Fire

![Sveltekit Fire Logo](https://firebasestorage.googleapis.com/v0/b/sveltekitfire.appspot.com/o/public%2Fsveltekit-fire-logo.svg?alt=media&token=31e9e07f-e896-487c-9c6b-97a75560cd85)

Integrate [Svelte Kit](https://kit.svelte.dev/) projects with [Firebase](https://firebase.google.com/) effortlessly!

### Check the full documentation here:
[Documentation](https://sveltekitfire.web.app/)

## Getting Started

To install Sveltekit Fire run on your terminal

```bash
npm install -D sveltekit-fire
```

You will probably need to use other modules from firebase. If you do so, make sure you install firebase js sdk v9+

```bash
npm install -D firebase
```

Now you'll need to create a new app inside a Firebase project. Make sure to choose the option  _web_

## Svelte Configuration
if you instaleld firebase js sdk v9+, by the time this documentation is written, you will need to add the following code to yours svelte.config.js file:

```js
kit : {
...
	vite: {
		ssr: {
			external: ['firebase']
		}
	}
}
...

```
## Firebase Configuration

Sveltekit Fire uses .env files to store firebase configuration data in order to provide a cleaner code and the ability to lazily initialize Firebase from multiple components.

A  `.env`  file will look like this

```bash
VITE_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
VITE_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
VITE_PUBLIC_FIREBASE_DATABASE_URL="YOUR_DATABASE_URL"
VITE_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
VITE_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
VITE_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
VITE_PUBLIC_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID"
VITE_PUBLIC_FIREBASE_USE_ANALYTICS=true
VITE_PUBLIC_FIREBASE_USE_PERFORMANCE=true
VITE_PUBLIC_FIREBASE_USER_PERSISTENCE="local"
```

# Initializing Firebase

Now you can initialize Firebase like this:

```svelte
<!-- __layout.svelte -->
<script>
	import { initFirebase } from 'sveltekit-fire';

	initFirebase();
</script>
```

But dont worry, if you don't initialize Firebase, it will automatically be initialized only once whenever a Sveltekit Fire component is used.

# Server Side Rendering

Although Sveltekit Fire is compatible with ssr, it's not yet fully supported. For instance, collections and documents that require a logged user are not compatible with ssr.

# Disclaimer

This lib was initially intendend to be a PR to the awesome [codediodeio/sveltefire](https://github.com/codediodeio/sveltefire) written by Jeff Delaney.
But as the work progressed, in order to maximize the benefits of firebase js sdk 9.0+ and sveltekit the project started to grow in a very different way so I decided to create a new lib.  
Some of the code was heavily inspired by the sveltefire project.

# Complete Documentation
The full [documentation is available here](https://sveltekitfire.web.app/)