import styles from './Search.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { changeSearch, resetSearch } from '../../store/reducers/search';
import { RootState } from '../../store/store';
import { LatLngExpression } from 'leaflet';

type markerType = {
  equipmentId: String,
  geocode: LatLngExpression,
}

export default function Search() {
  const search = useSelector((state: RootState) => state.search)
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetSearch());
  }, [location.pathname, dispatch])

  useEffect(() => {
    console.log(typeof search);
  }, [])
  
  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        placeholder="Search"
        value={search}
        onChange={event => dispatch(changeSearch(event.target.value))}
      />
    </div>
  )
}