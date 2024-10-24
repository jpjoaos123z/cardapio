window.onload = function () {
  const menuItems = JSON.parse(localStorage.getItem('cardapio')) || [];
  const comidasContainer = {
    segunda: document.getElementById('comidas-segunda'),
    terca: document.getElementById('comidas-terca'),
    quarta: document.getElementById('comidas-quarta'),
    quinta: document.getElementById('comidas-quinta'),
    sexta: document.getElementById('comidas-sexta'),
    sabado: document.getElementById('comidas-sabado'),
    domingo: document.getElementById('comidas-domingo'),
  };

  const bebidasContainer = {
    segunda: document.getElementById('bebidas-segunda'),
    terca: document.getElementById('bebidas-terca'),
    quarta: document.getElementById('bebidas-quarta'),
    quinta: document.getElementById('bebidas-quinta'),
    sexta: document.getElementById('bebidas-sexta'),
    sabado: document.getElementById('bebidas-sabado'),
    domingo: document.getElementById('bebidas-domingo'),
  };

  // Verificar se há itens no cardápio
  if (menuItems.length === 0) {
    Object.values(comidasContainer).forEach(container => container.innerHTML = '<p>Nenhum item disponível no momento.</p>');
    Object.values(bebidasContainer).forEach(container => container.innerHTML = '<p>Nenhuma bebida disponível no momento.</p>');
  } else {
    // Classificar os itens do cardápio entre comidas e bebidas por dia
    menuItems.forEach((item) => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item');
      menuItem.innerHTML = `
          <h3>${item.nome}</h3>  
          <p>${item.descricao}</p>  
          <p>Preço: R$${parseFloat(item.preco).toFixed(2)}</p>  
          <img src="${item.imagem}" alt="${item.nome}" style="width: 100%; height: auto;">  
      `;

      const dia = item.dia.toLowerCase(); // Assumindo que 'dia' está em minúsculas

      // Verifica em qual dia e categoria o item deve ser adicionado
      if (dia === 'segunda-feira') {
        item.categoria === 'comida' ? comidasContainer.segunda.appendChild(menuItem) : bebidasContainer.segunda.appendChild(menuItem);
      } else if (dia === 'terça-feira') {
        item.categoria === 'comida' ? comidasContainer.terca.appendChild(menuItem) : bebidasContainer.terca.appendChild(menuItem);
      } else if (dia === 'quarta-feira') {
        item.categoria === 'comida' ? comidasContainer.quarta.appendChild(menuItem) : bebidasContainer.quarta.appendChild(menuItem);
      } else if (dia === 'quinta-feira') {
        item.categoria === 'comida' ? comidasContainer.quinta.appendChild(menuItem) : bebidasContainer.quinta.appendChild(menuItem);
      } else if (dia === 'sexta-feira') {
        item.categoria === 'comida' ? comidasContainer.sexta.appendChild(menuItem) : bebidasContainer.sexta.appendChild(menuItem);
      } else if (dia === 'sábado') {
        item.categoria === 'comida' ? comidasContainer.sabado.appendChild(menuItem) : bebidasContainer.sabado.appendChild(menuItem);
      } else if (dia === 'domingo') {
        item.categoria === 'comida' ? comidasContainer.domingo.appendChild(menuItem) : bebidasContainer.domingo.appendChild(menuItem);
      }
    });
  }

  // Função para abrir e fechar a barra lateral
  const toggleSidebarButton = document.getElementById('toggleSidebar');
  const closeSidebarButton = document.getElementById('closeSidebar');
  const sidebar = document.getElementById('sidebar');

  toggleSidebarButton.onclick = function () {
    sidebar.classList.toggle('active');
  };

  closeSidebarButton.onclick = function () {
    sidebar.classList.remove('active'); // Fechar a barra lateral
  };

  // Função para finalizar o pedido e redirecionar para a página de entrega (local.html)
  document.getElementById('finalizar-pedido').addEventListener('click', () => {
    alert('Finalize seu pedido!');
    // Aqui você pode implementar a lógica para o pedido
    // Redirecionar para a página de seleção de local de entrega (local.html)
    window.location.href = 'local.html';
  });
};
