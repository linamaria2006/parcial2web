
import React, { useState, useEffect } from "react";
import FotoCasa from "../imagenes/casa.png";
import FotoApartamento from "../imagenes/apto.png";
import Cuartos from "./cuartos";
import { FormattedMessage } from 'react-intl';

function Espacios () {
    let [espacios, setEspacios] = useState([]);
    let [espacioSelec, setEspacioSelec] = useState();

    useEffect(() => {
        const urlAPI = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
        if(!navigator.onLine) {
            if(localStorage.getItem("espacios") === null) {
                setEspacios("Cargando espacios...");
            } else {
                setEspacios(JSON.parse(localStorage.getItem("espacios")))
            }
        } else {
            fetch(urlAPI).then((res) => res.json()).then((data) => {
                setEspacios(data);
                localStorage.setItem("espacios", JSON.stringify(data));
            });
        }
    }, [])

    function manejadorEspacioSelec (espacio) {
        setEspacioSelec(espacio);
    }

    return(
        <div>

<h1> <FormattedMessage id="espacios"/></h1>
        <div className="container mt-4">
            <div className="row">
                {espacios.map((e) => {
                    return(
                        
                        <div className="col-3" key={e.id}>
                            <div className="card" onClick={() => manejadorEspacioSelec(e)}>
                                <img src={String(e.name).startsWith("Casa")? FotoCasa : FotoApartamento} className="card-img-top" alt={e.name} style={{height: "15rem"}}/>
                                <div className="card-body">
                                    <h5 className="card-title"><FormattedMessage id={e.name}/></h5>
                                    <p className="card-text">{e.address}</p>
                                </div>
                            </div>
                        </div>
                        
                    );
                })}
            </div>
            {espacioSelec != null ? <Cuartos espacioSelecionado={espacioSelec.id} />: null}
        </div>
        </div>
    );
}

export default Espacios;