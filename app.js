const audio = document.querySelectorAll('audio');
const buttons = document.querySelectorAll('.btn');

const sounds = [...audio];

['click', 'ontouchstart'].forEach((evt) => {
  buttons.forEach((button) => {
    button.addEventListener(evt, (e) => {
      const sound = sounds.find((item) => item.dataset.sound === e.target.id);
      let playing;
      console.log(playing);
      sounds.forEach((item) => {
        if (!item.paused) return (playing = true);
      });
      if (!playing) sound.play();
    });
  });
});
