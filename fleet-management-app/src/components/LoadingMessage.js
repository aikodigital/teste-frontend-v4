import Image from "next/image";

export default function LoadingMessage() {
  return (
    <div className="fixed top-[40%] bottom-[60%] text-center w-full">
      <Image
        src="/aiko.png"
        width={260}
        height={129}
        className="inline-block"
        alt="Logo Aiko"
        priority={true}
      />
      <p className="text-lg">Carregando mapa...</p>
    </div>
  )
}
