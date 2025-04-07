
import Map from "../map/map";

export const Homepage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">
      <div className="w-full max-w-[1400px] rounded-2xl bg-white shadow-lg p-6 my-6">
        <Map />
      </div>
    </div>
  );
};
