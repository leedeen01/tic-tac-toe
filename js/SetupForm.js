export default class SetupForm {
    constructor(containerElement, onSubmit) {
      this.containerElement = containerElement;
      this.onSubmit = onSubmit;
      this.renderForm();
    }
  
    renderForm() {
      this.containerElement.innerHTML = "";
      const form = document.createElement("form");
      form.classList.add("setup-form");
  
      const player1Label = document.createElement("label");
      player1Label.textContent = "Enter Player 1 name (X): ";
      const player1Input = document.createElement("input");
      player1Input.type = "text";
      player1Input.name = "player1Name";
      player1Input.value = "Player 1";
      player1Label.appendChild(player1Input);
      form.appendChild(player1Label);

      const player2Label = document.createElement("label");
      player2Label.textContent = "Enter Player 2 name (O): ";
      const player2Input = document.createElement("input");
      player2Input.type = "text";
      player2Input.name = "player2Name";
      player2Input.value = "Player 2";
      player2Label.appendChild(player2Input);
      form.appendChild(player2Label);
      
      const vsComputerLabel = document.createElement("label");
      vsComputerLabel.textContent = "Play against the computer? ";
      const vsComputerCheckbox = document.createElement("input");
      vsComputerCheckbox.type = "checkbox";
      vsComputerCheckbox.name = "vsComputer";
      vsComputerCheckbox.checked = true;
      vsComputerLabel.appendChild(vsComputerCheckbox);
      form.appendChild(vsComputerLabel);
  
      player2Label.style.display = vsComputerCheckbox.checked ? "none" : "block";
      vsComputerCheckbox.addEventListener("change", () => {
        player2Label.style.display = vsComputerCheckbox.checked ? "none" : "block";
      });
  
      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.textContent = "Start Game";
      form.appendChild(submitButton);
  
      this.containerElement.appendChild(form);
  
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name1 = player1Input.value.trim() || "Player 1";
        const vsComputer = vsComputerCheckbox.checked;
        const name2 = vsComputer
          ? "Computer"
          : player2Input.value.trim() || "Player 2";
  
        if (this.onSubmit && typeof this.onSubmit === "function") {
          this.onSubmit({ player1Name: name1, player2Name: name2, vsComputer });
        }
      });
    }
  }
  