const ErrorBanner = ({ isError, children }) => {
  return (
    <>
      <div
        className={`${
          isError
            ? "bg-red-700 border-red-700"
            : "bg-green-700 border-green-700"
        } p-4 w-full rounded-lg bg-opacity-80 text-white border-2 text-center`}
      >
        {children}
      </div>
    </>
  );
};

export default ErrorBanner;
