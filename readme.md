<h1 align="center">
    <br>
    <img src="[url da Logo do projeto]" alt="" width="120">
    <br>
    <br>
    Accessible Menu Component
</h1>

<p align="center">This is [breve descrição do projeto]</p>

<!-- SHIELDS DO PROJETO -->
<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>
  
<!-- INSERIR GIF DEMO DO PROJETO -->
<div align="center">
  <img src="[GIF DE DEMONSTRAÇÃO OU IMAGEM do projeto]" alt="demo-web" height="425">
</div>

<hr/>

## ⚡ Built With
This project was developed with the following technologies:
- <img src="https://img.icons8.com/color/50/000000/html-5.png"  width="20px"/><img src="https://img.icons8.com/color/48/000000/css3.png" width="20px"/> **HTML e CSS**
- <img src="https://img.icons8.com/color/48/000000/javascript--v1.png"  width="20px"/> **JavaScript**
- <img src="https://img.icons8.com/color/48/000000/sass-avatar.png" width="20px"/> **SASS**
<br><br>
- Design: https://www.figma.com/file/LLkrFHfNYTRXThrVxlJCQe/menu?node-id=0%3A1

## 🗂 How To Use

<details>
<summary> <strong>Requirements</strong> </summary>

##### To clone and run the project:
- Git

##### To Develop:
- Git
- Sass
</details>

#### Starting Development 
```
# Iniciar a compilação SASS
sass --watch src/assets/sass/style.scss:src/assets/css/style.css
```

### Navigating through the menu

<details>
    <summary> <strong>Menu Type [01-0]</strong> </summary>
    Menu Acessivel com interações Vanilla JS Baseado no <a href="https://codepen.io/merieli/pen/WNXawBz">menu da W3C.</a> 

</details>

<details>
    <summary> <strong>Menu Type [02-0]</strong> </summary>
    Menu Acessivel com interações completas em Vanilla JS Baseado no <a href="https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/menubar/menubar-1/menubar-1.html#">menu da W3C</a> com semantica correta e facilitada para uso de leitor de tela.
    <p>Para usar o menu acessível é preciso seguir a estrutura HTML do menu02.html, com os atributos e data-attributes necessários para cada tipo de item ou subitem do menu. E ao utilizar o script JS deve ser selecionado o data atribute correto para a variavel menubar. No CSS alem do hover sobre os itens do menu que deve exibir o submenu, a classe "active" também deve ativar a visibilidade do submenu.</p>

#### Keyboard Support
|       Key          |       Function    |
|       :----:       |       :---        |
| [**Space**] / [**Enter**] | - Abre o submenu e move o foco para o primeiro item no submenu.<br> - Quando usado no submenu abre o link. |
| [**ESC**] | - Quando o foco esta em um submenu, fecha o submenu.<br> - Move o foco para o item pai da barra de menus |
| ➡ | - Move o foco para o próximo item na barra de menus.<br> - Se o foco estiver no último item, move o foco para o primeiro item.<br> - Se o foco estiver em um item de submenu, abre o próximo submenu e coloca o foco no primeiro item. <br> - Se o foco estiver em um item que não possui um submenu: Fecha o submenu; Move o foco para o próximo item na barra de menus; Abre o submenu do item da barra de menus recém-focado, mantendo o foco nesse item da barra de menus pai. |
| ⬅ | - Move o foco para o item anterior na barra de menus.<br> - Se o foco estiver no primeiro item, move o foco para o último item. |
| ⬇ | - Abre o submenu e move o foco para o primeiro item no submenu.<br> - Quando em um submenu, move o foco para o próximo item.<br> - Se o foco estiver no último item de um submenu, move o foco para o primeiro item. |
| ⬆ | - Abre o submenu e move o foco para o último item do submenu.<br> - Quando em um submenu, move o foco para o item anterior.<br> - Se o foco estiver no primeiro item de um submenu, move o foco para o último item. |
| [**Home**] | Move o foco para o primeiro item na barra de menus/ submenu. |
| [**End**] | Move o foco para o último item na barra de menus/ submenu. |
| [Character 🔡] | - Move o foco para o próximo item na barra de menus/ submenu com um nome que começa com o caractere digitado.<br> - Se nenhum dos itens tiver um nome começando com o caractere digitado, o foco não se moverá. |

</details>

<details>
    <summary> <strong>Menu Type [02-1]</strong> </summary>
    Menu Acessivel com interações completas utilizando JS e JQuery Baseado no <a href="https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/menubar/menubar-1/menubar-1.html#">menu da W3C</a> com semantica correta e facilitada para uso de leitor de tela.
    <p>Para usar o menu acessível é preciso seguir a estrutura HTML do menu02.html, com os atributos e data-attributes necessários para cada tipo de item ou subitem do menu. E ao utilizar o script JS deve ser selecionado o data atribute correto para a variavel menubar. No CSS alem do hover sobre os itens do menu que deve exibir o submenu, a classe "active" também deve ativar a visibilidade do submenu.</p>

#### Keyboard Support
|       Key          |       Function    |
|       :----:       |       :---        |
| [**Space**] / [**Enter**] | - Abre o submenu e move o foco para o primeiro item no submenu.<br> - Quando usado no submenu abre o link. |
| [**ESC**] | - Quando o foco esta em um submenu, fecha o submenu.<br> - Move o foco para o item pai da barra de menus |
| ➡ | - Move o foco para o próximo item na barra de menus.<br> - Se o foco estiver no último item, move o foco para o primeiro item.<br> - Se o foco estiver em um item de submenu, abre o próximo submenu e coloca o foco no primeiro item. <br> - Se o foco estiver em um item que não possui um submenu: Fecha o submenu; Move o foco para o próximo item na barra de menus; Abre o submenu do item da barra de menus recém-focado, mantendo o foco nesse item da barra de menus pai. |
| ⬅ | - Move o foco para o item anterior na barra de menus.<br> - Se o foco estiver no primeiro item, move o foco para o último item. |
| ⬇ | - Abre o submenu e move o foco para o primeiro item no submenu.<br> - Quando em um submenu, move o foco para o próximo item.<br> - Se o foco estiver no último item de um submenu, move o foco para o primeiro item. |
| ⬆ | - Abre o submenu e move o foco para o último item do submenu.<br> - Quando em um submenu, move o foco para o item anterior.<br> - Se o foco estiver no primeiro item de um submenu, move o foco para o último item. |
| [**Home**] | Move o foco para o primeiro item na barra de menus/ submenu. |
| [**End**] | Move o foco para o último item na barra de menus/ submenu. |
| [Character 🔡] | - Move o foco para o próximo item na barra de menus/ submenu com um nome que começa com o caractere digitado.<br> - Se nenhum dos itens tiver um nome começando com o caractere digitado, o foco não se moverá. |

</details>

<details>
    <summary> <strong>Menu Type [02-2]</strong> </summary>
    Menu Acessivel mais simples utilizando JS e JQuery Baseado no <a href="https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/menubar/menubar-1/menubar-1.html#">menu da W3C</a> com semantica correta e facilitada para uso de leitor de tela.
    <p>Para usar o menu acessível é preciso seguir a estrutura HTML do menu02.html, com os atributos e data-attributes necessários para cada tipo de item ou subitem do menu. E ao utilizar o script JS deve ser selecionado o data atribute correto para a variavel menubar. No CSS alem do hover sobre os itens do menu que deve exibir o submenu, a classe "active" também deve ativar a visibilidade do submenu.</p>

#### Keyboard Support
|       Key          |       Function    |
|       :----:       |       :---        |
| [**Space**] / [**Enter**] | - Abre o submenu e move o foco para o primeiro item no submenu.<br> - Quando usado no submenu abre o link. |
| [**ESC**] | - Quando o foco esta em um submenu, fecha o submenu.<br> - Move o foco para o item pai da barra de menus |
| ➡ | - Move o foco para o próximo item na barra de menus.<br> - Se o foco estiver no último item, move o foco para o primeiro item.<br> - Se o foco estiver em um item de submenu, abre o próximo submenu e coloca o foco no primeiro item. <br> - Se o foco estiver em um item que não possui um submenu: Fecha o submenu; Move o foco para o próximo item na barra de menus; Abre o submenu do item da barra de menus recém-focado, mantendo o foco nesse item da barra de menus pai. |
| ⬅ | - Move o foco para o item anterior na barra de menus.<br> - Se o foco estiver no primeiro item, move o foco para o último item. |
| ⬇ | - Abre o submenu e move o foco para o primeiro item no submenu.<br> - Quando em um submenu, move o foco para o próximo item.<br> - Se o foco estiver no último item de um submenu, move o foco para o primeiro item. |
| ⬆ | - Abre o submenu e move o foco para o último item do submenu.<br> - Quando em um submenu, move o foco para o item anterior.<br> - Se o foco estiver no primeiro item de um submenu, move o foco para o último item. |
| [**Home**] | Move o foco para o primeiro item na barra de menus/ submenu. |
| [**End**] | Move o foco para o último item na barra de menus/ submenu. |

</details>


## :octocat: Contributing

This project is for study purposes, so contact me and let me know your ideas.

All kinds of contributions are very welcome and appreciated!
   - ⭐️ Star the project
   - 🐛 Find and report issues
   - 📥 Submit PRs to help solve issues or add features
   - ✋ Influence the future of project with feature requests

## 🔖 License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.

-------------------------------------

🤍 Made by <strong>Merieli Manzano</strong> Ⓜ

<p align="right">(<a href="#top">back to top</a>)</p>
</details>