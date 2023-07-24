const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA //
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  let deferredPrompt = event;

  butInstall.style.display = 'block';
  butInstall.addEventListener('click', async () => {
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('PWA installation accepted by user.');
    } else {
      console.log('PWA installation rejected by user.');
    }

    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed on the device.');
});
