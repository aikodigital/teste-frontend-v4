import React from "react";
import NavMenu from "../../components/navmenu";
import Header from "../../components/header";
import MapEquipments from "../../components/mapEquipments";
import styles from "./HomePage.module.scss"

function HomePage(){
    return(
        <>
            <Header/>
            <main className={styles.homepage}>
                <section className={styles.section_map}>
                    <NavMenu/>
                    <div className={styles.section_map___dashboard}>
                        <div className={styles.section_map___dashboard___title_area}>
                            <h3>Controle de Equipamentos</h3>
                            <h5>Posição e localização</h5>
                        </div>                 
                        <MapEquipments/>
                    </div>
                    
                </section>
            </main>
        </>
    )
};

export default HomePage;