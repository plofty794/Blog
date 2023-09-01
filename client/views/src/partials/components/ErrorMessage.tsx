function ErrorMessage({ message }: { message: string | undefined }) {
  return (
    <div className="bg-yellow-200 text-red-600 text-xs p-1 font-bold italic rounded border border-red-600 w-max">
      <span>{message}</span>
    </div>
  );
}

export default ErrorMessage;
