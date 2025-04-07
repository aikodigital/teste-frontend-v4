import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IEquipmentDetail } from '../../interfaces/equipment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IPositions } from '../../interfaces/equipmentPositionHistory';
import DateSelector from '../../components/dateSelector';
import MapView from '../../components/mapView';
import { fetchEquipmentDetail } from '../../services/equipment';

function EquipmentDetail() {
  const navigate = useNavigate();
  const [detail, setDetail] = useState<IEquipmentDetail>({} as IEquipmentDetail);
  const [equipmentPosition, setEquipmentPosition] = useState<IPositions>({} as IPositions);
  const [loader, setLoader] = useState<boolean>(true);
  const { id: paramId } = useParams();

  const getEquipmentDetail = useCallback(
    async (id: string) => {
      const response = await fetchEquipmentDetail(id);

      if (!response) {
        return navigate('/404');
      }

      setDetail(response);
      setLoader(false);
    },
    [navigate],
  );

  useEffect(() => {
    if (paramId) {
      getEquipmentDetail(paramId);
    }
  }, [getEquipmentDetail, paramId]);

  useEffect(() => {
    if (detail?.positionHistory?.positions && detail?.positionHistory?.positions.length) {
      const lastPosition = detail.positionHistory.positions[detail.positionHistory.positions.length - 1];
      setEquipmentPosition(lastPosition);
    }
  }, [detail.positionHistory]);

  if (loader) return <div>Loading...</div>;

  return (
    <section className="flex flex-col gap-5">
      <Link
        to="/"
        className="relative text-2xl inline-flex justify-start items-center gap-2 text-left w-fit pr-2 pb-2 box-border border-b-2 border-transparent after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
      >
        <ArrowBackIosNewIcon /> {detail?.name}
      </Link>
      <div className="flex justify-between items-center">
        {detail.positionHistory!.positions?.length > 0 && (
          <DateSelector positions={detail.positionHistory!.positions!} onSelect={(pos) => setEquipmentPosition(pos)} />
        )}
      </div>
      <div className="flex gap-6 items-center">
        <div>Modelo: {detail.model?.name}</div>
        <div>Estado: {detail.state?.name}</div>
        <div>
          Data e hora:{' '}
          {(() => {
            const date = new Date(equipmentPosition.date);
            const data = date.toLocaleDateString('pt-BR');
            const hora = date.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            });
            return `${data} às ${hora}`;
          })()}
        </div>
      </div>
      <MapView lat={equipmentPosition.lat} lon={equipmentPosition.lon} color={detail.state?.color} />
    </section>
  );
}

export default EquipmentDetail;
