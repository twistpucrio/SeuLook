
function buscarProdutoPorId(idProduto) {
    fetch("scripts/produtos.json").then((response) => {
        response.json().then((produtos) => {
            const produto = produtos.find((produto) => produto.id == idProduto);
            exibirProduto(produto);
        });
    });
}


function exibirProduto(produto) {
    if (produto) {
        const sectionMain = document.querySelector('#main');
        sectionMain.innerHTML = ''; 

        const produtoContainer = document.createElement('div');
        produtoContainer.classList.add('produto-detalhes');

        const nomeProduto = document.createElement('h1');

        nomeProduto.classList.add('tituloProduto');
        nomeProduto.innerText = produto.nome;

        const precoProduto = document.createElement('h3');
        precoProduto.innerText = `R$ ${produto.preco.toFixed(2)}`;
        precoProduto.classList.add('precoProduto');

        const descricaoProduto = document.createElement('h4');
        descricaoProduto.innerText = produto.descricao;
        descricaoProduto.classList.add('descricaoProduto');


        const imagemProduto = document.createElement('img');
        imagemProduto.src = produto.imagem;
        imagemProduto.alt = produto.nome;
        imagemProduto.classList.add('imagem-produto-detalhe');


        const botaoFavorito = document.createElement('button');
        botaoFavorito.innerText = 'Adicionar aos Favoritos';
        botaoFavorito.classList.add('botao-em-produtos');
        

        botaoFavorito.addEventListener('click', function () {
            adicionarFavorito(produto); // Chama a função de adicionar aos favoritos
        });


        const descricoesContainer = document.createElement('div');
        descricoesContainer.classList.add('produto-descricoes');
      
        const botaoCarrinho = document.createElement('button');
        botaoCarrinho.innerText = 'Adicionar ao Carrinho';
        botaoCarrinho.classList.add('botao-em-produtos');
        
        botaoCarrinho.addEventListener('click', function () {
            adicionarAoCarrinho(produto); 
        });

        descricoesContainer.appendChild(nomeProduto);
        descricoesContainer.appendChild(precoProduto);
        descricoesContainer.appendChild(descricaoProduto);
        descricoesContainer.appendChild(botaoFavorito);
        descricoesContainer.appendChild(botaoCarrinho);
    
        produtoContainer.appendChild(imagemProduto);
        produtoContainer.appendChild(descricoesContainer);
        
        sectionMain.appendChild(produtoContainer);
    } else {
        console.error('Produto não encontrado.');
    }
}


function adicionarFavorito(produto) {
        const favorito = JSON.parse(sessionStorage.getItem('favorito')) || []; 
        const produtoExistente = favorito.find(item => item.id === produto.id);
    
        if (produtoExistente) {
            alert('Este produto já está nos favoritos!');
        } else {
            produto.favorito = true;
            favorito.push(produto); 
            sessionStorage.setItem('favorito', JSON.stringify(favorito)); 
            console.log(sessionStorage.getItem('favorito')); 
            alert('Produto favoritado com sucesso!');
        }
    }
    

function adicionarAoCarrinho(produto) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoExistente = carrinho.find(item => item.id === produto.id);

    if (produtoExistente) {
        produtoExistente.qtd_carrinho += 1;
    } else {
        produto.carrinho = true;
        produto.qtd_carrinho = 1;
        carrinho.push(produto);
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));


    let modal = document.getElementById("modal_carrinho");
    let btnVoltaProduto = document.getElementById("botaoModalVolta");
    let btnVaiCarrinho = document.getElementById("botaoModalCarrinho");

    btnVoltaProduto.addEventListener('click', function () {
        modal.classList.remove("open");
    });
        
    btnVaiCarrinho.addEventListener('click', function () {
        location.href="carrinho.html"; 
    });

    modal.classList.add("open");

    //alert('Produto adicionado ao carrinho com sucesso!');
}


function getProdutoId() {
    if (location.href.indexOf('produto=') != -1) {
        const produtoId = location.href.split('produto=')[1];
        return produtoId;
    }
    return '';
}

function navegaParaBuscaPorCategoria(categoria) {
    location.href="busca.html?categoria=" + categoria;
}

window.addEventListener("load", function() {
    const produtoId = getProdutoId();
    if (produtoId) {
        buscarProdutoPorId(produtoId);
    }

    let brancoLink = document.querySelector("#branco");
    brancoLink.addEventListener("click", function(event) {
        event.preventDefault(); 
        navegaParaBuscaPorCategoria('branco');
    });

    let amargoLink = document.querySelector("#amargo");
    amargoLink.addEventListener("click", function(event) {
        event.preventDefault(); 
        navegaParaBuscaPorCategoria('amargo');
    });

    let aoleiteLink = document.querySelector("#ao-leite");
    aoleiteLink.addEventListener("click", function(event) {
        event.preventDefault(); 
        navegaParaBuscaPorCategoria('ao-leite');
    });
});