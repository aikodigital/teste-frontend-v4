import React, {useState} from 'react';
import style from './NavMenu.module.scss';
import { useEquipmentContext } from '../../context/equipment';
import logoImg from '../../assets/img/aiko.png';
import { IListEquipments } from '../../types/equipment';
import statusEquipmentValues from '../../assets/data/equipmentState.json'

type VisibleOptionsType = {
    equipment: boolean;
    filters: boolean;
}

function NavMenu(){
    const {listEquipments, setActiveModal, setSelectEquipment, setFilteredEquipments} = useEquipmentContext();
    const [activeMenu, setActiveMenu] = useState<Boolean>(false);
    const [visibleOptions, setVisibleOptions] = useState<VisibleOptionsType>({
        equipment: true,
        filters: false,
    });
    const [statusEquipment, setStatusEquipment] = useState<String>('');
    
    //Daniel: abrir menu na versão Mobile
    function toggleMenu(menu: Boolean){
        setActiveMenu(!menu);
    }

    //Daniel: abrir modal com detalhes do equipamento
    function generateModal(equipment: IListEquipments){
        setActiveModal(true);
        setSelectEquipment(equipment);
    }

    //Daniel: abrir e fechar opções Menu Nav
    function openCloseOptions(section: keyof typeof visibleOptions){
        const updateOptions = Object.keys(visibleOptions).reduce((acc, key) => {
            acc[key as keyof VisibleOptionsType] = false;
            return acc;
        }, {} as VisibleOptionsType);
        
        setVisibleOptions({
            ...updateOptions,
            [section]: true
        })
    }

    function filterEquipments(){
        const filterEquipment = listEquipments
        .filter(equipment =>{
            return equipment.stateCurrent === statusEquipment
        });

        if(filterEquipment.length){
            setFilteredEquipments(filterEquipment);
        }else{
            setFilteredEquipments(listEquipments);
        }    
        
        setActiveMenu(false);
    }


    return(
        <nav className={`${style.navmenu} inner_padding_sm ${activeMenu ? style.activeNavMenu : ''}`}>
            <div className={`${style.containernavmenu} container`}>
                <div className={style.navmenu__toggleBtn_area}>
                    <div className={style.navmenu__toggleBtn_area___Button} onClick={()=> toggleMenu(activeMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" width="40" height="40" fill="#FFFFFF">
                            <path d="M12 3c.26 0 .52.1.71.29l9 9c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0L12 5.41 3.71 13.7c-.39.39-1.02.39-1.41 0s-.39-1.02 0-1.41l9-9c.19-.19.45-.29.71-.29z"/>
                        </svg>
                    </div>
                </div>
                <div className={style.navmenu___navmenu_area}>
                    <div className={style.navmenu___navmenu_area___logo_box_area}>
                        <img src={logoImg} alt='Logo Aiko Digital' className={style.navmenu___navmenu_area___logo_box_area___logo}/>
                    </div>
                    <div className={style.navmenu___navmenu_area___menu}>
                        <div className={style.navmenu___navmenu_area___menu__box}>
                            <div className={style.navmenu___navmenu_area___menu__box___title} onClick={()=>openCloseOptions('equipment')}>
                                <p>Equipamentos</p>
                                <span>+</span>
                            </div>
                            {visibleOptions.equipment && (
                                <div className={style.navmenu___navmenu_area___menu__box___options}>
                                    {listEquipments && listEquipments.map(equipment =>{
                                        return(
                                            <div 
                                            className={style.navmenu___navmenu_area___menu__box___options___item}
                                            key={equipment.id}
                                            onClick={()=>generateModal(equipment)}
                                            >
                                                <p className={style.title}><b>{equipment.name}</b></p>
                                                <p className={style.model}>{equipment.model}</p>
                                                <p className={style.status}>
                                                    <span className={style.statusCircle} style={{backgroundColor: equipment.stateColor}}></span>
                                                    <b>{equipment.stateCurrent}</b>
                                                </p>                
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                            <div className={style.navmenu___navmenu_area___menu__box___title} onClick={()=>openCloseOptions('filters')}>
                                <p>Filtros</p>
                                <span>+</span>
                            </div>
                            {visibleOptions.filters && (
                                <div className={style.navmenu___navmenu_area___menu__box___options}>
                                    <div className={style.navmenu___navmenu_area___menu__box___options___item}>
                                        <div className={style.input_box}>
                                            <label htmlFor='statusEquipment'>Estado</label>
                                            <select id='statusEquipment' onChange={(event)=>setStatusEquipment(event.target.value)}>
                                                <option value=''></option>
                                                {statusEquipmentValues && statusEquipmentValues.map(status =>{
                                                    return(
                                                        <option value={status.name}>{status.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <button className={`${style.btnFilterEquipment} btnReverse`} onClick={()=>filterEquipments()}>Filtrar</button>
                                    </div>
                                </div>
                            )}
                        </div>                          
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavMenu;