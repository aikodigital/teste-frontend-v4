import AikoLogo from "../../../img/aiko.png";
import ReactLogo from "../../src/assets/react-logo-svgrepo-com.svg";
import CSSLogo from "../../src/assets/css-3-svgrepo-com.svg";
import SCSSLogo from "../../src/assets/scss2-svgrepo-com.svg";
import ViteLogo from "../../src/assets/vite-svgrepo-com.svg";
import LeafLogo from "../../src/assets/leaflet-svgrepo-com.svg";

const Documentation = () => {
  return (
    <div className="docContainer">
      <header className="docContainer--header">
        <img className="docContainer--header_logo" src={AikoLogo} alt="" />
        <h1 className="docContainer--header_title">
          Documentação do desafio Front-end
        </h1>
      </header>
      <hr className="solid"></hr>
      <div className="docContainer--text">
        <h1 className="docContainer--text_title">Tecnologias usadas</h1>
        <div className="docContainer--text_container">
          <img
            className="docContainer--text_container_img"
            src={ReactLogo}
            alt=""
          />
          <img
            className="docContainer--text_container_img"
            src={ViteLogo}
            alt=""
          />
          <img
            className="docContainer--text_container_img"
            src={CSSLogo}
            alt=""
          />
          <img
            className="docContainer--text_container_img"
            src={SCSSLogo}
            alt=""
          />
          <img
            className="docContainer--text_container_img"
            src={LeafLogo}
            alt=""
          />
        </div>
        <h1 className="docContainer--text_title">Estrutura de pastas</h1>
        <div className="docContainer--text_structure">
          <pre className="">
          {`data/  
    │
    ├── equipment.json 
    ├── equipmentModel.json 
    ├── equipmentPositionHistory.json 
    ├── equipmentState.json 
    └── equipmentStateHistory.json 
front-end-aiko/  
    │
    ├── components/ 
    ├── node_modules/ 
    ├── public/ 
    └── src/`}
          </pre>
        </div>
        <h1 className="docContainer--text_title">Componentes criados</h1>
        <div className="docContainer--text_structure">
        <pre className="">
          {`front-end-aiko/  
│
└── components/ 
        ├── Documentation.tsx
        ├── DrawerComponent.tsx
        ├── EquipmentComponent.tsx
        ├── IconComponent.tsx
        └── MapComponent.tsx  
        `}
          </pre>
        </div>

      </div>
    </div>
  );
};

export default Documentation;
