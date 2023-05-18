const canvasHandle = document.getElementById("canvas");
const canvas = canvasHandle.getContext("2d");

import { nameDrink } from "./js/modules.js";
import { Level } from "./js/modules.js";

// funkcja generująca pole wyborów trunków
function drawButtonDrink() {
  const controls = document.querySelector(".controls");

  for (let i = 0; i <= 9; i++) {
    var drinks = document.createElement("button");
    drinks.setAttribute("id", i);
    drinks.innerHTML = "<img src='img/" + i + ".webp'><div>" + nameDrink[i] + "</div>";
    controls.appendChild(drinks);
  }

  // usunięcie diva z wyborem poziomów
  var removeLevelsChoice = document.querySelector(".diff-levels");
  removeLevelsChoice.remove();

  // przywrócenie elementowi widzialności
  const comment = (document.querySelector(".comment").style.opacity = 1);

  const board = document.getElementById("board");
  const back = document.createElement("div");
  back.classList.add("back");
  back.setAttribute("id", "backMenu");
  back.innerHTML = "↩ Powrót do Menu głównego";
  board.appendChild(back);

  back.addEventListener("click", function () {
    window.location.reload();
  });
}

// inicjowanie widoku początkowego
function startGame() {
  canvas.font = "45px Lobster";
  canvas.fillStyle = "#fff";
  canvas.fillText("Rozpocznij grę:", 270, 95);

  canvas.font = "25px Lobster";
  canvas.fillStyle = "#fff";
  canvas.fillText("Wybierz poziom trudności:", 270, 145);

  const board = document.getElementById("board");
  const difficultyLevels = document.createElement("div");
  difficultyLevels.classList.add("diff-levels");
  difficultyLevels.innerHTML =
    '<div id="level1" class="level">Po prostu opowieść</div> <div id="level2" class="level">Miecz i opowieść</div> <div id="level3" class="level">Krew, pot i łzy</div> <div id="level4" class="level">Droga ku zagładzie</div>';
  board.appendChild(difficultyLevels);
}

function generateLevel(level, canvas, click) {
  level.clearStartedBoard(canvas);
  level.generateSlot(click, canvas);
  level.initScore(canvas);

  for (let i = 0; i <= 9; i++) {
    let identificator = i;
    let fragment = document.getElementById(identificator);

    fragment.addEventListener("click", function (eventDrink) {
      let drink = eventDrink.currentTarget.id;
      click++;

      for (let i = 1; i <= level.whichLevel; i++) {
        if (i == click) {
          level.playerChoice[i] = drink;
          level.generateSlot(click, canvas);
          level.trycheck(click, canvas);
        }
      }

      if (click > level.whichLevel) {
        canvas.fillStyle = "#1a1a1a";
        canvas.fillRect(0, 30, 900, 130);
        canvas.fillRect(0, 330, 900, 130);
        document.querySelector(".comment").innerHTML =
          "Który z trunków wstawić w oznaczone miejsce?";
        level.score++;
        level.initScore(canvas);
        level.playerChoice = ["", "XXX", "XXX", "XXX", "XXX"];
        click = 0;
        level.generateSlot(click, canvas);
      }
    });
  }
}

window.addEventListener("load", function () {
  startGame();
});

document.body.addEventListener("click", function (event) {
  const targetElement = event.target;
  const targetId = targetElement.id;
  let click = 0;
  let level = "";
  switch (targetId) {
    case "level1":
      drawButtonDrink();
      level = new Level(targetId);
      generateLevel(level, canvas, click);
      break;
    case "level2":
      drawButtonDrink();
      level = new Level(targetId);
      generateLevel(level, canvas, click);
      break;
    case "level3":
      drawButtonDrink();
      level = new Level(targetId);
      generateLevel(level, canvas, click);
      break;
    case "level4":
      drawButtonDrink();
      level = new Level(targetId);
      generateLevel(level, canvas, click);
      break;
  }
});
