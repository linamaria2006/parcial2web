
import React, { useState, useEffect } from "react";
import Dispositivos from "./devices";
import FotoSala from "../imagenes/sala.png";
import FotoComedor from "../imagenes/comedor.png";
import FotoCocina from "../imagenes/cocina.png";
import { FormattedMessage } from 'react-intl';
function Cuartos (props) {
    let [cuartos, setCuartos] = useState([]);
    let [cuartoSelec, setCuartoSelec] = useState();

    useEffect(() => {
        const urlAPI = "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
        if(!navigator.onLine) {
            if(localStorage.getItem("cuartos") === null) {
                setCuartos("Cargando cuartos...");
            } else {
                setCuartos(JSON.parse(localStorage.getItem("cuartos")));
            }
        } else {
            fetch(urlAPI).then((res) => res.json()).then((data) => {
                let cuartosEspacio = data.filter((d) => d.homeId === props.espacioSelecionado);
                setCuartos(cuartosEspacio);
                localStorage.setItem("cuartos", JSON.stringify(cuartosEspacio));
            });
        }
        setCuartoSelec();
    }, [props.espacioSelecionado]);

    function manejadorCuartoSelec (cuarto) {
        setCuartoSelec(cuarto);
    }

    function determinarImagenCuarto (cuarto) {
        if(cuarto === "Living room") {
            return FotoSala;
        } else if(cuarto === "Kitchen") {
            return FotoCocina;
        } else if(cuarto === "Dinner room") {
            return FotoComedor;
        }
    }

    return(
        <div className="container mt-4 mb-5">
            <h1> <FormattedMessage id="cuartos"/> </h1>
            <div className="row mt-4">
                <div className={cuartoSelec != null ? "col-8": ""}>
                    <div className="row">
                        {cuartos.map((c) => {
                            return(
                                <div className="col" key={c.name}>
                                    <div className="card" onClick={() => manejadorCuartoSelec(c)}>
                                        <div className="card-body">
                                            <h5 className="card-title"> <FormattedMessage id={c.name}/> </h5>
                                        </div>
                                        <img src={determinarImagenCuarto(String(c.name))} className="card-img-top" alt={c.name} style={{height: "14rem"}}/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cuartoSelec != null ? "col-4": ""}>
                    {cuartoSelec != null ? <Dispositivos dispositivosCuarto={cuartoSelec.devices} /> : null}
                </div>
            </div>
        </div>
    );
}

export default Cuartos;