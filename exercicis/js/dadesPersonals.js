window.onload = function() {
    const inputs = document.querySelectorAll("form input[type='text'], form input[type='tel']")

    inputs.forEach(input => {
        input.addEventListener("keydown", (e) => {
            if (e.key.length === 1) {
                const letra = e.key;
                e.preventDefault();
                setTimeout(() => {
                    input.value += letra;
                }, 1000);
            }
        })
    })

    const codi = document.getElementById("codi");
}