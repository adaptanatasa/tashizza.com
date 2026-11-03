/*
 * Prism.js – učitavanje isticanja sintakse
 * TASHIZZA tutorijali
 */

(function () {
  "use strict";

  const prismBase =
    "https://cdn.jsdelivr.net/npm/prismjs@1.30.0/components/";

  const languages = [
    "prism-core.min.js",
    "prism-markup.min.js",
    "prism-css.min.js",
    "prism-clike.min.js",
    "prism-javascript.min.js",
    "prism-bash.min.js",
    "prism-python.min.js",
    "prism-sql.min.js",
    "prism-markup-templating.min.js",
    "prism-php.min.js",
    "prism-yaml.min.js",
    "prism-json.min.js",
    "prism-powershell.min.js",
    "prism-java.min.js",
    "prism-c.min.js",
    "prism-cpp.min.js",
    "prism-docker.min.js"
  ];

  function loadScript(file) {
    return new Promise(function (resolve, reject) {
      const script = document.createElement("script");

      script.src = prismBase + file;
      script.async = false;

      script.onload = resolve;

      script.onerror = function () {
        reject(
          new Error("Prism nije uspeo da učita fajl: " + file)
        );
      };

      document.head.appendChild(script);
    });
  }

  async function loadPrism() {
    try {
      for (const language of languages) {
        await loadScript(language);
      }

      if (window.Prism) {
        Prism.highlightAll();
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadPrism);
  } else {
    loadPrism();
  }
})();
