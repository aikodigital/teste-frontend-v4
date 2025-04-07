import Card from './shared/Card';
import PropTypes from 'prop-types';

function EquipmentItem({ item }) {

    return (
        <Card >
            <div className="state-display">{item.state}</div>
            <div className='model-display'>{item.model}</div>
        </Card>
    )
}

EquipmentItem.prototype = {
    item: PropTypes.object.isRequired
}

export default EquipmentItem;