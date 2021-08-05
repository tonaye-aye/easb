const audio = document.querySelectorAll('audio');
const buttons = document.querySelectorAll('.btn');
const sounds = [...audio];
const buttonsArray = [...buttons];

const container = document.querySelector('.container');
const input = document.querySelector('input');
const clear = document.querySelector('.clear');

const clearButton = () => {
  if (input.value) {
    clear.style.visibility = `visible`;
    clear.classList.add('close');
  } else {
    clear.style.visibility = `hidden`;
    clear.classList.remove('close');
  }
};

const createSoundCards = (data) => {
  data.forEach((result) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.append(result);
    container.append(card);
  });
};

['click', 'ontouchstart'].forEach((evt) => {
  buttons.forEach((button) => {
    button.addEventListener(evt, (e) => {
      const sound = sounds.find((item) => item.dataset.sound === e.target.id);
      let playing;
      sounds.forEach((item) => {
        if (!item.paused) return (playing = true);
      });
      if (!playing) sound.play();
    });
  });
});

input.addEventListener('keyup', (e) => {
  // toggle clear 'x' icon
  clearButton();
  // clear the search container
  container.innerHTML = '';
  // filter the data by matching the search keyword
  let searchResults = buttonsArray.filter((item) => {
    const regex = new RegExp(input.value, 'gi');
    return item.innerText.match(regex);
  });
  // if there are no search results lets return and put a message in
  if (searchResults.length === 0) {
    const message = document.createElement('div');
    message.classList.add('message');
    message.innerText = `Nothing found...`;
    container.append(message);
    return;
  }
  // otherwise if there is a search result, lets paint in the buttons
  createSoundCards(searchResults);
});

clear.addEventListener('click', () => {
  container.innerHTML = '';
  input.value = '';
  input.focus();
  clearButton();
  createSoundCards(buttonsArray);
});

// Code to handle install prompt on desktop
let deferredPrompt;
const addBtn = document.querySelector('.install');

addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});
