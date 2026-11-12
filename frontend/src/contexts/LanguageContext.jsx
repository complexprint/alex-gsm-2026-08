import React, { createContext, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LanguageContext = createContext();

const translations = {
  de: {
    // Header
    downloadCV: 'CV herunterladen',

    // Home
    heroTitle: 'Echte Profis gefragt?',
    heroSubtitle: 'Wir haben 8 Jahre für Sie gelernt.',
    makeOffer: 'Angebot machen',
    promoText: 'Klicken Sie auf \'Angebot machen\' und erhalten Sie 100 Euro.',
    promoTextDeutsch: 'Klicken Sie auf \'Angebot machen\' und erhalten Sie 100 Euro.',
    promoTextEnglish: 'Click the \'Make an Offer\' button and receive 100 euros.',
    promoTextEspanol: 'Haga clic en \'Hacer una oferta\' y reciba 100 euros.',
    promoTextChinese: '點擊提出報價按鈕即可獲得100歐元',
    watchVideo: 'Video ansehen',

    // Navigation
    navAbout: 'Über mich',
    navEducation: 'Ausbildung',
    navExperience: 'Erfahrung & Projekte',
    navSkills: 'Kompetenzen',
    navContact: 'Kontakt',
    navTrends: 'Marketing Trends',

    // About
    aboutTitle: 'Über mich',
    aboutText1: 'Seit meinem 14. Lebensjahr lebe und studiere ich eigenständig in Österreich. Diese Erfahrung hat mich früh unabhängig, resilient und interkulturell äußerst kompetent gemacht.',
    aboutText2: 'Derzeit studiere ich im 1. Studienjahr des Masterstudiengangs Global Sales and Marketing an der FH Oberösterreich in Steyr (100 % englischsprachig). Meinen Bachelorabschluss habe ich im Juni 2026 erfolgreich abgeschlossen. Zuvor vertiefte mein Auslandssemester an der Providence University in Taiwan (2024/25) meine Chinesischkenntnisse sowie mein Verständnis für den asiatischen Markt.',
    aboutText3: 'Ich brenne für nachhaltige Technologien, internationale Geschäftsentwicklung und überzeugende Kommunikation, ob auf der Bühne oder im direkten Kundengespräch.',

    // Nachhilfe / Tutoring
    tutorEyebrow: 'Sprachnachhilfe & Sprachtraining',
    tutorTitle: 'Private Nachhilfe: Deutsch, Englisch & Russisch',
    tutorLocation: 'In Linz (Einzelunterricht vor Ort) oder flexibel online',
    tutorIntro1: 'Hallo! Ich bin Alex und unterstütze dich gerne beim Deutschlernen – im individuellen Einzelunterricht direkt in Linz oder bequem online.',
    tutorIntro2: 'Meine Muttersprache ist Russisch, Deutsch habe ich selbst als Fremdsprache gelernt und spreche es heute auf muttersprachlichem C2-Niveau. Ich weiß daher aus eigener Erfahrung genau, wo die typischen Stolpersteine liegen (Artikel, Fälle, Satzbau) und was in der Praxis wirklich hilft. Zusätzlich spreche ich fließend Englisch, Spanisch (B2), Chinesisch (HSK 3) und etwas Schwedisch – Erklärungen kann ich bei Bedarf also auch problemlos auf Englisch oder Russisch geben.',
    tutorIntro3: 'Ich habe mein Bachelorstudium Global Sales and Marketing an der FH Oberösterreich abgeschlossen (100 % auf Englisch), ein Auslandssemester in Taiwan verbracht, 2021 den mehrsprachigen Redewettbewerb „SAG’S MULTI!“ gewonnen und schreibe regelmäßig als Kolumnist bei MeinBezirk. Neben Deutsch biete ich auch qualifizierte Nachhilfe in Englisch sowie Russisch für jedes Niveau an.',
    tutorFocusTitle: 'Meine Schwerpunkte:',
    tutorFocus1Title: 'Konversation & Alltag',
    tutorFocus1Desc: 'Sicher und frei sprechen, ohne Angst vor Fehlern – von Smalltalk bis zu tiefen Diskussionen.',
    tutorFocus2Title: 'Deutsch & Englisch im Beruf',
    tutorFocus2Desc: 'Bewerbungen, professionelle E-Mails, Vorträge, Präsentationen und Vorstellungsgespräche.',
    tutorFocus3Title: 'Grammatik & Wortschatz',
    tutorFocus3Desc: 'Nur so viel Theorie wie nötig, immer mit greifbarem Praxisbezug und alltagstauglichen Beispielen.',
    tutorOutro: 'Ich nehme mir viel Zeit für die Vorbereitung, gehe individuell auf deine Ziele ein und erkläre geduldig in klaren Schritten. Egal ob Schultraining, Prüfungsvorbereitung oder berufliche Weiterbildung – wir gestalten jede Einheit genau nach deinen Bedürfnissen. In der ersten Stunde lernen wir uns kennen, klären dein aktuelles Niveau und definieren gemeinsam die nächsten Etappen.',
    tutorCtaButton: 'Profil auf Nachhilfen24.at ansehen & anfragen',
    tutorCtaSubtext: 'Oder schreib mir direkt per E-Mail an alekseibespechnyi@outlook.com',
    tutorBadgeLevel: 'Deutsch C2 • Englisch C1 • Russisch Native',

    // Education
    educationTitle: 'Ausbildung',
    edu0Title: 'Master of Arts – Global Sales and Marketing',
    edu0Date: '2026 – 2028',
    edu1Title: 'Bachelor of Arts – Global Sales & Marketing',
    edu1Location: 'FH Oberösterreich, Campus Steyr',
    edu1Date: '09.2023 – 06.2026',
    edu2Title: 'Auslandssemester',
    edu2Location: 'Providence University 靜宜大學, Taichung, Taiwan',
    edu2Date: '09.2024 – 02.2025',
    edu3Title: 'Handelsakademie Oberwart (HAK) – Schwerpunkt Unternehmensführung',
    edu3Location: 'Matura mit Auszeichnung',
    edu3Date: '2023',

    // Experience
    experienceTitle: 'Erfahrung & Projekte',
    exp0Title: 'Praktikant Vertrieb & Digital Marketing',
    exp0Company: 'Roll Out Innovation GmbH (partyboss.at)',
    exp0Date: 'Seit 01.02.2026',
    exp0Desc: 'Aufbau von Vertrieb und digitaler Sichtbarkeit für die Partybus-Vermietungsplattform. Marktanalyse, Content-Strategie, Social Media und Optimierung der Kundenansprache. Zusätzlich Digital Marketing für soziale Projekte (Zukunft Jugend).',
    exp1Title: 'Praktikant Nachhaltigkeit & XR-Technologien',
    exp1Company: 'NXRT GmbH, Wien',
    exp1Desc: 'Analyse der SDGs-Relevanz von AR/VR-Lösungen, Erstellung von Präsentationen für Investoren',
    exp2Title: 'Service & Upselling',
    exp2Company: 'Restaurant La Galeria, Steyr',
    exp2Date: '2023–2024',
    exp2Desc: 'Deutliche Umsatzsteigerung durch aktives Upselling und Kundenbindung',
    exp3Title: 'Administratives Praktikum (Pflichtpraktikum)',
    exp3Company: 'STEP Gästehäuser Pinkafeld (Verein zur Förderung der Schulen in Pinkafeld)',
    exp3Location: 'Pinkafeld, Österreich',
    exp3Date: 'August 2020',
    exp3Desc: 'Administrative Unterstützung, Arbeit mit Bank- und Kundensystemen, Datenbankpflege (Excel, Access)',
    exp4Title: 'Junior Company',
    exp4Company: 'HAK Oberwart',
    exp4Desc: 'Gründung und Führung eines echten Schülerunternehmens (Produktion, Marketing, Finanzen)',
    exp5Title: 'Österreichischer Rhetorik-Meister',
    exp5Company: 'SAG\'S MULTI!',
    exp5Date: '2020/21',
    exp6Title: 'Bootcamp Wien',
    exp6Desc: 'SDGs, Moonshot-Thinking, Exponential Technologies & Pitching',

    // Skills
    skillsTitle: 'Kompetenzen',
    skillsLanguages: 'Sprachen',
    skillsIT: 'IT',
    skillsSoft: 'Soft Skills',
    langRussian: 'Russisch (Muttersprache)',
    langGerman: 'Deutsch (C2 verhandlungssicher)',
    langEnglish: 'Englisch (C1)',
    langSpanish: 'Spanisch (B2)',
    langChinese: 'Chinesisch (HSK3)',
    itSAP: 'SAP (MM, FI, SD)',
    itExcel: 'Excel (fortgeschritten)',
    itAccess: 'Access',
    itOffice: 'Office 365',
    softUpselling: 'Upselling & Verkaufstechniken',
    softIntercultural: 'Interkulturelle Kommunikation',
    softPresentation: 'Präsentation & Rhetorik',
    softEntrepreneurial: 'Unternehmerisches Denken',
    softResilience: 'Hohe Belastbarkeit',

    // Contact
    contactTitle: 'Kontakt',
    contactIntro: 'Ich freue mich auf Ihre Nachricht!',
    contactInternship: 'Verfügbar ab Juli 2026 für feste Positionen',
    contactFlexible: 'Flexibel einsetzbar in Linz, Steyr, Wien oder remote',

    // Footer
    footerRights: '© 2025 Aleksei Bespechnyi. Alle Rechte vorbehalten.',

    // Trends Page
    trendsTitle: 'Digitale Marketing Trends',
    trendsSubtitle: 'Aktuelle Nachrichten und Insights aus der SEO- und Digital-Marketing-Branche',
    trendsArticles: 'Artikel',
    trendsSources: 'Quellen',
    trendsLastUpdate: 'Letzte Aktualisierung',
    trendsSearchPlaceholder: 'Artikel nach Titel, Zusammenfassung oder Kategorie suchen...',
    trendsFilterBy: 'Filtern nach',
    trendsAllSources: 'Alle Quellen',
    trendsReadMore: 'Weiterlesen',
    trendsNoResults: 'Keine Artikel gefunden. Versuchen Sie, Ihre Suche anzupassen.',
    trendsLoading: 'Nachrichten werden geladen...',
    trendsError: 'Fehler beim Laden der Nachrichten',
    trendsRetry: 'Erneut versuchen',
    trendsAutoUpdate: 'Die Nachrichten werden automatisch zweimal täglich aktualisiert',
  },
  en: {
    // Header
    downloadCV: 'Download CV',

    // Home
    heroTitle: 'Need a real pro?',
    heroSubtitle: 'We trained for 8 years to serve you.',
    makeOffer: 'Do an offer',
    promoText: 'Click the \'Make an Offer\' button and receive 100 euros.',
    promoTextDeutsch: 'Klicken Sie auf \'Angebot machen\' und erhalten Sie 100 Euro.',
    promoTextEnglish: 'Click the \'Make an Offer\' button and receive 100 euros.',
    promoTextEspanol: 'Haga clic en \'Hacer una oferta\' y reciba 100 euros.',
    promoTextChinese: '點擊提出報價按鈕即可獲得100歐元',
    watchVideo: 'Watch Video',

    // Navigation
    navAbout: 'About Me',
    navEducation: 'Education',
    navExperience: 'Experience & Projects',
    navSkills: 'Skills',
    navContact: 'Contact',
    navTrends: 'Marketing Trends',

    // About
    aboutTitle: 'About Me',
    aboutText1: 'I have been living and studying independently in Austria since the age of 14 – an experience that made me mature, resilient and truly intercultural.',
    aboutText2: "Currently in my first year of the English-taught Master's programme Global Sales and Marketing at FH Upper Austria (Steyr Campus). I successfully completed my Bachelor's degree in June 2026. Previously, my exchange semester at Providence University in Taiwan (2024/25) deepened my Chinese language skills and understanding of Asian markets.",
    aboutText3: 'Passionate about sustainable technologies, international business development and persuasive communication – on stage and in front of clients.',

    // Nachhilfe / Tutoring
    tutorEyebrow: 'Language Tutoring & Coaching',
    tutorTitle: 'Private Tutoring: German, English & Russian',
    tutorLocation: 'In-person in Linz or flexible online sessions',
    tutorIntro1: 'Hello! I am Alex and I would love to support you in learning German – in private 1-on-1 sessions in Linz or conveniently online.',
    tutorIntro2: 'My native language is Russian; I learned German as a foreign language myself and speak it at native-level C2 today. From firsthand experience, I know the typical pitfalls (articles, cases, sentence structure) and what truly helps you progress. I also speak fluent English, Spanish (B2), Mandarin Chinese (HSK 3) and some Swedish, allowing me to give explanations in English or Russian whenever helpful.',
    tutorIntro3: 'I recently completed my Bachelor\'s degree in Global Sales and Marketing at FH Upper Austria (100% in English), spent an exchange semester in Taiwan, won the Austrian multilingual public speaking contest "SAG’S MULTI!" in 2021, and write regularly as a columnist for MeinBezirk. Alongside German, I also offer tailored tutoring in English and Russian for all skill levels.',
    tutorFocusTitle: 'Core Focus Areas:',
    tutorFocus1Title: 'Conversation & Everyday Life',
    tutorFocus1Desc: 'Speak confidently and fluently without fear of mistakes – from daily dialogue to in-depth discussion.',
    tutorFocus2Title: 'Business German & English',
    tutorFocus2Desc: 'Job applications, professional emails, presentations, pitches and interview preparation.',
    tutorFocus3Title: 'Grammar & Practical Vocabulary',
    tutorFocus3Desc: 'Only as much theory as necessary, always connected to real-world context and practical examples.',
    tutorOutro: 'I invest dedicated time in preparation, tailor every lesson to your personal goals, and explain patiently in structured steps. Whether school support, exam prep or professional development – we shape each session around your exact needs. In our first session, we get to know each other, evaluate your level and set your learning milestones together.',
    tutorCtaButton: 'View profile & book on Nachhilfen24.at',
    tutorCtaSubtext: 'Or reach out directly via email at alekseibespechnyi@outlook.com',
    tutorBadgeLevel: 'German C2 • English C1 • Russian Native',

    // Education
    educationTitle: 'Education',
    edu0Title: 'Master of Arts – Global Sales and Marketing',
    edu0Date: '2026 – 2028',
    edu1Title: 'Bachelor of Arts – Global Sales & Marketing',
    edu1Location: 'University of Applied Sciences Upper Austria, Steyr Campus',
    edu1Date: 'Sep 2023 – Jun 2026',
    edu2Title: 'Exchange semester',
    edu2Location: 'Providence University, Taiwan',
    edu2Date: 'Sep 2024 – Feb 2025',
    edu3Title: 'Handelsakademie Oberwart (commercial college) – focus business management',
    edu3Location: 'Graduated with distinction',
    edu3Date: '2023',

    // Experience
    experienceTitle: 'Experience & Projects',
    exp0Title: 'Sales & Digital Marketing Intern',
    exp0Company: 'Roll Out Innovation GmbH (partyboss.at)',
    exp0Date: 'Since 01.02.2026',
    exp0Desc: 'Building sales and digital visibility for the party bus rental platform. Market analysis, content strategy, social media and customer outreach optimization. Additionally digital marketing for social projects (Zukunft Jugend).',
    exp1Title: 'Sustainability & XR Intern',
    exp1Company: 'NXRT GmbH, Vienna',
    exp1Desc: 'SDG relevance analysis of AR/VR solutions, investor presentations',
    exp2Title: 'Service & Upselling',
    exp2Company: 'La Galeria Italian Restaurant, Steyr',
    exp2Date: '2023–2024',
    exp2Desc: 'Significant revenue increase through active upselling',
    exp3Title: 'Administrative Internship (Mandatory Internship)',
    exp3Company: 'STEP Gästehäuser Pinkafeld (Association for the Promotion of Schools in Pinkafeld)',
    exp3Location: 'Pinkafeld, Austria',
    exp3Date: 'August 2020',
    exp3Desc: 'Administrative support, work with banking and customer systems, database maintenance (Excel, Access)',
    exp4Title: 'Junior Company',
    exp4Company: 'founded and managed a real student company (full cycle)',
    exp4Desc: '',
    exp5Title: 'Austrian public speaking champion',
    exp5Company: 'SAG\'S MULTI!',
    exp5Date: '2020/21',
    exp6Title: 'Vienna Bootcamp',
    exp6Desc: 'SDGs, Moonshot Thinking, Exponential Tech & Pitch Training',

    // Skills
    skillsTitle: 'Skills',
    skillsLanguages: 'Languages',
    skillsIT: 'Tools',
    skillsSoft: 'Key Strengths',
    langRussian: 'Russian (native)',
    langGerman: 'German (C2/business fluent)',
    langEnglish: 'English (C1)',
    langSpanish: 'Spanish (B2)',
    langChinese: 'Chinese (HSK3)',
    itSAP: 'SAP (MM, FI, SD)',
    itExcel: 'Advanced Excel',
    itAccess: 'Access',
    itOffice: 'Office 365',
    softUpselling: 'Upselling & sales techniques',
    softIntercultural: 'Intercultural competence',
    softPresentation: 'Public speaking & pitching',
    softEntrepreneurial: 'Entrepreneurial mindset',
    softResilience: 'High resilience',

    // Contact
    contactTitle: 'Contact',
    contactIntro: 'Looking forward to your message!',
    contactInternship: 'Available from July 2026 for permanent positions',
    contactFlexible: 'Flexible deployment in Linz, Steyr, Vienna or remote',

    // Footer
    footerRights: '© 2025 Aleksei Bespechnyi. All rights reserved.',

    // Trends Page
    trendsTitle: 'Digital Marketing Trends',
    trendsSubtitle: 'Latest news and insights from the SEO and digital marketing industry',
    trendsArticles: 'Articles',
    trendsSources: 'Sources',
    trendsLastUpdate: 'Last Updated',
    trendsSearchPlaceholder: 'Search articles by title, summary, or category...',
    trendsFilterBy: 'Filter by',
    trendsAllSources: 'All Sources',
    trendsReadMore: 'Read More',
    trendsNoResults: 'No articles found. Try adjusting your search.',
    trendsLoading: 'Loading news...',
    trendsError: 'Error loading news',
    trendsRetry: 'Retry',
    trendsAutoUpdate: 'News is automatically updated twice daily',
  },
};

export const LanguageProvider = ({ children }) => {
  let location = { pathname: '/' };
  let navigate = () => {};
  try {
    location = useLocation();
    navigate = useNavigate();
  } catch (e) {
    // Fallback if rendered outside Router
  }

  const isEnRoute = location.pathname === '/en' || location.pathname.startsWith('/en/');
  const language = isEnRoute ? 'en' : 'de';

  const t = (key) => translations[language]?.[key] || translations['de']?.[key] || key;

  const toggleLanguage = () => {
    const { pathname, search, hash } = location;
    const query = search || '';
    const fragment = hash || '';
    if (isEnRoute) {
      // /en -> /, /en/about -> /about
      const dePath = pathname.replace(/^\/en(\/|$)/, '/') || '/';
      navigate(dePath + query + fragment);
    } else {
      // / -> /en, /about -> /en/about
      const enPath = pathname === '/' ? '/en' : '/en' + pathname;
      navigate(enPath + query + fragment);
    }
  };

  const setLanguage = (targetLang) => {
    if (targetLang === language) return;
    toggleLanguage();
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
