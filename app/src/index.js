import './index.css'

import React from 'react'
import {render} from 'react-dom'

import App from './App'

render(<App/>, document.querySelector('#app'))
window.addEventListener('load', () => {
    const base = document.querySelector('base');
    let baseUrl = base && base.href || '';

    if (!baseUrl.endsWith('/')) {
        baseUrl = `${baseUrl}/`;
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(`${baseUrl}src/serviceWorkerFootball.js`)
        .then(registration => {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(err => {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }
});

window.addEventListener('beforeinstallprompt', event => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();

    console.log('beforeinstallprompt fired');

    // Stash the event so it can be triggered later.
    deferredPrompt = event;

    return false;
});
