import React, { createContext, useContext, useState } from 'react';

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
    aboutText2: 'Derzeit studiere ich im 6. Semester Global Sales and Marketing an der FH Oberösterreich in Steyr (100 % englischsprachig). Mein Auslandssemester an der Providence University in Taiwan (2024/25) vertieft derzeit meine Chinesischkenntnisse sowie mein Verständnis für den asiatischen Markt.',
    aboutText3: 'Ich brenne für nachhaltige Technologien, internationale Geschäftsentwicklung und überzeugende Kommunikation, ob auf der Bühne oder im direkten Kundengespräch.',
    
    // Education
    educationTitle: 'Ausbildung',
    edu1Title: 'Bachelor of Arts – Global Sales & Marketing',
    edu1Location: 'FH Oberösterreich, Campus Steyr',
    edu1Date: 'Seit 09.2023 (Abschluss 2026)',
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
    aboutText2: 'Currently in my 6th semester of the English-taught Bachelor programme "Global Sales & Marketing" at FH Upper Austria (Steyr Campus). Spending my exchange semester 2024/25 at Providence University in Taiwan to strengthen my Chinese and deepen my understanding of Asian markets.',
    aboutText3: 'Passionate about sustainable technologies, international business development and persuasive communication – on stage and in front of clients.',
    
    // Education
    educationTitle: 'Education',
    edu1Title: 'Bachelor of Arts – Global Sales & Marketing',
    edu1Location: 'University of Applied Sciences Upper Austria, Steyr Campus',
    edu1Date: 'since 09.2023 (graduation 2026)',
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
  const [language, setLanguage] = useState('de');

  const t = (key) => translations[language][key] || key;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'de' ? 'en' : 'de');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
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
