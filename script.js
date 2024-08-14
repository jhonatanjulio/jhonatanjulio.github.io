//Map de chaves de criptografia
chaves = new Map([
    ["a", "ai"],
    ["e", "enter"],
    ["i", "imes"],
    ["o", "ober"],
    ["u", "ufat"]
]);

// elementos do aside (com texto e sem texto)
const semTexto = document.getElementsByClassName("sem-texto")[0];
const comTexto = document.getElementsByClassName("com-texto")[0];
semTexto.style.display = "flex";
comTexto.style.display = "none";

//função criptografar texto (recebe como parâmetros o texto para criptografar, e o Map de chaves de criptografia)
function criptografarTexto(texto, listaChaves) {
    textoSplitado = texto.split("");
    return textoSplitado.map((letra) => {
        //console.log(listaChaves.keys());
        for(let l of listaChaves.keys()){
            if(letra === l){
                return listaChaves.get(l);
            }
        }
        return letra;
    }).join("");
}

//função descriptografar texto (recebe como parâmetros o texto para descriptografar, e o Map de chaves de criptografia)
function descriptografarTexto(texto, listaChaves) {
    for(let [l,valor] of listaChaves.entries()) {
        texto = texto.replaceAll(valor, l);
    }
    return texto;
}

// função que será responsável por fazer verificação nos textos e chamar as funções de criptografia/descriptografia respectivamente
function acaoClique(event) {
    const classElemento = event.target.className;

    // elementos de texto
    const entradaTexto = document.getElementById("digitar-texto");
    const saidaTexto = document.getElementById("saidaTexto");

    switch (classElemento) {
        case "btn-criptografar":
        case "btn-descriptografar":
            if (entradaTexto.value) {
                if (classElemento === "btn-criptografar") {
                    saidaTexto.value = criptografarTexto(entradaTexto.value, chaves);
                } else {
                    saidaTexto.value = descriptografarTexto(entradaTexto.value, chaves);
                }
                
                if(semTexto.style.display === "flex" && comTexto.style.display === "none") {
                    semTexto.style.display = "none";
                    comTexto.style.display = "flex";

                    console.log(semTexto.style.display);
                    console.log(comTexto.style.display);
                }
            }
            break;
        case "btn-copiar":
            if (saidaTexto.value) {
                navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
                    if (result.state === "granted" || result.state === "prompt") {
                        navigator.clipboard.writeText(saidaTexto.value).then(() => {event.target.innerText = "Copiado com sucesso!"});
                        setTimeout(() => {event.target.innerText = "Copiar"}, 1000);
                    }
                });
            }
            break;
    }
}