import { House, Search } from "lucide-react";
import AikoLogo from "../../img/aiko-logo.png";

export function HomePage() {
  return (
    <div className="w-full h-screen flex flex-row gap-4">
      <div className="w-[264px] p-6 bg-stone-950 rounded-3xl flex flex-col">
        <div className="w-full flex justify-center mb-6">
          <img className="w-2/4" src={AikoLogo} alt="Aiko logo" />
        </div>
        <div className="w-full h-px mb-6 bg-stone-300" />
        <ul className="w-full list-none flex flex-col">
          <li className="w-full h-10 px-4 gap-4 flex flex-row items-center rounded-2xl hover:bg-stone-800 active:bg-stone-800 cursor-pointer">
            <span>
              <House className="text-zinc-100 size-4" />
            </span>
            <p className="text-sm font-medium text-zinc-100">Dashboard</p>
          </li>
        </ul>
      </div>

      <div className="w-full flex flex-col gap-8">
        <form action="">
          <div className="relative flex items-center">
            <Search className="absolute ml-4 text-zinc-100 size-4 pointer-events-none" />
            <input
              className="w-[200px] h-10 pr-4 pl-10 rounded-2xl bg-stone-800 placeholder:text-zinc-100 placeholder:text-sm placeholder:font-medium"
              type="text"
              name="search"
              placeholder="Pesquisar"
              autoComplete="off"
            />
          </div>
        </form>

        <div className="w-[300px] p-6 bg-stone-950 rounded-3xl flex flex-col gap-10">
          <h1 className="text-md font-medium text-zinc-100">Mapeamento</h1>
        </div>
      </div>
    </div>
  );
}
