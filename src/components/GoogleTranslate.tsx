


import React, { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
    _googleTranslateInitialized?: boolean;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    const removeTranslateTooltips = () => {
      const removeTitles = () => {
        document.querySelectorAll("[title]").forEach((el) => {
          el.removeAttribute("title");
        });
      };

      removeTitles();
      const observer = new MutationObserver(removeTitles);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    };

    const initializeTranslate = () => {
      try {
        if (
          window.google &&
          window.google.translate &&
          !window._googleTranslateInitialized
        ) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "zh-CN",
              includedLanguages: "en,zh-CN",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element"
          );

         
          const removePopup = document.getElementById("goog-gt-tt");
          if (removePopup?.parentNode) {
            removePopup.parentNode.removeChild(removePopup);
          }

          removeTranslateTooltips();
          window._googleTranslateInitialized = true;

          // Force layout refresh
          setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
          }, 300);
        }
      } catch (err) {
        console.error("Google Translate Init Error:", err);
      }
    };

    const addTranslateScript = () => {
      if (document.getElementById("google-translate-script")) {
        initializeTranslate();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.id = "google-translate-script";
      script.async = true;

      document.body.appendChild(script);
    };

    // Save selected language before reload
    const saveLangChange = () => {
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      combo?.addEventListener('change', () => {
        const selected = combo.value;
        if (selected) {
          localStorage.setItem('GOOGLE_TRANSLATE_LANG', selected);
        }
      });
    };

    
    window.googleTranslateElementInit = () => {
      initializeTranslate();
      saveLangChange();
    };

    addTranslateScript();

   
    return () => {
      window._googleTranslateInitialized = false;
    };
  }, []);

  return <div id="google_translate_element" style={{ display: "inline-block", zIndex: 9999 }} />;
};

export default GoogleTranslate;



