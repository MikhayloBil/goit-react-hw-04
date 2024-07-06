import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const API_KEY = "GV_bedBzmvJfk4uBaBSdyNqwxq1y8KToFJk5nooc--c";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (searchTerm === "") return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: searchTerm,
              page: page,
              per_page: 12,
              client_id: API_KEY,
            },
          }
        );
        setImages((prevImages) => [...prevImages, ...response.data.results]);
      } catch (error) {
        setError("Failed to fetch images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchTerm, page]);

  const handleSearchSubmit = (query) => {
    if (query.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }
    setSearchTerm(query);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setModalImage(image);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {modalImage && (
        <ImageModal image={modalImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}
