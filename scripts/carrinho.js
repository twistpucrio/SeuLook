const CarrinhoModel = (() => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    return {
        adicionarItem: (produto) => {
            const produtoExistente = carrinho.find(item => item.id === produto.id);
            if (produtoExistente) {
                produtoExistente.qtd_carrinho++;
            } else {
                produto.qtd_carrinho = 1; // Inicializa a quantidade
                carrinho.push(produto);
            }
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            document.dispatchEvent(new Event('carrinhoAtualizado'));
        },
        removerItem: (produtoId) => {
            carrinho = carrinho.filter(item => item.id !== produtoId);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            document.dispatchEvent(new Event('carrinhoAtualizado'));
        },
        getCarrinho: () => {
            return JSON.parse(localStorage.getItem('carrinho')) || [];
        },
        limparCarrinho: () => {
            carrinho = [];
            localStorage.removeItem('carrinho');
            document.dispatchEvent(new Event('carrinhoAtualizado'));
        }
    };
})();

// Função para carregar o produto específico
async function carregarProduto() {
    const produtoId = getProdutoId();
    const response = await fetch('scripts/produtos.json');
    const produtos = await response.json();
    const produto = produtos.find(p => p.id === produtoId);
    
    if (produto) {
        exibirProduto(produto);
    } else {
        console.error('Produto não encontrado');
    }
}

// Exibir o produto na página
function exibirProduto(produto) {
    const divProduto = document.getElementById('produto');
    divProduto.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" />
        <h2>${produto.nome}</h2>
        <p>Preço: R$${produto.preco.toFixed(2)}</p>
        <p>${produto.descricao}</p>
        <button onclick='adicionarAoCarrinho(${JSON.stringify(produto)})'>Adicionar ao carrinho</button>
    `;
}

// Adicionar o produto ao carrinho
function adicionarAoCarrinho(produto) {
    CarrinhoModel.adicionarItem(produto);
    alert(`${produto.nome} foi adicionado ao carrinho!`);
}

// Função para obter o ID do produto da URL
function getProdutoId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('produto'));
}

// Carrega o produto ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarProduto);
