import { useCallback, useMemo, useState } from 'react';

export type IsVisibleType = {
  isVisible: boolean;
  toggle: () => void;
  show: () => void;
  hide: () => void;
};

const useIsVisible = (initialState = false): IsVisibleType => {
  const [isVisible, setIsVisible] = useState(initialState);

  const toggle = useCallback(() => {
    setIsVisible(visible => !visible);
  }, [setIsVisible]);
  const show = useCallback(() => {
    setIsVisible(true);
  }, [setIsVisible]);
  const hide = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  return useMemo(
    () => ({
      isVisible,
      toggle,
      show,
      hide
    }),
    [isVisible, toggle, show, hide]
  );
};

export default useIsVisible;
