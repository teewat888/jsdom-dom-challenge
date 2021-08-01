window.addEventListener("DOMContentLoaded", (e) => {
  let counter = document.getElementById("counter");
  let mytimer; //intervalID
  let pauseState = false;

  const up = () => (counter.innerText = parseInt(counter.innerText) + 1);
  const down = () => (counter.innerText = parseInt(counter.innerText) - 1);
  const counting = () => {
    mytimer = setInterval(() => {
      up();
    }, 1000);
  };

  counting(); //set counting at start

  const pause = document.getElementById("pause");
  const minus = document.getElementById("minus");
  const plus = document.getElementById("plus");
  const heart = document.getElementById("heart");
  const comments = document.getElementById("list");
  const commentInput = document.getElementById("comment-input");
  const submitBtn = document.getElementById("submit");

  pause.addEventListener("click", () => {
    if (!pauseState) {
      clearInterval(mytimer);
      pauseState = true;
      pause.innerText = "resume";
      minus.disabled = true;
      plus.disabled = true;
      heart.disabled = true;
    } else if (pauseState) {
      counting();
      pauseState = false;
      pause.innerText = "pause";
      minus.disabled = false;
      plus.disabled = false;
      heart.disabled = false;
    }
  });

  minus.addEventListener("click", () => {
    down();
  });

  plus.addEventListener("click", () => {
    up();
  });

  let ulLike = document.getElementsByClassName("likes")[0];

  const likes = [];
  const likeObj = Object.assign({ number: "" }, { count: 1 });
  likes.push(likeObj);

  const makeLikeStatement = (likes) => {
    const foundId = likes.findIndex(
      (like) => like.number === counter.innerText
    );

    if (foundId !== -1) {
      likes[foundId].count++;
      const li = document.getElementById(`li${likes[foundId].number}`);
      li.innerText =
        likes[foundId].number +
        " has been liked " +
        likes[foundId].count +
        " times";
    } else {
      const newLike = Object.assign(
        { number: `${counter.innerText}` },
        { count: 1 }
      );
      const likesLength = likes.push(newLike);
      const myLi = document.createElement("li");
      myLi.setAttribute("id", `li${likes[likesLength - 1].number}`);
      myLi.innerText =
        likes[likesLength - 1].number +
        " has been liked " +
        likes[likesLength - 1].count +
        " time";
      ulLike.appendChild(myLi);
    }
  };

  heart.addEventListener("click", () => {
    makeLikeStatement(likes);
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const commentItem = document.createElement("p");
    commentItem.innerText = commentInput.value;
    comments.appendChild(commentItem);
  });
});
