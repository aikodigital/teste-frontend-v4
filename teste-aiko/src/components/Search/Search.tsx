import styles from './Search.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { changeSearch, resetSearch } from '../../store/reducers/search';
import { RootState } from '../../store/store';

export default function Search() {
  const search = useSelector((state: RootState) => state.search)
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetSearch());
  }, [location.pathname, dispatch])
  
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