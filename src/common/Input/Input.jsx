function Input({
  type,
  name,
  labelText,
  placeholderText,
  onChange,
  children,
  style,
  value,
  defaultValue,
}) {
  if (style === "secondary") {
    return (
      <div className="flex flex-col  sm:flex-wrap sm:flex-row ">
        <label className="text-xs sm:text-base uppercase w-full">
          {labelText}
        </label>
        <input
          type={type}
          name={name}
          placeholder={placeholderText}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          className=" bg-slate-700/10 grow sm:mr-3  text-sm sm:text-base placeholder:text-gray-400 text-slate-50 focus:outline-none focus:border-2 focus:border-indigo-400 py-2 px-3 rounded-md border-2 border-gray-300 "
        />
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs sm:text-base uppercase">{labelText}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholderText}
        onChange={onChange}
        defaultValue={defaultValue}
        className=" bg-slate-700/10 text-sm sm:text-base placeholder:text-gray-400 text-slate-50 focus:outline-none focus:border-2 focus:border-indigo-400 py-2 px-3 rounded-md border-2 border-gray-300 "
      />
    </div>
  );
}

export default Input;
