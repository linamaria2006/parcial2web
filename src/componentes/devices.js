
import React from "react";
import { FormattedMessage } from 'react-intl';

function Dispositivos (props) {
    return(
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Id</th>
                    <th scope="col"><FormattedMessage id="device"/></th>
                    <th scope="col"><FormattedMessage id="value"/></th>
                </tr>
            </thead>
            <tbody>
                {props.dispositivosCuarto.map((d, index) => {
                    return(
                        <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{d.id !== undefined? d.id: "N/A"}</td>
                            <td>{ d.name }</td>
                            <td>{d.desired.value !== false && isNaN(d.desired.value.toString()) ? d.desired.value : isNaN(d.desired.value.toString())? "off" : d.desired.value}</td>
                        </tr>
                    );
                })}    
            </tbody>
        </table>
    );
}

export default Dispositivos;
