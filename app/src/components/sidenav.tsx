import aikoLogo from "../../../img/aiko.png";
import clsx from "clsx";
import ThemeSwitch from "./themeSwitcher";

export function SideNav() {
  return (
    <div className="flex p-2 bg-secondary items-center justify-between">
      <a
        className="mb-2 flex items-end justify-start rounded-md bg-white p-2
    "
        href="/"
      >
        <div className="w-12">
          <img src={aikoLogo} alt="" />
        </div>
      </a>
      <div className="flex gap-4">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}

export function NavLinks() {
  const links = [
    { name: "Link1", href: "/dashboard", icon: "" },
    {
      name: "Link2",
      href: "/",
      icon: "",
    },
    { name: "Link3", href: "/", icon: "" },
  ];

  return (
    <>
      {links.map((link) => {
        return (
          <a key={link.name} href={link.href}>
            <p className="hidden md:block hover:text-primary font-bold">
              {link.name}
            </p>
          </a>
        );
      })}

      <ThemeSwitch />
    </>
  );
}
