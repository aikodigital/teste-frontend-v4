import equipmentState from '../data/equipmentState.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import PropTypes from 'prop-types';

const getLatestState = (equipmentId) => {
  const history = equipmentStateHistory.find(e => e.equipmentId === equipmentId);

  if (!history || !history.states.length) return null;

  const sorteredStates = history.states.sort((a, b) => new Date(b.date) - new Date(a.date));

  return equipmentState.find(state => state.id === sorteredStates.equipmentStateId);
};

export default function EquipamentState({ equipmentId }) {
  const latestState = getLatestState(equipmentId);

  return latestState ? (
    <div className='state-field'>
      <strong>{latestState.name}</strong>
    </div>
  ) : <div>Estado não encontrado</div>;
}

EquipamentState.propTypes = {
  equipmentId: PropTypes.string.isRequired
};