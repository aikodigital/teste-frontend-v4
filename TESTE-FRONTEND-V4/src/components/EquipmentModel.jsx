import equipmentModel from '../data/equipmentModel.json';
import PropTypes from 'prop-types';

const EquipmentsModel = ({ equipmentModelId }) => {
  const model = equipmentModel.find(model => model.id === equipmentModelId);

  if (!model) {
    return <div>Modelo desconhecido</div>;
  }

  return (
    <div>
      <strong>Modelo:</strong> {model.name}
    </div>
  );
};

EquipmentsModel.propTypes = {
  equipmentModelId: PropTypes.string.isRequired,
};

export default EquipmentsModel;