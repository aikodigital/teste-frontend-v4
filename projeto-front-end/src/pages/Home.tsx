import { useNavigate } from 'react-router-dom';
import Img from '../assets/img.jpg';
import Logo from '../../../img/aiko.png';
import ImgBack from '../assets/IMG-Home.png'

function Home() {
  // Create a navigate function
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${Img})` }}
    >
      <div className="p-5 justify-center">
        <img src={Logo} alt="Logo Aiko" className="w-32 m-auto" />
      </div>

      <div className="flex flex-1 flex-col lg:flex-row items-center justify-center w-3/4 m-auto">
        <div className="lg:w-1/2 w-full flex flex-col items-center text-center px-4 lg:px-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-blue-800">Monitoramento</h1>
          <h2 className="text-4xl lg:text-6xl font-extrabold text-white mt-2">FLORESTAL</h2>
          <p className="text-blue-700 text-base lg:text-lg mt-4">
            Monitoramento de Equipamentos Florestais: Posições e Estados Operacionais
          </p>
          <button 
            className="mt-6 bg-gradient-to-r from-blue-300 to-blue-500 text-blue-800 font-bold px-10 py-3 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 transition duration-300 shadow-white"
            onClick={() => navigate('/painel')} // Navigate to Painel page
          >
            Acessar Painel
          </button>
        </div>

        <div className="lg:w-1/2 w-full flex justify-center mt-6 lg:mt-0">
          <img src={ImgBack} alt="Monitoramento" className="w-72 lg:w-3/4" />
        </div>
      </div>

      <div className="text-center text-lg text-gray-600 mb-4 justify-center m-auto">
        <p>Design by | Rennan Alves</p>
      </div>
    </div>
  );
}

export default Home;
