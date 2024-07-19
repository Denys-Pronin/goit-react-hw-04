import { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import SearchBar from "./SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import { fetchGallery } from "../search-api";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
function App() {
  const [query, setQuery] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imgs, setImgs] = useState("");

  const [loadBtn, setLoadBtn] = useState(false);

  useEffect(() => {
    if (search == "") {
      return;
    }

    async function getData() {
      try {
        setLoad(true);
        setLoadBtn(true);
        const data = await fetchGallery(search, page);
        if (data.length < 12 && data.length > 0) {
          setLoadBtn(false);
        }
        setQuery((prev) => [...prev, ...data]);
      } catch {
        setError(true);
      } finally {
        setLoad(false);
      }
    }
    getData();
  }, [page, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadBtn(false);
    setError(false);

    if (e.target.elements.query.value.trim() == "") {
      toast.error("Write a word!");
      return;
    }
    setQuery([]);
    setPage(1);
    setSearch(e.target.elements.query.value.trim());

    e.target.reset();
  };

  const updatePage = () => {
    setPage(page + 1);
  };

  function openModal(img) {
    setImgs(img);
    console.log(img);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setImgs("");
  }

  return (
    <>
      <Toaster />
      <SearchBar onSub={handleSubmit} />
      {query.length > 0 && <ImageGallery value={query} openModal={openModal} />}
      {query.length > 0 && loadBtn && <LoadMoreBtn onClick={updatePage} />}
      {modalIsOpen && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          imgUrl={imgs.urls.regular}
          likes={imgs.likes}
        />
      )}
      {error && <ErrorMessage />}
      {load && <Loader />}
    </>
  );
}

export default App;
