const inputNota = document.getElementById("inputNota");
const btnAgregar = document.querySelector("#btnAgregar");
const listaNotas = document.getElementById("listaNotas");

console.log("Referencias del DOM cargadas:", { inputNota, btnAgregar, listaNotas });

let notas = []

btnAgregar.addEventListener("click",() => { 
    const texto = inputNota.value.trim();

    if (texto === "") {
        alert("Por favor escriba algo. La nota no puede quedar vacía.");
        return;
    }

    notas.push(texto);

    const li = document.createElement("li");
    const spanTexto = document.createElement("span");
    spanTexto.textContent = texto;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    configurarBotonEliminar(btnEliminar, li, texto);

    li.appendChild(spanTexto);
    li.appendChild(btnEliminar);
    listaNotas.appendChild(li);

    console.log(`La nota ha sido agregada con éxito: "${texto}"`);

    actualizarLocalStorage();

    inputNota.value = "";
    inputNota.focus();
});

function configurarBotonEliminar(boton, elementoLi, textoNota) {
    boton.addEventListener("click",() => {
        listaNotas.removeChild(elementoLi);
        console.log(`La nota ha sido eliminada del DOM: "${textoNota}"`);

        notas = notas.filter(n => n !== textoNota);
        actualizarLocalStorage();
    });
}

function actualizarLocalStorage() {
    localStorage.setItem("notas", JSON.stringify(notas));
    console.log("El Local Storage ha sido actualizado con éxito.", notas);
}

function cargarNotasIniciales() {
    const notasGuardadas = localStorage.getItem("notas");

    if (notasGuardadas) {
        notas = JSON.parse(notasGuardadas);
        console.log(`Se catgador las ${notas.legth} notas desde el Local Storage.`);

        notas.forEach(nota => {
            const li = document.createElement("li");
            const spanTexto = document.createElement("span");
            spanTexto.textContent = nota;

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";

            configurarBotonEliminar(btnEliminar, li, nota);

            li.appendChild(spanTexto);
            li.appendChild(btnEliminar);
            listaNotas.appendChild(li);
        });
    } else {
        console.log("No se han encontrado notas previas en el Local Storage.");
    }
}

cargarNotasIniciales();
