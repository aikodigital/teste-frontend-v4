import { useEffect, useState } from 'react';
import useEquipment from '../../hooks/useEquipment';
import { IEquipmentDetail } from '../../interfaces/equipment';
import EquipmentTable from '../../components/equipmentTable';
import { fetchEquipmentDetail } from '../../services/equipment';

function Home() {
  const [equipmentTableValues, setEquipmentTableValues] = useState<IEquipmentDetail[]>([]);
  const [loader, setLoader] = useState<boolean>(true);

  const { equipmentData } = useEquipment();

  useEffect(() => {
    if (equipmentData.length) {
      const mergeEquipmentData = async () => {
        const allEquipments = [];
        for (let i = 0; i < equipmentData.length; i += 1) {
          const detail = await fetchEquipmentDetail(equipmentData[i].id);
          if (detail) allEquipments.push(detail);
        }

        const all = await Promise.all(allEquipments);
        setEquipmentTableValues(all);
        setLoader(false);
      };

      mergeEquipmentData();
    }
  }, [equipmentData]);

  if (loader) return <div>Loading...</div>;

  return (
    <div>
      <EquipmentTable equipmentTableValues={equipmentTableValues} />
    </div>
  );
}

export default Home;
