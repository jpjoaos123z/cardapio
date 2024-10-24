window.onload = function () {
  const menuItems = JSON.parse(localStorage.getItem('cardapio')) || [];
  const comidasContainer = document.getElementById('comidas-items');
  const bebidasContainer = document.getElementById('bebidas-items');

  // Carregar itens do cardápio no carregamento da página
  atualizarCardapio();

  // Função para adicionar novos itens ao cardápio
  document.getElementById('adicionar-item-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Previne o comportamento padrão do botão de submit

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const imagemInput = document.getElementById('imagem');
    const categoria = document.querySelector('input[name="categoria"]:checked').value;
    const dia = document.getElementById('dia').value;

    // Lê a imagem como URL
    const imagem = imagemInput.files[0];

    if (nome && descricao && !isNaN(preco) && imagem && categoria && dia) {
      const reader = new FileReader();
      reader.onloadend = function () {
        const novoItem = {
          nome,
          descricao,
          preco,
          imagem: reader.result, // Usar a URL da imagem
          categoria,
          dia,
        };

        menuItems.push(novoItem); // Adiciona o novo item ao cardápio
        localStorage.setItem('cardapio', JSON.stringify(menuItems)); // Atualiza o localStorage
        atualizarCardapio(); // Atualiza a exibição do cardápio

        // Limpa os campos do formulário após adicionar
        document.getElementById('nome').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('preco').value = '';
        imagemInput.value = ''; // Limpa o campo de arquivo
      };
      reader.readAsDataURL(imagem); // Lê a imagem como URL
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  });

  // Função para atualizar o cardápio na interface
  function atualizarCardapio() {
    comidasContainer.innerHTML = '';
    bebidasContainer.innerHTML = '';

    if (menuItems.length === 0) {
      comidasContainer.innerHTML = '<p>Nenhum item disponível no momento.</p>';
      bebidasContainer.innerHTML = '<p>Nenhuma bebida disponível no momento.</p>';
    } else {
      // Exibir itens do cardápio
      menuItems.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <h3>${item.nome}</h3>
            <p>${item.descricao}</p>
            <p>Preço: R$${parseFloat(item.preco).toFixed(2)}</p>
            <p>Disponível: ${item.dia}</p>
            <img src="${item.imagem}" alt="${item.nome}" style="width: 100%; height: auto;" onerror="this.src='default-image.png';">
            <button class="remover-item" data-index="${index}">Remover</button>
        `;

        // Verifica se o item é comida ou bebida e o adiciona na seção correta
        if (item.categoria === 'comida') {
          comidasContainer.appendChild(menuItem);
        } else if (item.categoria === 'bebida') {
          bebidasContainer.appendChild(menuItem);
        }
      });

      // Adiciona a funcionalidade de remoção dos itens
      const removeButtons = document.querySelectorAll('.remover-item');
      removeButtons.forEach(button => {
        button.addEventListener('click', function() {
          const index = this.getAttribute('data-index');
          menuItems.splice(index, 1); // Remove o item do array
          localStorage.setItem('cardapio', JSON.stringify(menuItems)); // Atualiza o localStorage
          atualizarCardapio(); // Atualiza a exibição do cardápio
        });
      });
    }
  }
};
