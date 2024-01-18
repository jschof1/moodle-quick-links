window.onload = function () {
  function updateSiteSelector(siteOne, siteOneName, siteTwo, siteTwoName) {
    document.getElementById("siteSelector").innerHTML = `
      <option value="https://${siteOne}">${siteOneName}</option>
      <option value="https://${siteTwo}">${siteTwoName}</option>
    `;
  }

  function loadStoredLinks() {
    const storedTestSite =
      localStorage.getItem("testSite") || "odi-test.opensourcelearning.co.uk";
    const storedLiveSite =
      localStorage.getItem("liveSite") || "moodle.learndata.info";
    const storedTestSiteName =
      localStorage.getItem("testSiteName") || "Test Site";
    const storedLiveSiteName =
      localStorage.getItem("liveSiteName") || "Live Site";

    updateSiteSelector(
      storedTestSite,
      storedTestSiteName,
      storedLiveSite,
      storedLiveSiteName
    );

    // Load the stored values into the input fields
    document.getElementById("testSite").value = storedTestSite;
    document.getElementById("liveSite").value = storedLiveSite;
    document.getElementById("testSiteName").value = storedTestSiteName;
    document.getElementById("liveSiteName").value = storedLiveSiteName;
  }

  document.getElementById("submit").addEventListener("click", function () {
    const siteOne = document.getElementById("testSite").value;
    const siteTwo = document.getElementById("liveSite").value;
    const siteOneName =
      document.getElementById("testSiteName").value || "Test Site";
    const siteTwoName =
      document.getElementById("liveSiteName").value || "Live Site";

    if (siteOne && siteTwo) {
      localStorage.setItem("testSite", siteOne);
      localStorage.setItem("liveSite", siteTwo);
      localStorage.setItem("testSiteName", siteOneName);
      localStorage.setItem("liveSiteName", siteTwoName);
      updateSiteSelector(siteOne, siteOneName, siteTwo, siteTwoName);
    } else {
      alert("Please enter valid URLs and names.");
    }
  });

  loadStoredLinks();
  function clearLocalStorage() {
    localStorage.clear();

    // Reset input fields and dropdowns if needed
    document.getElementById("testSite").value = "";
    document.getElementById("liveSite").value = "";
    document.getElementById("testSiteName").value = "";
    document.getElementById("liveSiteName").value = "";
    updateSiteSelector(
      "odi-test.opensourcelearning.co.uk",
      "Test Site",
      "moodle.learndata.info",
      "Live Site"
    );
  }

  document
    .getElementById("clearStorage")
    .addEventListener("click", function () {
      if (confirm("Are you sure you want to clear all stored data?")) {
        clearLocalStorage();
      }
    });

  const originalHrefs = {};

  function updateLinks() {
    const code = document.getElementById("userInput").value;
    const site = document.getElementById("siteSelector").value;
    const links = document.querySelectorAll(".link-list a");

    links.forEach((link, index) => {
      if (!originalHrefs[index]) {
        originalHrefs[index] = link.getAttribute("href");
      }

      let href = originalHrefs[index];

      if (href.includes("[coursecode]")) {
        href = href.replace("[coursecode]", code);
      }

      link.setAttribute("href", site + href);
    });
  }

  document.getElementById("userInput").addEventListener("change", updateLinks);
  document
    .getElementById("siteSelector")
    .addEventListener("change", updateLinks);
};

document.querySelectorAll(".addLinkButton").forEach((button) => {
  button.addEventListener("click", function () {
    const section = this.getAttribute("data-section");
    const inputContainer = document.getElementById(section + "Inputs");

    if (inputContainer.children.length === 0) {
      createInputFields(inputContainer, section);
    } else {
      inputContainer.style.display = "block";
    }
  });
});

function createInputFields(container, section) {
  const linkNameInput = createInput("text", "newLinkName", "Enter link name");
  const linkURLInput = createInput("text", "newLinkURL", "Enter link URL");
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", function () {
    addLinkToList(section);
  });

  container.appendChild(linkNameInput);
  container.appendChild(linkURLInput);
  container.appendChild(submitButton);

  container.style.display = "block";
}

function createInput(type, id, placeholder) {
  const input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("id", id);
  input.setAttribute("placeholder", placeholder);
  return input;
}
function addLinkToList(section) {
  const linkName = document.getElementById("newLinkName").value;
  const linkURL = document.getElementById("newLinkURL").value;

  if (linkName && linkURL) {
    const newListItem = document.createElement("li");
    const newLink = document.createElement("a");
    newLink.setAttribute("href", linkURL);
    newLink.setAttribute("target", "_blank");
    newLink.textContent = linkName;

    const targetList = document.getElementById(section);
    if (targetList) {
      targetList.appendChild(newListItem);
      newListItem.appendChild(newLink);

      // Clear and hide the input fields
      const inputContainer = document.getElementById(section + "Inputs");
      if (inputContainer) {
        inputContainer.style.display = "none";
        inputContainer.innerHTML = "";
      }
    } else {
      console.error("Target list not found for section:", section);
    }
  } else {
    alert("Please enter both a name and a URL for the link.");
  }
}
