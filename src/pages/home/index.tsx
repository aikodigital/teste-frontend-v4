import { House } from "lucide-react";
import AikoLogo from "../../img/aiko-logo.png";

export function HomePage() {
  return (
    <div className="h-screen w-[264px] p-6 bg-stone-950 rounded-3xl flex flex-col">
      <div className="w-full flex justify-center mb-6">
        <img className="w-2/4" src={AikoLogo} alt="Aiko logo" />
      </div>
      <div className="w-full h-px mb-6 bg-stone-300" />
      <ul className="w-full list-none flex flex-col">
        <li className="w-full h-10 p-4 gap-4 flex flex-row items-center rounded-3xl hover:bg-stone-800 active:bg-stone-800 cursor-pointer">
          <span>
            <House size={16} />
          </span>
          <p className="text-sm font-medium text-zinc-100">Dashboard</p>
        </li>
      </ul>
    </div>
  );
}
