import React from "react"
import Image from "next/image"
import Logo from "@/app/images/aiko-logo.png"

export function Header() {
  return (
    <header className="w-full py-2 px-4 flex items-center shadow-md z-50 border-b">
      <Image src={Logo} alt="Logo da Aiko" height={48} width={96} priority />
    </header>
  )
}
