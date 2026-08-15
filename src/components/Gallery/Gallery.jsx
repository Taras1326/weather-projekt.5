import { useEffect, useState } from 'react';

import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import {
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Gallery.css';

const API_KEY = '54251385-6f7a6e7accba74a4972a9b1fa';

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNatureImages() {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${API_KEY}&q=nature&image_type=photo&orientation=horizontal&per_page=12&safesearch=true`
        );

        if (!response.ok) {
          throw new Error(
            'Помилка завантаження фотографій'
          );
        }

        const data = await response.json();

        setImages(data.hits);
      } catch (error) {
        console.error(
          'Gallery error:',
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchNatureImages();
  }, []);

  return (
    <section className="gallery">
      <div className="gallery-container container">

        <h2 className="gallery-title">
          Nature gallery
        </h2>

        {loading && (
          <p className="gallery-loading">
            Loading...
          </p>
        )}

        {!loading && images.length > 0 && (
          <Swiper
            modules={[
              Navigation,
              Pagination,
              Autoplay,
            ]}
            navigation
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },

              1200: {
                slidesPerView: 3,
              },
            }}
            className="gallery-slider"
          >
            {images.map(image => (
              <SwiperSlide
                key={image.id}
              >
                <div className="gallery-slide">

                  <img
                    src={image.webformatURL}
                    alt={image.tags}
                  />

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {!loading &&
          images.length === 0 && (
            <p>
              Не вдалося завантажити
              фотографії.
            </p>
          )}

      </div>
    </section>
  );
}

export default Gallery;