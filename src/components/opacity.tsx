type OpacityProps = {
  menu: boolean
}

const Opacity: React.FC<OpacityProps> = ({ menu }) => {
  return (
    <div
      className={`${menu ? 'flex' : 'hidden'} md:hidden left-0 top-[87px] absolute w-[100vw] h-[100vh] backdrop-blur-md dark:shadow-shadowdark shadow-shadowlight`}
    ></div>
  )
}

export default Opacity
