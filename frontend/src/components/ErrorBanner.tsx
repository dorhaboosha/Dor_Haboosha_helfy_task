
interface Props {
  message: string;
  onRetry?: () => void;
}

const ErrorBanner = ({ message, onRetry }: Props) => {
  return (
    <div className="error-banner" role="alert">
      <span className="error-text">{message}</span>
      {onRetry && (
        <button type="button" className="btn small danger" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;
