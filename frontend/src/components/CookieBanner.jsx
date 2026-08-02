import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { language } = useLanguage();

  const translations = {
    de: {
      title: 'Cookie-Einstellungen',
      description: 'Wir verwenden Cookies und ähnliche Technologien, um die Nutzung unserer Website zu analysieren und unsere Inhalte zu verbessern. Dazu setzen wir Google Analytics und PostHog ein. Mit Klick auf „Akzeptieren" stimmen Sie der Verwendung dieser Dienste zu.',
      accept: 'Akzeptieren',
      decline: 'Ablehnen'
    },
    en: {
      title: 'Cookie Settings',
      description: 'We use cookies and similar technologies to analyze the use of our website and improve our content. For this purpose, we use Google Analytics and PostHog. By clicking "Accept", you consent to the use of these services.',
      accept: 'Accept',
      decline: 'Decline'
    }
  };

  const t = translations[language] || translations.de;

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      // Показываем баннер только если пользователь еще не сделал выбор
      setShowBanner(true);
    } else if (consent === 'accepted') {
      // Если согласие уже дано, загружаем аналитику
      loadAnalytics();
    }
  }, []);

  const loadAnalytics = () => {
    // Google Analytics
    if (!window.gtag) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-V43QVMJWJT';
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-V43QVMJWJT');
      `;
      document.head.appendChild(script2);
    }

    // PostHog
    if (!window.posthog || !window.posthog.__loaded) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init me ws ys ps bs capture je Di ks register register_once register_for_session unregister unregister_for_session Ps getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Es $s createPersonProfile Is opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Ss debug xs getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('phc_yJW1VjHGGwmCbbrtczfqqNxgBDbhlhOWcdzcIJEOTFE',{api_host:'https://us.i.posthog.com',person_profiles:'identified_only'});
      `;
      document.body.appendChild(script);
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    loadAnalytics();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/90 to-transparent backdrop-blur-lg">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">{t.title}</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {t.description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleDecline}
                className="px-6 py-3 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {t.decline}
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
