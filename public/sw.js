if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const o=e=>a(e,i),r={module:{uri:i},exports:t,require:o};s[i]=Promise.all(n.map((e=>r[e]||o(e)))).then((e=>(c(...e),t)))}}define(["./workbox-3c9d0171"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/2e874054-e42ad880b14b1881.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/386.bddd378b40d758e6.js",revision:"bddd378b40d758e6"},{url:"/_next/static/chunks/394-9062719012d866d7.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/421-396ec298ca06de2a.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/461-76dd6530509c54e3.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/667-782ff86d9976c0b1.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/673-5eb30908458e94f2.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/71.1adbb0d31d099c4c.js",revision:"1adbb0d31d099c4c"},{url:"/_next/static/chunks/921-9997209d83110b66.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/951-2be06253450c1a85.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/96-7fac6a42388e259d.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/app/(auth)/layout-4e45a78f05f538dc.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/app/(auth)/sign-in/%5B%5B...sign-in%5D%5D/page-801cbdd63da70e26.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/app/(auth)/sign-up/%5B%5B...sign-up%5D%5D/page-e6cfe567c829c1ca.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/app/(main)/layout-bce3b568979f35f4.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/app/(main)/page-4293d7a55d116b02.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/app/_not-found/page-d4aa699071f08829.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/app/api/classifyInvoice/route-c21d2c82f8c3845d.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/app/api/file/route-2e43e8fd89193d3a.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/app/api/send-email/route-5d3c48bea8ffcf9a.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/app/api/stockFile/route-a21e68b1a5670137.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/app/landing/page-8aa5e62d979c5e94.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/app/layout-f76fb2267f4fd4fa.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/framework-70b35a48bc9b39e6.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/main-66f8638d06473b70.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/main-app-c3c521d0ac95e987.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/pages/_app-f5a2e555327bbeb0.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/pages/_error-074cce7a515f473b.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-545df4f7acc9808d.js",revision:"dRgaPDcbobdO5oy-V1hrJ"},{url:"/_next/static/css/6e873fe915ff7fcf.css",revision:"6e873fe915ff7fcf"},{url:"/_next/static/dRgaPDcbobdO5oy-V1hrJ/_buildManifest.js",revision:"2c1a340f78f0a98637e67ff82a61dd5b"},{url:"/_next/static/dRgaPDcbobdO5oy-V1hrJ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/icons/icon-192x192.png",revision:"2cf5db324ded729393c61dd1919430c4"},{url:"/icons/icon-512x512.png",revision:"9e7e674f465d468fd6700919d58ce678"},{url:"/logo.png",revision:"e9dda6550e1827adbc18b1a964ae4a2d"},{url:"/manifest.json",revision:"e21f139a5a39f44ed66a5cf79d8bf80c"},{url:"/pdf.png",revision:"5ac13e10c4132a2b1274ed8f6134cd26"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.sameOrigin,a=e.url.pathname;return!(!s||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,a=e.url.pathname,n=e.sameOrigin;return"1"===s.headers.get("RSC")&&"1"===s.headers.get("Next-Router-Prefetch")&&n&&!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,a=e.url.pathname,n=e.sameOrigin;return"1"===s.headers.get("RSC")&&n&&!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.url.pathname;return e.sameOrigin&&!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){return!e.sameOrigin}),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
