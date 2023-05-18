export const nameDrink = [
  "Czerwone wino z Toussaint",
  "Kaedweński stout",
  "Nalewka z mandragory",
  "Nilfgaardzka cytrynówka",
  "Redańska żołądkowa mocna",
  "Redański lager",
  "Spirytus krasnoludzki",
  "Temerska żytnia",
  "Wino białe z Beauclair",
  "Wyzimski Czempion",
];

export class Level {
  constructor(level) {
    this.level = level;
  }
  score = 1;
  click = 0;

  positionX = 0;
  positionXdrink = 0;
  positionXplus = 0;
  positionXplusUnderTextSlot = 0;
  positionYplusUnderTextSlot = 0;
  positionYunderSlot = 360;
  positionY = 0;
  width = 0;
  height = 0;

  whichLevel = 0;
  // tablica przechowująca aktualny wybór gracza
  playerChoice = ["", "XXX", "XXX", "XXX", "XXX"];
  trueDrink = ["", "", "", "", ""];

  currentCorrect = ["", "", "", ""];
  // czyszczenie planszu po widoku startowym
  clearStartedBoard(ctx) {
    switch (this.level) {
      case "level1":
        this.whichLevel = 4;
        this.positionX = 130;
        this.positionXdrink = 48;
        this.positionYdrink = 70;
        this.positionY = 50;
        this.positionYunderSlot = 360;
        this.positionXplus = 30;
        this.positionXplusUnderTextSlot = 50;
        this.positionYplusUnderTextSlot = 57;
        this.width = 80;
        this.height = 80;
        break;
      case "level2":
        this.whichLevel = 6;
        this.playerChoice = ["", "XXX", "XXX", "XXX", "XXX", "XXX", "XXX"];
        this.trueDrink = ["", "", "", "", "", "", ""];
        this.currentCorrect = ["", "", "", "", "", ""];

        this.positionX = 100;
        this.positionXdrink = 29;
        this.positionYdrink = 69;
        this.positionY = 50;
        this.positionYunderSlot = 360;
        this.positionXplus = 10;
        this.positionXplusUnderTextSlot = 30;
        this.positionYplusUnderTextSlot = 57;
        this.width = 80;
        this.height = 80;

        break;
      case "level3":
        this.whichLevel = 8;
        this.playerChoice = ["", "XXX", "XXX", "XXX", "XXX", "XXX", "XXX", "XXX", "XXX"];
        this.trueDrink = ["", "", "", "", "", "", "", "", ""];
        this.currentCorrect = ["", "", "", "", "", "", "", ""];

        this.positionX = 80;
        this.positionXdrink = 13;
        this.positionYdrink = 57;
        this.positionY = 50;
        this.positionYunderSlot = 365;
        this.positionXplus = 7;
        this.positionXplusUnderTextSlot = 18;
        this.positionYplusUnderTextSlot = 48;
        this.width = 60;
        this.height = 60;

        break;
      case "level4":
        this.whichLevel = 10;
        this.playerChoice = [
          "",
          "XXX",
          "XXX",
          "XXX",
          "XXX",
          "XXX",
          "XXX",
          "XXX",
          "XXX",
          "XXX",
          "XXX",
        ];
        this.trueDrink = ["", "", "", "", "", "", "", "", "", "", ""];
        this.currentCorrect = ["", "", "", "", "", "", "", "", "", ""];

        this.positionX = 70;
        this.positionXdrink = -4;
        this.positionYdrink = 57;
        this.positionY = 50;
        this.positionYunderSlot = 365;
        this.positionXplus = -10;
        this.positionXplusUnderTextSlot = 1;
        this.positionYplusUnderTextSlot = 48;
        this.width = 60;
        this.height = 60;

        break;
    }

    for (let i = 1; i <= this.whichLevel; i++) {
      this.trueDrink[i] = Math.floor(Math.random() * 10);
    }
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 30, 900, 130);
  }

  generateSlot(clicks, canvas) {
    let posX = this.positionX;
    let posXdrink = this.positionXdrink;
    let posYdrink = this.positionYdrink;
    let ctx = canvas;
    let click = clicks;

    for (let i = 1; i <= this.whichLevel; i++) {
      ctx.fillStyle = "#313131";
      ctx.fillRect(posX * i + this.positionXplus, this.positionY, this.width, this.height);

      if (i == click + 1) {
        ctx.strokeStyle = "white"; // kolor ramki
        ctx.lineWidth = 2; // grubość linii ramki
        ctx.strokeRect(
          posX * i + this.positionXplus + 1,
          this.positionY + 1,
          this.width - 3,
          this.height - 3
        );
      }

      if (this.playerChoice[i] != "XXX") {
        let image = new Image(22, 22);

        image.src = "img/" + this.playerChoice[i] + ".webp";
        image.addEventListener("load", function () {
          ctx.drawImage(image, posX * i + posXdrink, posYdrink, image.width * 2, image.height * 2);
        });
      }
    }
  }

  initScore(ctx) {
    //czyszczenie score
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(377, 210, 50, 45);
    ctx.fillRect(360, 280, 90, 45);

    ctx.strokeStyle = "#e2ff6d";
    ctx.beginPath();
    ctx.arc(401, 230, 45, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.fillStyle = "#e2ff6d";
    ctx.font = "45px Lobster";

    if (this.score < 10) ctx.fillText(this.score, 391, 245);
    else ctx.fillText(this.score, 382, 247);

    ctx.font = "24px Lobster";
    ctx.fillText("RUNDA", 362, 310);
  }

  trycheck(whichDrink, ctx) {
    let winner = true;
    for (let i = 1; i < this.whichLevel + 1; i++) {
      if (this.playerChoice[i] == this.trueDrink[i]) {
        this.currentCorrect[i - 1] = "✔";
      } else {
        let charQuestion = false;
        for (let j = 1; j <= this.whichLevel + 1; j++) {
          if (this.playerChoice[i] == this.trueDrink[j]) charQuestion = true;
        }
        if (charQuestion) {
          winner = false;
          this.currentCorrect[i - 1] = " ?";
        } else {
          winner = false;
          this.currentCorrect[i - 1] = "✖";
        }
      }
    }

    if (whichDrink == this.whichLevel) {
      for (let i = 0; i < this.whichLevel; i++) {
        ctx.fillStyle = "#313131";
        ctx.fillRect(
          this.positionX * (i + 1) + this.positionXplus,
          this.positionYunderSlot,
          this.width,
          this.height
        );

        ctx.fillStyle = "#e2ff6d";
        ctx.font = "45px Lobster";
        ctx.fillText(
          this.currentCorrect[i],
          this.positionX * (i + 1) + this.positionXplusUnderTextSlot,
          this.positionYunderSlot + this.positionYplusUnderTextSlot
        );
      }
      if (winner == false) {
        console.log(this.playerChoice);
        console.log(this.trueDrink);
        document.querySelector(".comment").innerHTML =
          "Niestety nie udało się odgadnąć poprawnej kolejności alkoholi, kliknij w dowolny trunek, aby spróbować w kolejnej rundzie.";
      } else {
        document.querySelector(".comment").innerHTML =
          "BRAWO!!! Udało się odgadnąć poprawną kolejność butelek.";
        let newGameBtn = document.createElement("div");
        newGameBtn.innerHTML = "<a href='/WITCHER-MASTERMAIND/'>Kliknij aby ponownie zagrać</a>";
        document.querySelector(".comment").appendChild(newGameBtn);

        document.querySelector(".controls").style.display = "none";
      }
    }
  }
}
