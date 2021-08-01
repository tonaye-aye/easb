const audio = document.querySelectorAll('audio');
const buttons = document.querySelectorAll('.btn');

const container = document.querySelector('.container');
const input = document.querySelector('input');

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
  container.innerHTML = '';
  let data = [...buttons];
  let searchResults = data.filter((item) => {
    const regex = new RegExp(input.value, 'gi');
    return item.innerText.match(regex);
  });
  if (searchResults.length === 0) {
    container.innerText = `We'll be right back...`;
    return;
  }
  // container.innerText = '';
  // // paint the search results, starting the cycle again
  // paintElements(searchResults);
  searchResults.forEach((result) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.append(result);
    container.append(card);
  });
});
