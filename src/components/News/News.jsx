
import { useEffect, useState } from 'react';

import { fetchNews } from '../../services/newsApi';

import './News.css';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const articles = await fetchNews();

        setNews(articles);
      } catch (error) {
        console.error('News error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <section className="news">
      <div className="container news-container">
        <h2 className="news-title">
          Latest news
        </h2>

        {loading && (
          <p>Loading news...</p>
        )}

        {!loading && news.length > 0 && (
          <div className="news-list">
            {news.map((item, index) => (
              <article
                className="news-card"
                key={item.url || index}
              >
                <div className="news-card-image">
                  {item.urlToImage ? (
                    <img
                      src={item.urlToImage}
                      alt={item.title}
                    />
                  ) : (
                    <span>NEWS</span>
                  )}
                </div>

                <div className="news-card-content">
                  <p className="news-date">
                    {item.publishedAt
                      ? new Date(
                          item.publishedAt
                        ).toLocaleDateString()
                      : ''}
                  </p>

                  <h3>
                    {item.title}
                  </h3>

                  <p className="news-description">
                    {item.description ||
                      'No description available.'}
                  </p>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="news-button"
                  >
                    Read more
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && news.length === 0 && (
          <p>
            No news available.
          </p>
        )}
      </div>
    </section>
  );
}

export default News;

