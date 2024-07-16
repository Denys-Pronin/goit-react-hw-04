import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ value, openModal }) => {
  return (
    <ul className={s.wrapper}>
      {value.map((item) => (
        <ImageCard
          openModal={() => {
            openModal(item);
          }}
          key={item.id}
          imgUrl={item.urls.small}
          alt={item.alt_description}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
