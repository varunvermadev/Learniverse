import { useState } from "react";
import Input from "../../../../common/Input/Input";

function Searchbar({ handleSubmit, onChange, error }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2"
    >
      <Input
        type={"text"}
        placeholderText={"Search by name, desc, etc..."}
        onChange={onChange}
        name={"search"}
      />
      {error && (
        <p className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg ">
          {error}
        </p>
      )}
    </form>
  );
}

export default Searchbar;
