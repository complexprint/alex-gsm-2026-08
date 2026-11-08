# Alexey Bespechny Portfolio Website

## 🎯 Обзор
Профессиональный многостраничный портфолио-сайт для Alexey Bespechny с поддержкой немецкого и английского языков.

## ✨ Основные функции

### 🌍 Многоязычность
- **Немецкий (DE)** - основной язык
- **Английский (EN)** - переключение в один клик
- Переключатель языка в правом верхнем углу

### 📱 Структура сайта

#### 1. **Главная страница (Home)**
- Портретное фото с анимированным эффектом тумана
- Вертикально растянутый заголовок
- Контактная информация
- Кнопка "Angebot machen" (открывает email клиент)
- Промо-секция с видео в модальном окне
- Slide-in навигационные кнопки справа

#### 2. **О себе (About Me / Über mich)**
- Три информационных блока о биографии
- Карточки с hover эффектами
- Декоративная цитата

#### 3. **Образование (Education / Ausbildung)**
- Timeline дизайн с вертикальной линией
- Три образовательных достижения
- Информация о Bachelor, Exchange semester и HAK

#### 4. **Опыт (Experience / Erfahrung & Projekte)**
- Grid layout с карточками
- 5 проектов/достижений
- NXRT GmbH, La Galeria, Junior Company, Rhetorik-Meister, Bootcamp

#### 5. **Навыки (Skills / Kompetenzen)**
- Три категории: Языки, IT, Soft Skills
- Интерактивные карточки с иконками
- 5 языков, 4 IT навыка, 5 soft skills

#### 6. **Контакты (Contact / Kontakt)**
- Телефон, Email, Локация
- Социальные ссылки (LinkedIn, XING)
- CTA кнопка для связи

### 🎨 Дизайн

#### Цветовая схема
- **Фон**: Темные оттенки (slate-950, slate-900)
- **Акценты**: Розовый (pink-400 до pink-600) и пурпурный (purple-400 до purple-600)
- **Текст**: Белый и серый для контраста

#### Анимации
- ✅ Эффект рассеивания тумана на главной странице
- ✅ Slide-in анимация для навигационных кнопок
- ✅ Hover эффекты на всех карточках
- ✅ Плавные переходы между страницами
- ✅ Fade-in анимации для контента

#### UI Компоненты
- Использованы shadcn/ui компоненты
- Dialog для YouTube модальных окон
- Button с градиентами
- Card компоненты с backdrop blur

### 🔗 Функциональность

#### Навигация
- **Slide-in кнопки справа** на главной странице
- **Кнопка "Zurück"/"Back"** на всех внутренних страницах
- **Логотип** - клик возвращает на главную

#### Email интеграция
- Кнопка "Angebot machen" открывает почтовый клиент
- Автоматический subject в зависимости от языка
- Email: alekseibespechnyi@outlook.com

#### CV Download
- Кнопка в header для скачивания CV
- PDF файл: ALEKSEI_BESPECHNYI.pdf

#### YouTube видео
- Открывается в модальном окне (shadcn Dialog)
- Разные видео для DE и EN языков:
  - DE: https://youtube.com/shorts/WkoMyMRr46g
  - EN: https://youtube.com/shorts/jIrjb2hxF5Y
- Встроенный YouTube iframe

### 📱 Адаптивность
- ✅ Desktop (1920x1080 и выше)
- ✅ Tablet (768px)
- ✅ Mobile (375px)
- Flex и Grid layouts для адаптивности
- Responsive навигация

### 🖼️ Изображения
- **Логотип**: Alex-GSM_Vibrant_Logo.png
- **Портрет**: main_page.jpg (с эффектом тумана)
- Все изображения загружаются через CDN

## 🚀 Технологии

### Frontend
- **React 19.0.0**
- **React Router 7.5.1** - для многостраничной навигации
- **Tailwind CSS 3.4.17** - для стилизации
- **shadcn/ui** - компоненты UI
- **lucide-react** - иконки
- **Context API** - управление языком

### Ключевые библиотеки
- `react-router-dom` - маршрутизация
- `@radix-ui/react-dialog` - модальные окна
- `lucide-react` - иконки

## 📂 Структура проекта

```
/app/frontend/src/
├── components/
│   ├── Layout.jsx           # Header + Footer
│   ├── NavigationButtons.jsx # Slide-in кнопки
│   ├── YouTubeModal.jsx     # Модальное окно для видео
│   └── ui/                  # shadcn компоненты
├── contexts/
│   └── LanguageContext.jsx  # Контекст языка
├── pages/
│   ├── Home.jsx            # Главная
│   ├── About.jsx           # О себе
│   ├── Education.jsx       # Образование
│   ├── Experience.jsx      # Опыт
│   ├── Skills.jsx          # Навыки
│   └── Contact.jsx         # Контакты
├── App.js                  # Роутинг
├── App.css                 # Глобальные стили
└── index.css               # Tailwind + базовые стили
```

## 🎯 Особенности реализации

### Эффект тумана
```javascript
// Постепенное рассеивание тумана через opacity и blur
const [fogOpacity, setFogOpacity] = useState(1);
useEffect(() => {
  setTimeout(() => setFogOpacity(0), 500);
}, []);
```

### Slide-in анимация
```javascript
// Задержка появления для каждой кнопки
style={{ 
  transitionDelay: isVisible ? `${item.delay}ms` : '0ms',
}}
```

### Переключение языка
```javascript
// Context API для глобального управления языком
const { language, toggleLanguage, t } = useLanguage();
```

## 🎨 Цветовая палитра

```css
/* Основные цвета */
Background: #020617 (slate-950)
Cards: #0f172a (slate-900) с прозрачностью
Border: rgba(236, 72, 153, 0.2) (pink-500/20)

/* Акценты */
Primary: #ec4899 (pink-500)
Secondary: #a855f7 (purple-500)
Gradient: from-pink-600 to-purple-600
```

## 📝 Контент

### Контактные данные
- **Телефон**: +43 681 81411499
- **Email**: alekseibespechnyi@outlook.com
- **Локация**: Linz / Steyr / Wien / Salzburg
- **LinkedIn**: linkedin.com/in/alexeybespechny
- **XING**: xing.com/profile/Alexey_Bespechny

### Информация о стажировке
- **Период**: ab Juli/August 2025 (6. Semester)
- **Тип**: Pflichtpraktikum
- **Локация**: Flexible (Linz, Steyr, Wien, remote)

## ✅ Тестирование

Все функции протестированы:
- ✅ Навигация между страницами
- ✅ Переключение языков
- ✅ YouTube модальные окна
- ✅ Email ссылки
- ✅ CV download
- ✅ Responsive дизайн
- ✅ Анимации и эффекты

## 🌐 Деплой

Сайт готов к деплою на любую платформу:
- Vercel
- Netlify
- GitHub Pages
- Emergent Platform

## 📞 Поддержка

Для вопросов по сайту:
- Email: alekseibespechnyi@outlook.com
- Telegram: (если требуется)

---

**Создано с ❤️ для Alexey Bespechny**
*Global Sales & Marketing Student @ FH Steyr*
