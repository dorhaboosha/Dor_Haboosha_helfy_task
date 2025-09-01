
interface Props {
  size?: number;
  message?: string;
}

const Spinner = ({ size = 32, message }: Props) => {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner" style={{ width: size, height: size, borderWidth: size / 8 }} />
      {message && <p className="spinner-msg">{message}</p>}
    </div>
  );
};

export default Spinner;
