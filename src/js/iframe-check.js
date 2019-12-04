/**
 * Checks to see if page is loaded in an iframe. If so, load
 * some chrome and analytics to make it a standalone page.
 */
export default (function() {
  const inFrame = window.self !== window.top;
  if (!inFrame) {
    document.querySelector("body").classList.add("standalone");

    if (process.env.NODE_ENV !== "development") {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://aas.gannettdigital.com/PLOU-AAS-INTERACTIVES/jab.min.js";
      script.async = true;
      script.dataset.cfasync = false;
      document.body.appendChild(script);
    }
  }
})();
