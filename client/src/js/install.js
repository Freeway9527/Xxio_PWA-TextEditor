// Get a reference to the installation button
const butInstall = document.getElementById("buttonInstall");

// Function to handle the beforeinstallprompt event
function handleBeforeInstallPrompt(event) {
  // Store the triggered event
  window.deferredPrompt = event;

  // Show the installation button
  toggleHiddenClass(butInstall, false);
}

// Function to handle the installation button click
async function handleInstallButtonClick() {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show the installation prompt to the user
  promptEvent.prompt();

  // Wait for the user's choice to install or cancel
  const choiceResult = await promptEvent.userChoice;

  if (choiceResult.outcome === "accepted") {
    console.log("User accepted the PWA installation");
  } else {
    console.log("User declined the PWA installation");
  }

  // Reset the deferred prompt variable
  window.deferredPrompt = null;

  // Hide the installation button
  toggleHiddenClass(butInstall, true);
}

// Function to handle the appinstalled event
function handleAppInstalledEvent() {
  // Clear the prompt
  window.deferredPrompt = null;
}

// Utility function to toggle the 'hidden' class of an element
function toggleHiddenClass(element, isHidden) {
  element.classList.toggle("hidden", isHidden);
}

// Add event listeners
window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
butInstall.addEventListener("click", handleInstallButtonClick);
window.addEventListener("appinstalled", handleAppInstalledEvent);
