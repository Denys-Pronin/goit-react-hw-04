import { useState } from "react";
import s from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";
import toast from "react-hot-toast";
const SearchBar = ({ onSub }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() == "") {
      toast.error("Write a word!");
      return;
    }
    e.target.reset();
    return onSub(inputValue.trim());
  };

  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={handleSubmit}>
        <div>
          <input
            className={s.input}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={handleInputChange}
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
