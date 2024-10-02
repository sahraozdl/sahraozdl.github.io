let isYearly = false;
let selectedPlan = null;
let selectedAddons = [];

function togglePricing() {
  const toggle = document.getElementById("priceToggle");
  isYearly = toggle.checked;

  const monthlyText = document.getElementById("monthlyText");
  const yearlyText = document.getElementById("yearlyText");

  // Toggle text colors
  if (isYearly) {
    monthlyText.classList.remove("active-color");
    monthlyText.classList.add("inactive-color");
    yearlyText.classList.remove("inactive-color");
    yearlyText.classList.add("active-color");
  } else {
    monthlyText.classList.remove("inactive-color");
    monthlyText.classList.add("active-color");
    yearlyText.classList.remove("active-color");
    yearlyText.classList.add("inactive-color");
  }

  const plans = [
    { id: "arcade", monthlyPrice: 9, yearlyPrice: 90 },
    { id: "advanced", monthlyPrice: 12, yearlyPrice: 120 },
    { id: "pro", monthlyPrice: 15, yearlyPrice: 150 },
  ];

  plans.forEach((plan) => {
    const priceDisplay = document.getElementById(`price-${plan.id}`);
    const discountMessage = priceDisplay.nextElementSibling; //discount message

    if (isYearly) {
      priceDisplay.innerText = `$${plan.yearlyPrice}/yr`;
      discountMessage.style.display = "block";
    } else {
      priceDisplay.innerText = `$${plan.monthlyPrice}/mo`;
      discountMessage.style.display = "none";
    }
  });

  const addons = [
    { id: "online-service", monthlyPrice: 1, yearlyPrice: 10 },
    { id: "larger-storage", monthlyPrice: 2, yearlyPrice: 20 },
    { id: "customizable-profile", monthlyPrice: 2, yearlyPrice: 20 },
  ];

  addons.forEach((addon) => {
    const priceDisplay = document.getElementById(`price-${addon.id}`);

    if (isYearly) {
      priceDisplay.innerText = `+$${addon.yearlyPrice}/yr`;
    } else {
      priceDisplay.innerText = `+$${addon.monthlyPrice}/mo`;
    }
  });
}

function updateSummary() {
  // selected plan icin
  const selectedPlanInput = document.querySelector(
    'input[name="plan"]:checked',
  );
  if (selectedPlanInput) {
    selectedPlan = {
      name:
        selectedPlanInput.value.charAt(0).toUpperCase() +
        selectedPlanInput.value.slice(1),
      price: isYearly
        ? parseInt(selectedPlanInput.dataset.yearlyPrice)
        : parseInt(selectedPlanInput.dataset.monthlyPrice),
    };
  }

  //selected add-onslar için
  selectedAddons = [];
  document
    .querySelectorAll('input[name="addon"]:checked')
    .forEach((addonInput) => {
      const addon = {
        name: addonInput.value.replace(/-/g, " "),
        price: isYearly
          ? parseInt(addonInput.dataset.yearlyPrice)
          : parseInt(addonInput.dataset.monthlyPrice),
      };
      selectedAddons.push(addon);
    });

  //selected plan and add-ons summary display
  if (selectedPlan) {
    document.getElementById("selectedPlan").innerText = `${
      selectedPlan.name
    } (${isYearly ? "Yearly" : "Monthly"})`;
    document.getElementById("selectedPlanPrice").innerText = `$${
      selectedPlan.price
    }/${isYearly ? "yr" : "mo"}`;
  }

  const addonText = selectedAddons
    .map((addon) => `${addon.name} +$${addon.price}/${isYearly ? "yr" : "mo"}`)
    .join("\n");
  document.getElementById("selectedAddons").innerText =
    addonText || "No add-ons selected";

  // calculate display total
  const total =
    selectedPlan.price +
    selectedAddons.reduce((acc, addon) => acc + addon.price, 0);
  document.getElementById("total").innerText = `Total (${
    isYearly ? "per year" : "per month"
  })`;
  document.getElementById("totalPrice").innerText = `+$${total}/${
    isYearly ? "yr" : "mo"
  }`;
}

//step 1da error için
function validateStep1() {
  let isValid = true;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
    //name
  if (!nameInput.value.trim()) {
    nameError.style.display = "block";
    nameInput.classList.add("invalid-input");
    isValid = false;
  } else {
    nameError.style.display = "none";
    nameInput.classList.remove("invalid-input");
  }

  //email
  if (!emailInput.value.trim() || !emailInput.validity.valid) {
    emailError.style.display = "block";
    emailInput.classList.add("invalid-input");
    isValid = false;
  } else {
    emailError.style.display = "none";
    emailInput.classList.remove("invalid-input");
  }

  // phone
  if (!phoneInput.value.trim()) {
    phoneError.style.display = "block";
    phoneInput.classList.add("invalid-input");
    isValid = false;
  } else {
    phoneError.style.display = "none";
    phoneInput.classList.remove("invalid-input");
  }

  if (isValid) {
    goToStep(2);
  }
}

function goToStep(step) {

  document.querySelectorAll(".form-step").forEach((stepElement) => {
    stepElement.classList.add("hidden");
    stepElement.classList.remove("visible");
  });


  document.getElementById("step" + step).classList.add("visible");
  document.getElementById("step" + step).classList.remove("hidden");


  const stepButtons = document.querySelectorAll(".sidebar__ul--li-number");
  stepButtons.forEach((button, index) => {
    if (index + 1 === step) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  if (step === 4) {
    updateSummary();
  }
}

document
  .getElementById("priceToggle")
  .addEventListener("change", togglePricing);
