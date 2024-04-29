import css from "./SearchBar.module.css";


export default function SearchBar({ onSubmit }) {



  const onSubmitBar = (e) => {
    e.preventDefault();
    const form = e.target;
    const [input] = form.elements;
    const inputValue = input.value.trim();

   
    onSubmit(inputValue);
    form.reset();
  };

  return (
    <header>
      <div className={css.topLine}>
        <form onSubmit={onSubmitBar} className={css.form}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={css.input}
          />
          <button type="submit" className={css.button}></button>
        </form>
      </div>
    </header>
  );
}
