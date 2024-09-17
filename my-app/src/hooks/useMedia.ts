import React, { useEffect } from 'react'

const useMedia = (size = 40) => {
  const [match, setMatch] = React.useState<null | boolean>(null)
  useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(`(max-width: ${size}rem)`)
      setMatch(matches)
    }
    changeMatch()
    window.addEventListener('resize', changeMatch)
    return () => {
      window.removeEventListener('resize', changeMatch)
    }
  }, [size])
  return match
}

export default useMedia
