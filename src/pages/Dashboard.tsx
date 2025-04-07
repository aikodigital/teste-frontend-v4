
import MapView from '../components/MapView';
import { buildEquipmentDetails } from '../utils/parseEquipmentData';
const Dashboard = () => {
  const equipmentList = buildEquipmentDetails();

  return (
    <div>
      <MapView equipmentList={equipmentList}/>
    </div>
  );
};

export default Dashboard;
