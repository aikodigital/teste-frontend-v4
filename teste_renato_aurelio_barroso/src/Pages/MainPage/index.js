import { useEffect, useRef, useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

import TitleSection from "../../Components/Title";
import FiltersSection from "../../Components/Filters";
import MapSection from "../../Components/Map";
import DetailsSection from "../../Components/Details";
import FooterSection from "../../Components/Footer";

import equipTable from "../../assets/data/equipment.json";
import modelTable from "../../assets/data/equipmentModel.json";
import statusTable from "../../assets/data/equipmentState.json";
import statusHistoryTable from "../../assets/data/equipmentStateHistory.json";
import positionHistoryTable from "../../assets/data/equipmentPositionHistory.json";

import { getLastArrayEntry, compareStrings } from "../../helpers/functions";

import * as S from "./style";

function MainPage() {
  const [selectedEquip, setSelectedEquip] = useState(null);
  const [statusesMap, setStatusesMap] = useState(null);
  const [modelsMap, setModelsMap] = useState(null);
  const [equipmentArray, setEquipmentArray] = useState(null);
  const [filteredEquipmentArray, setFilteredEquipmentArray] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [filterModel, setFilterModel] = useState(-1);
  const [filterStatus, setFilterStatus] = useState(-1);
  const [renderType, setRenderType] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const startedLoad = useRef(false);

  const getStatusHistoryMap = () => {
    let map = new Map();
    statusHistoryTable.forEach(equip => {
      map.set(equip.equipmentId, equip.states);
    });

    return map;
  };

  const getPositionHistoryMap = () => {
    let map = new Map();
    positionHistoryTable.forEach(equip => {
      map.set(equip.equipmentId, equip.positions);
    });

    return map;
  };

  const loadStatusesMap = () => {
    let map = new Map();
    statusTable.forEach(status => {
      map.set(status.id, { name: status.name, color: status.color });
    });

    setStatusesMap(map);
  };

  const loadModelsMap = () => {
    let map = new Map();
    modelTable.forEach(model => {
      let earningsMap = new Map();
      model.hourlyEarnings.forEach(earning => {
        earningsMap.set(earning.equipmentStateId, earning.value);
      });
      map.set(model.id, { name: model.name, earnings: earningsMap });
    });

    setModelsMap(map);
  };

  const loadEquipmentArray = () => {
    const statusHistoryMap = getStatusHistoryMap();
    const positionHistoryMap = getPositionHistoryMap();

    let array = equipTable.map(equip => {
      return {
        name: equip.name,
        modelId: equip.equipmentModelId,
        statusHistory: statusHistoryMap.get(equip.id),
        positionHistory: positionHistoryMap.get(equip.id),
      };
    });

    setEquipmentArray(array);
  };

  useEffect(() => {
    if (startedLoad.current) return;
    startedLoad.current = true;

    loadStatusesMap();
    loadModelsMap();
    loadEquipmentArray();
  }, []);

  useEffect(() => {
    if (!statusesMap || !modelsMap || !equipmentArray) return;
    setLoaded(true);
  }, [statusesMap, modelsMap, equipmentArray]);

  useEffect(() => {
    if (!equipmentArray) return;

    let copy = [...equipmentArray];

    if (parseInt(filterModel) !== -1) {
      copy = copy.filter(
        equip =>
          equip.modelId === Array.from(modelsMap)[filterModel][0] ||
          (searchName && compareStrings(equip.name, searchName))
      );
    }

    if (parseInt(filterStatus) !== -1) {
      copy = copy.filter(
        equip =>
          getLastArrayEntry(equip.statusHistory).equipmentStateId ===
            Array.from(statusesMap)[filterStatus][0] ||
          (searchName && compareStrings(equip.name, searchName))
      );
    }

    if (searchName) {
      const search = copy.find(equip => compareStrings(equip.name, searchName));
      if (search) {
        setSelectedEquip(search);
      }
    }

    setFilteredEquipmentArray(copy);
  }, [equipmentArray, filterModel, filterStatus, searchName]);

  return (
    <S.App>
      <TitleSection text={"Equipamentos - Visão Geral"} />

      {loaded && (
        <>
          <FiltersSection
            nameHandler={setSearchName}
            model={filterModel}
            modelHandler={setFilterModel}
            status={filterStatus}
            statusHandler={setFilterStatus}
            modelMap={modelsMap}
            statusMap={statusesMap}
          />

          <div style={{ position: "relative", height: "100%" }}>
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
              <MapSection
                equipmentArray={filteredEquipmentArray}
                statusMap={statusesMap}
                selectedEquip={selectedEquip}
                selectedEquipHandler={setSelectedEquip}
                renderType={renderType}
              />
            </APIProvider>

            <DetailsSection
              modelMap={modelsMap}
              statusMap={statusesMap}
              selectedEquip={selectedEquip}
              selectedEquipHandler={setSelectedEquip}
              renderType={renderType}
              renderTypeHandler={setRenderType}
            />
          </div>
        </>
      )}

      <FooterSection />
    </S.App>
  );
}

export default MainPage;
