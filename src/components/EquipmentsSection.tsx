import { Equipment } from "@/@types";
import Map from "./map";

type EquipmentsSectionProps = {
  equipments: Equipment[];
};

export default function EquipmentsSection({
  equipments,
}: EquipmentsSectionProps) {
  return (
    <section className=" h-full w-full bg-[#001C48]  flex justify-center items-center p-10">
      <Map equipments={equipments} />
    </section>
  );
}
