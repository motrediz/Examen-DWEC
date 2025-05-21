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

window.onload = function() {
    const form = document.getElementById("fAspirant");
    const dni = document.getElementById("dni");
    const nom = document.getElementById("nom");
    const llinatges = document.getElementById("llinatges");
    const adreca = document.getElementById("adreca");
    const codiPostal = document.getElementById("codiPostal");
    const idLocalitat = document.getElementById("idLocalitat");
    const radiosIlla = document.querySelectorAll("input[name='illa']");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Obtener illa
        let illaSeleccionada = "";
        radiosIlla.forEach(radio => {
            if (radio.checked) {
                illaSeleccionada = radio.value;
            }
        });

        // Construir objeto
        const aspirant = {
            dni: dni.value.trim(),
            nom: nom.value.trim(),
            llinatges: llinatges.value.trim(),
            adreca: adreca.value.trim(),
            codiPostal: codiPostal.value.trim(),
            illa: illaSeleccionada,
            idLocalitat: idLocalitat.value
        };

        // Validar
        if (!aspirant.dni || !aspirant.nom || !aspirant.llinatges) {
            alert("Hi ha camps obligatoris sense valor");
            return;
        }

        // Enviar a servidor
        const xhr = new XMLHttpRequest();
        xhr.open("POST", rutaAplicacio + "/api/aspirants");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            try {
                const resposta = JSON.parse(xhr.responseText);
                if (xhr.status >= 200 && xhr.status < 300) {
                    alert(resposta.missatge || "Aspirant afegit correctament");
                    location.href = "../index.html";
                } else {
                    alert(resposta.missatge || "Error al afegir l'aspirant");
                }
            } catch (e) {
                alert("Error al processar la resposta del servidor");
                console.error(e);
            }
        };
        
        xhr.onerror = function () {
            alert("Error de xarxa");
        };

        xhr.send(JSON.stringify(aspirant));
    })
}