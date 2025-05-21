window.onload = function() {
    const form = document.getElementById("fAspirant");
    const dni = document.getElementById("dni");
    const nom = document.getElementById("nom");
    const llinatges = document.getElementById("llinatges");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        if (
            dni.value.trim() === "" ||
            nom.value.trim() === "" ||
            llinatges.value.trim() === ""
        ) {
            alert("Hi ha camps obligatoris sense valor");
            return;
        }
    })

    let formularioModificado = false;

    form.querySelectorAll("input, teztarea, select").forEach(el => {
        el.addEventListener("change", () => {
            formularioModificado = true;
        });
    });

    form.addEventListener("reset", function (e) {
        if (formularioModificado) {
            const confirmar = confirm("El formulari s'ha modificat. Vols esborrar els valors?")
            if (!confirmar) {
                e.preventDefault();
            }
        }


    })
}


