// install.js
const butInstall = document.getElementById('buttonInstall');

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Listen for the "beforeinstallprompt" event
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    let deferredPrompt = event;

    // Show the installation button when the event occurs
    butInstall.style.display = 'block';

    // Handle the button click to prompt the user for installation
    butInstall.addEventListener('click', async () => {
      // Prompt the user to install the PWA
      deferredPrompt.prompt();

      // Wait for the user's choice result
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('PWA installation accepted by user.');
      } else {
        console.log('PWA installation rejected by user.');
      }

      // Reset the deferredPrompt to null
      deferredPrompt = null;
    });
  });

  // Listen for the "appinstalled" event
  window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed on the device.');
  });
} else {
  console.error('Service workers are not supported in this browser.');
}
