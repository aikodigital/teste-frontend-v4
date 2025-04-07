import Content from '@/components/content';
import { Map } from '@/components/maps';
import ScrollAreaComponent from '@/components/scroll-area';
import Apresentation from '@/components/apresentation';
import { Context } from '@/provider';
import useEquipmentStore from '@/zustand';
import { isEmpty } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { useStore } from 'zustand';

const Home: React.FC = () => {
  const { fetch_all_data } = useContext(Context);
  const { equipments, equipmentPositionHistory } = useStore(useEquipmentStore);
  const [activeId, setActiveId] = useState<string>('');
  useEffect(() => {
    if (isEmpty(equipments)) {
      fetch_all_data();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Content>
      <section>
        <main className="flex flex-col justify-center pt-6 gap-6">
          <div>
            <Apresentation />
            <div className="flex justify-between">
              <ScrollAreaComponent
                equipments={equipments}
                setActiveId={setActiveId}
                activeId={activeId}
              />
              <div className="h-[500px] w-[60%]">
                <Map
                  equipmentPositions={equipmentPositionHistory}
                  activeId={activeId}
                  setActiveId={setActiveId}
                />
              </div>
            </div>
          </div>
        </main>
      </section>
    </Content>
  );
};
export default Home;
