function FormError({ message }) {
  return (
    <p className="px-3 py-2 text-sm bg-red-200 text-red-900 rounded-lg ">
      {message}
    </p>
  );
}

export default FormError;
