let total = 0;
const ul = document.querySelector(".containerListaProdutos ul");
const carrinhoUl = document.querySelector(".containerCarrinho ul");

function montarListaProdutos(listaProdutos, descricao) {
    descricao.innerHTML = '';

    listaProdutos.forEach((produto) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        const span = document.createElement('span');
        const ol = document.createElement('ol');
        const button = document.createElement('button');

        produto.componentes.forEach((componente) => {
            const compLi = document.createElement('li');
            compLi.innerText = componente;

            ol.appendChild(compLi);
        });

        // Adicionando dados do produto aos elementos
        img.src = produto.img;
        img.alt = produto.nome;
        h3.innerText = produto.nome;
        p.innerText = produto.preco;
        span.innerText = produto.secao;

        // Adicionando o elementos para o li
        li.appendChild(img);
        li.appendChild(h3);
        li.appendChild(p);
        li.appendChild(span);
        li.appendChild(ol);
        li.appendChild(button);

        // Adicionando li ao HTML
        descricao.appendChild(li);

        button.classList.add("addBtn")
        button.id = produto.id;
        button.innerText = "Adicionar ao carrinho";
        button.addEventListener("click", addCarrinho);
    });
}


let arrCarrinho = [];

function addCarrinho(event) {
    let currentId = event.currentTarget.id;
    let searchId = produtos.find(produto => produto.id == currentId);
    arrCarrinho.push(searchId);

    montarListaProdutos(arrCarrinho, carrinhoUl);
    calcularPreco(arrCarrinho);
}



function filtrarPorCamiseta() {
    const listaCamiseta = produtos.filter((produto) => {
        return produto.secao === 'Camiseta';
    });
    montarListaProdutos(listaCamiseta, ul);
}
const botaoMostrarCamiseta = document.querySelector('.estiloGeralBotoes--filtrarCamiseta');
botaoMostrarCamiseta.addEventListener('click', filtrarPorCamiseta);



function filtrarPorAcessorios() {
    const listaAcessorios = produtos.filter((produto) => {
        return produto.secao === 'Acessorios';
    });
    montarListaProdutos(listaAcessorios, ul);
}
const botaoMostrarAcessorios = document.querySelector('.estiloGeralBotoes--filtrarAcessorios');
botaoMostrarAcessorios.addEventListener('click', filtrarPorAcessorios);



function mostrarTodos() {
    montarListaProdutos(produtos, ul);
}
const botaoMostrarTodos = document.querySelector('.estiloGeralBotoes--mostrarTodos');
botaoMostrarTodos.addEventListener('click', mostrarTodos);



function btnBuscar(event) {
    const input = document.querySelector(".campoBuscaPorNome").value;
    const result = produtos.filter(produto => {
        const nome = produto.nome.toLowerCase().includes(input.toLowerCase());
        const secao = produto.secao.toLowerCase().includes(input.toLowerCase());
        const categoria = produto.categoria.toLowerCase().includes(input.toLowerCase());
        return (nome || secao || categoria);
    });
    montarListaProdutos(result, ul);
}
const buscar = document.querySelector('.estiloGeralBotoes--botaoBuscaPorNome');
buscar.addEventListener('click', btnBuscar);



function bscEnter(event) {
    if (event.type === "k5eyup" && event.key === "Enter") {
        btnBuscar(event);
    }
}



function calcularPreco(produtos) {
    total = 0;
    produtos.forEach((produto) => {
        total += parseFloat(produto.preco);
    });
    const precoTotal = document.querySelector("#precoTotal");
    precoTotal.innerText = total;
}
const inputEvent = document.querySelector(".campoBuscaPorNome");
inputEvent.addEventListener("keyup", bscEnter);

montarListaProdutos(produtos, ul);