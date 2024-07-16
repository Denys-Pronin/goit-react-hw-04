import s from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";
const SearchBar = ({ onSub }) => {
  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={onSub}>
        <div>
          <input
            className={s.input}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={s.btn} type="submit">
            <IoSearch />
          </button>
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
