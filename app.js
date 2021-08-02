const audio = document.querySelectorAll('audio');
const buttons = document.querySelectorAll('.btn');

const container = document.querySelector('.container');
const input = document.querySelector('input');
const clear = document.querySelector('.clear');

const sounds = [...audio];

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
  input.value
    ? (clear.style.visibility = `visible`)
    : (clear.style.visibility = `hidden`);
  // clear the search container
  container.innerHTML = '';
  // get all of the sound buttons and save to data array
  let data = [...buttons];
  // filter the data by matching the search keyword
  let searchResults = data.filter((item) => {
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
  searchResults.forEach((result) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.append(result);
    container.append(card);
  });
});
