import React from 'react';
import { useLocation } from 'react-router-dom';

import SkeletonPage from '../components/SkeletonPage/SkeletonPage';

const DetailsPage: React.FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('id');

    const selectedEquipment = id ?? null;

    return (
        <SkeletonPage selectedEquipment={selectedEquipment} />
    );
};

export default DetailsPage;