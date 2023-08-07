window.onload = function () {
  const URL = document.getElementById('URL');

  function updateLinks() {
    // get the user's input
    const code = document.getElementById('userInput').value;
    // get the selected site
    const site = document.getElementById('siteSelector').value;

    // get all the links
    const links = document.querySelectorAll('#linkList a');

    // loop through the links and update the href
    links.forEach((link) => {
      let href = link.getAttribute('href');

      // Extract the path after the domain
      const path = href.split('https://odi-test.opensourcelearning.co.uk')[1];

      // Construct the new URL
      const newUrl = site + path.replace('[coursecode]', code);
      link.setAttribute('href', newUrl);
    });
  }

  URL.addEventListener('click', updateLinks);
};
