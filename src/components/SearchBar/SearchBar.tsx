import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  // Дані з форми передаються через callback-пропс.
  onSubmit: (query: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    //take input field value
    const query = formData.get("query") as string;

    if (!query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    //call props "onSubmit" Call the function handleQuery in App component
    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={styles.form} action={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />

          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default SearchBar;
