import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  error: string;
}
export default function ErrorMessage({ error }: ErrorMessageProps) {
  return <p className={css.text}>There was an error: {error}.</p>;
}
