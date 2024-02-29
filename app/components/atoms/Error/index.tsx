const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return <div className="text-red-500 text-sm">{message}</div>;
};

export default ErrorMessage;
