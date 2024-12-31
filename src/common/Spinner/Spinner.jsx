function Spinner({ type }) {
  if (type === "small") return <div className="small-spinner"></div>;

  return (
    <div className="absolute h-screen w-full flex items-center justify-center bg-[rgba(0,0,0,.35)] backdrop-blur-sm">
      <div className="big-spinner"></div>
    </div>
  );
}

export default Spinner;
