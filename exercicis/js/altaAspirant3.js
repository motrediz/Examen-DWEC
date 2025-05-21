import { rutaAplicacio } from "../../js/configuracio.js";

window.onload = function () {
    const radiosIlla = document.querySelectorAll("input[name='illa']");
    const selectLocalitat = document.getElementById("idLocalitat");

    radiosIlla.forEach(radio => {
        radio.addEventListener("change", function () {
            const idIlla = this.value;

            fetch(rutaAplicacio + "/localitats/perIlla/" + idIlla, {
                headers: {
                    "Accept": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                // Eliminar todas las opciones del select sin usar innerHTML
                while (selectLocalitat.firstChild) {
                    selectLocalitat.removeChild(selectLocalitat.firstChild);
                }

                // Añadir opción por defecto
                const defaultOption = document.createElement("option");
                defaultOption.value = "";
                defaultOption.appendChild(document.createTextNode("Selecciona una localitat"));
                selectLocalitat.appendChild(defaultOption);

                // Añadir cada localitat como opción
                data.forEach(loc => {
                    const option = document.createElement("option");
                    option.value = loc.idLocalitat;
                    option.appendChild(document.createTextNode(loc.nomLocalitat));
                    selectLocalitat.appendChild(option);
                });
                })

                .catch(err => {
                    console.error("Error carregant localitats:", err);
                });
        })
    })
}