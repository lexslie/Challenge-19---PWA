const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log("hit")
    console.log("event" + event)
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.classList.toggle("hidden", false);
});

// click event handler for the `butInstall` element
butInstall.addEventListener('click', async () => {});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {});
