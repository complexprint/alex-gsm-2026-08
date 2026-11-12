import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { TrendingUp, ExternalLink, Search, Filter, Clock, Newspaper } from 'lucide-react';
import NavigationButtons from '../components/NavigationButtons';
import useSEO from '../hooks/useSEO';

const Trends = () => {
  const { t, language } = useLanguage();

  useSEO({
    title:
      language === 'de'
        ? 'Marketing Trends | Aleksei Bespechnyi — SEO & Marketing News'
        : 'Digital Marketing Trends | Aleksei Bespechnyi — SEO & Sales News',
    description:
      language === 'de'
        ? 'Aktuelle Nachrichten und Insights aus der SEO- und Digital-Marketing-Branche. Automatische Aktualisierung zweimal täglich.'
        : 'Latest news and insights from the SEO and digital marketing industry. Automatically updated twice daily.',
    basePath: '/trends',
    locale: language === 'de' ? 'de_AT' : 'en_US',
  });
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [sources, setSources] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    filterNews();
  }, [news, activeFilter, searchTerm]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/news_output/index.json');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();

      const sortedNews = data.articles.sort((a, b) => new Date(b.published) - new Date(a.published));

      setNews(sortedNews);
      setFilteredNews(sortedNews);

      const uniqueSources = [...new Set(sortedNews.map((item) => item.source))].sort();
      setSources(uniqueSources);

      if (data.meta && data.meta.generated_at) {
        const date = new Date(data.meta.generated_at);
        setLastUpdated(
          date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        );
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filterNews = () => {
    let filtered = news;

    if (activeFilter !== 'all') {
      filtered = filtered.filter((item) => item.source === activeFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.summary.toLowerCase().includes(term) ||
          (item.category && item.category.toLowerCase().includes(term))
      );
    }

    setFilteredNews(filtered);
  };

  const Ambient = () => (
    <>
      <div className="pointer-events-none fixed -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-fuchsia-900/20 blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-900/20 blur-[140px]" />
    </>
  );

  if (loading) {
    return (
      <div className="relative min-h-screen bg-[#050505] flex items-center justify-center font-body">
        <Ambient />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-fuchsia-500 mx-auto mb-4"></div>
          <p className="text-zinc-400">{t('trendsLoading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen bg-[#050505] flex items-center justify-center font-body">
        <Ambient />
        <div className="relative z-10 text-center">
          <Newspaper className="w-16 h-16 text-fuchsia-500 mx-auto mb-4" />
          <p className="text-zinc-400 mb-4">{t('trendsError')}</p>
          <button
            onClick={fetchNews}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold border border-white/20 hover:scale-[1.02] transition-all"
          >
            {t('trendsRetry')}
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { value: news.length, label: t('trendsArticles') },
    { value: sources.length, label: t('trendsSources') },
    { value: lastUpdated, label: t('trendsLastUpdate'), small: true },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-body overflow-hidden">
      <Ambient />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 border border-white/10">
              <TrendingUp className="w-7 h-7 text-fuchsia-400" />
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-fuchsia-200 to-violet-300">{t('trendsTitle')}</span>
            </h1>
          </div>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">{t('trendsSubtitle')}</p>

          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            {stats.map((s, i) => (
              <div key={i} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 min-w-[120px]">
                <div className={`font-heading font-bold text-fuchsia-400 ${s.small ? 'text-base' : 'text-2xl'}`}>{s.value}</div>
                <div className="text-zinc-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search + filters */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input
              type="text"
              data-testid="trends-search-input"
              placeholder={t('trendsSearchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-fuchsia-500/50 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="inline-flex items-center gap-2 mr-2 text-zinc-500 text-sm">
              <Filter className="w-4 h-4" />
              {t('trendsFilterBy')}:
            </span>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white'
                  : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {t('trendsAllSources')}
            </button>
            {sources.map((source) => (
              <button
                key={source}
                onClick={() => setActiveFilter(source)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === source
                    ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white'
                    : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {source}
              </button>
            ))}
          </div>
        </div>

        {filteredNews.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg">{t('trendsNoResults')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, index) => (
              <motion.article
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-zinc-900/40 border border-white/10 rounded-3xl overflow-hidden hover:border-fuchsia-500/30 transition-colors flex flex-col group"
              >
                <div className="h-48 bg-gradient-to-br from-fuchsia-600/20 to-violet-600/20 flex items-center justify-center overflow-hidden">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`${item.image_url ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                    <Newspaper className="w-16 h-16 text-fuchsia-500/40" />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="inline-block bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start">
                    {item.source}
                  </span>

                  <h2 className="font-heading text-white font-semibold text-lg mb-3 line-clamp-2 group-hover:text-fuchsia-300 transition-colors">
                    {item.title}
                  </h2>

                  <p className="text-zinc-400 text-sm mb-4 line-clamp-3 flex-grow">{item.summary}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <div className="flex items-center text-zinc-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      <time dateTime={item.published}>{item.published_readable}</time>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:border-fuchsia-500/30 hover:bg-fuchsia-500/10 text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-300"
                    >
                      {t('trendsReadMore')}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <div className="text-center mt-12 text-zinc-600 text-sm">
          <p>{t('trendsAutoUpdate')}</p>
        </div>
      </div>

      <NavigationButtons />
    </div>
  );
};

export default Trends;
