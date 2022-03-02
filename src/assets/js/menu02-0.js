// https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/menubar/menubar-1/menubar-1.html#
// Menu Acessivel com interações completas em Vanilla JS
(function (){
    // Função construtora executada ao inicializar o objeto Menubar
    const Menubar = function (domNode) {
        var elementChildren = domNode.firstElementChild;
        const msgPrefix = 'Menubar constructor argument menubarNode';
      
        // Verifique se menubarNode é um elemento DOM
        if (!domNode instanceof Element) {
            throw new TypeError(msgPrefix + 'is not a DOM Element.');
        }
      
        // Verifica se menubarNode possui elementos descendentes
        if (domNode.childElementCount === 0) {
            throw new Error(msgPrefix + 'has no element children.');
        }        
      
        // Verifique se os primeiros itens do menu menubarNode tem elementos de link tag A
        e = elementChildren;
        while (e) {
            var menubarItem = e.firstElementChild;
            if (e && menubarItem && menubarItem.tagName !== 'A') {
                throw new Error(msgPrefix + 'has child elements are not A elements.');
            }

            // Reatribuir ao valor de "e" ao proximo elemento irmão, dessa forma ele é definido como o proximo elemento a cada execução do while e quando for o ultimo elemento será atributo o valor "null" fazendo com que o while termine
            e = e.nextElementSibling;
        }
      
        // define o atributo "isMenubar" do objeto como true
        this.isMenubar = true;
        // define ao atributo "domNode" do objeto o valor do argumento passado para o objeto
        this.domNode = domNode;
      
        this.listMenuItems = []; //define o atributo "listMenuItems" como um array vazio
        this.firstChars = []; //define o atributo "firstChars" como um array vazio
      
        this.firstItem = null; // define o atributo "firstItem" como null - See Menubar init method
        this.lastItem = null; // define o atributo "lastItem" como null -  See Menubar init method
      
        this.hasFocus = false; // define o atributo "hasFocus" como false - See MenubarItem handleFocus, handleBlur
        this.hasHover = false; // define o atributo "hasHover" como false - See Menubar handleMouseover, handleMouseout
    };
      
    /*
    *   @method Menubar.prototype.init
    *
    *   @desc
    *     Adiciona a função ARIA ao nó da barra de menus
    *     Percorre os filhos da barra de menu para elementos de tag A para configurar cada elemento A como um item de menu ARIA
    *     e preencha o array de itens de menu. Inicializando as propriedades firstItem e lastItem.
    * */
    // herda todos os atributos do objeto Menubar e inicializa uma nova instancia do objeto
    Menubar.prototype.init = function () {
        var menubarItem, childElementUL, menuElementLink, textContent, numItems;
      
        // Percorre os filhos do elemento UL de menubarNode configurando cada um com um comportamento de role menuitem e armazene a referência no array menuitems.
        childElementUL = this.domNode.firstElementChild;
      
        while (childElementUL) {
            menuElementLink = childElementUL.firstElementChild;
        
            if (childElementUL && menuElementLink && menuElementLink.tagName === 'A') {
                // instanciado um novo objeto de MenubarItem e inicializado sua execução
                menubarItem = new MenubarItem(menuElementLink, this);
                menubarItem.init();
                // adiciona a ultima posicao do array listMenuItems cada instancia de objeto criada a partir do menubarItem
                this.listMenuItems.push(menubarItem);
                // adiciona a ultima posicao do array firstChars a primeira varra do texto contido na tag A do menu em minuscula
                textContent = menuElementLink.textContent.trim();
                this.firstChars.push(textContent.substring(0, 1).toLowerCase());
            }
            // Reatribuir ao valor do elemento LI o proximo elemento irmão, dessa forma ele é definido como o proximo elemento a cada execução do while e quando for o ultimo elemento será atributo o valor "null" fazendo com que o while termine
            childElementUL = childElementUL.nextElementSibling;
        }
      
        // Use o array de itens de menu preenchido para inicializar firstItem e lastItem
        numItems = this.listMenuItems.length;
        if (numItems > 0) {
            this.firstItem = this.listMenuItems[ 0 ];
            this.lastItem = this.listMenuItems[ numItems - 1 ];
        }
        this.firstItem.domNode.tabIndex = 0;
    };
      
    /* MÉTODOS DE GESTÃO DE FOCO */
    // herda todos os atributos do objeto Menubar e define ao atributo "setFocusToItem" uma função
    Menubar.prototype.setFocusToItem = function (newItem) { 
        var flag = false;
        const numItems = this.listMenuItems.length;
      
        for (var i = 0; i < numItems; i++) {
            var objectMenubarItem = this.listMenuItems[i];
            // se o item do menu tiver atributo que deve estar incluido na sequencia de TAB será atribuido a flag o valor do atributo aria-expanded "que Indica que o submenu está aberto" como True
            if (objectMenubarItem.domNode.tabIndex == 0) {
                flag = objectMenubarItem.domNode.getAttribute('aria-expanded') === 'true';
            }
            //define que o item do menu deve continuar focalizavel mas sair da sequencia de TAB
            objectMenubarItem.domNode.tabIndex = -1;

            // se o item do  menu tiver o atributo popupMenu essa janela de popup será fechada 
            if (objectMenubarItem.popupMenu) {
                objectMenubarItem.popupMenu.close();
            }
        }   
        // define o foco para o elemento newItem que for passado como argumento para o método setFocusToItem, define que esse elemento deve estar incluido na sequencia de TAB 
        newItem.domNode.focus();
        newItem.domNode.tabIndex = 0;
        
        // se a flag for true e o item do menu tiver um poup ele será aberto
        if (flag && newItem.popupMenu) {
            newItem.popupMenu.open();
        }
    };
      
    Menubar.prototype.setFocusToFirstItem = function (flag) {
        this.setFocusToItem(this.firstItem);
    };
      
    Menubar.prototype.setFocusToLastItem = function (flag) {
        this.setFocusToItem(this.lastItem);
    };
    
    // metodo do objeto que seta o foco para o item anterior
    Menubar.prototype.setFocusToPreviousItem = function (currentItem) {
        // se o item atual passado como argumento for igual ao primeiro item define que o novo item sera o mesmo que o ultimo
        if (currentItem === this.firstItem) {
            newItem = this.lastItem;
        }
        else {
            const index = this.listMenuItems.indexOf(currentItem);
            newItem = this.listMenuItems[ index - 1 ];
        }
        //define o foco para newItem
        this.setFocusToItem(newItem);      
    };
    
    // metodo do objeto que seta o foco para o proximo item
    Menubar.prototype.setFocusToNextItem = function (currentItem) { 
        //define que se o item atual for o ultimo, o newitem será o primeiro item    
        if (currentItem === this.lastItem) {
            newItem = this.firstItem;
        } else {
            //define que o index sera o primeiro numero de indice em que o item atual for encontrado no array de listMenuItems 
            const index = this.listMenuItems.indexOf(currentItem);
            //define que new item será o proximo indice do que o elemento atual foi encontrado
            newItem = this.listMenuItems[ index + 1 ];
        }
        // define que o foco para newItem
        this.setFocusToItem(newItem);      
    };
    
    // metodo do objeto que seta o foco para o primeiro caracter
    Menubar.prototype.setFocusByFirstCharacter = function (currentItem, char) {
        var start, index, char = char.toLowerCase();
      
        // Obter índice inicial para pesquisa com base na posição de currentItem
        start = this.listMenuItems.indexOf(currentItem) + 1;
        if (start === this.listMenuItems.length) {
            start = 0;
        }
      
        // Verifica os slots restantes no menu executando o metodo "getIndexFirstChars"
        index = this.getIndexFirstChars(start, char);
      
        // Se não for encontrado nos slots restantes, verifique desde o início
        if (index === -1) {
            index = this.getIndexFirstChars(0, char);
        }
      
        // Se a correspondência foi encontrada define o foco para este indice
        if (index > -1) {
            this.setFocusToItem(this.listMenuItems[ index ]);
        }
    };
    
    // metodo do objeto que pega o primeiro indice dos caracteres
    Menubar.prototype.getIndexFirstChars = function (startIndex, char) {
        for (var i = startIndex; i < this.firstChars.length; i++) {
            //se o caracter tiver um valor iqual ao contido no array firstChars retorna o valor do seu indice
            if (char === this.firstChars[ i ]) {
                return i;
            }
        }
        return -1;
    };
    
    /* define um novo objeto MenubarItem */
    const MenubarItem = function (domNode, menuObj) {

        this.menu = menuObj;
        this.domNode = domNode;
        this.popupMenu = false;
      
        this.hasFocus = false;
        this.hasHover = false;
      
        this.isMenubarItem = true;
        //congeladas todas as teclas definidas
        this.keyCode = Object.freeze({
            'TAB': 9,
            'RETURN': 13,
            'ESC': 27,
            'SPACE': 32,
            'PAGEUP': 33,
            'PAGEDOWN': 34,
            'END': 35,
            'HOME': 36,
            'LEFT': 37,
            'UP': 38,
            'RIGHT': 39,
            'DOWN': 40
        });
    };
    // inicializa uma nova instancia herdada do objeto MenubarItem
    MenubarItem.prototype.init = function () {
        this.domNode.tabIndex = -1;
        
        //quando uma tecla for disparada irá executar a partir do menubaritem o metodo "handleKeydown"
        this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
        //quando ocorrer o foco em um elemento irá executar a partir do menubaritem o metodo "handleFocus"
        this.domNode.addEventListener('focus', this.handleFocus.bind(this));
        //quando ocorrer a perda de foco em um elemento irá executar a partir do menubaritem o metodo "handleBlur"
        this.domNode.addEventListener('blur', this.handleBlur.bind(this));
        //quando o mouse for movido para um elemento ou seu filho irá executar a partir do menubaritem o metodo "handleMouseover"
        this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
        //quando o mouse for movido para fora de um elemento ou seu filho  irá executar a partir do menubaritem o metodo "handleMouseout"
        this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));
      
        //Inicializar menus pop-up      
        var nextElement = this.domNode.nextElementSibling;
        if (nextElement && nextElement.tagName === 'UL') {
            this.popupMenu = new PopupMenu(nextElement, this);
            this.popupMenu.init();
        }
      
    };

    // inicializa um metodo handleKeydown herdado do metodo MenubarItem  
    MenubarItem.prototype.handleKeydown = function (event) {
        // char recebe a tecla que foi clicada quando o evento ocorreu
        var char = event.key,
            flag = false;
      
        function isPrintableCharacter (str) {
            // se a string passada como argumento tiver 1 caractere e nenhum espaco em branco ira retornar true
            return str.length === 1 && str.match(/\S/);
        }
        
        switch (event.keyCode) {
            case this.keyCode.SPACE:
            case this.keyCode.RETURN:
            case this.keyCode.DOWN:
                if (this.popupMenu) {
                    this.popupMenu.open();
                    this.popupMenu.setFocusToFirstItem();
                    flag = true;
                }
                break;
        
            case this.keyCode.LEFT:
                this.menu.setFocusToPreviousItem(this);
                flag = true;
                break;
        
            case this.keyCode.RIGHT:
                this.menu.setFocusToNextItem(this);
                flag = true;
                break;
        
            case this.keyCode.UP:
                if (this.popupMenu) {
                    this.popupMenu.open();
                    this.popupMenu.setFocusToLastItem();
                    flag = true;
                }
                break;
        
            case this.keyCode.HOME:
            case this.keyCode.PAGEUP:
                this.menu.setFocusToFirstItem();
                flag = true;
                break;
        
            case this.keyCode.END:
            case this.keyCode.PAGEDOWN:
                this.menu.setFocusToLastItem();
                flag = true;
                break;
        
            case this.keyCode.TAB:
                this.popupMenu.close(true);
                break;
        
            case this.keyCode.ESC:
                this.popupMenu.close(true);
                break;
        
            default:
                if (isPrintableCharacter(char)) {
                    this.menu.setFocusByFirstCharacter(this, char);
                    flag = true;
                }
                break;
        }
      
        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    };
    // metodo herdado do objeto MenubarItem que seta a expansão da div
    MenubarItem.prototype.setExpanded = function (value) {
        if (value) {
            this.domNode.setAttribute('aria-expanded', 'true');
        }
        else {
            this.domNode.setAttribute('aria-expanded', 'false');
        }
    };
      
    MenubarItem.prototype.handleFocus = function (event) {
        this.menu.hasFocus = true;
    };
      
    MenubarItem.prototype.handleBlur = function (event) {
        this.menu.hasFocus = false;
    };
      
    MenubarItem.prototype.handleMouseover = function (event) {
        this.hasHover = true;
        this.popupMenu.open();
    };
      
    MenubarItem.prototype.handleMouseout = function (event) {
        this.hasHover = false;
        setTimeout(this.popupMenu.close.bind(this.popupMenu, false), 300);
    };

    /* Objeto prototype PopupMenu */
    function PopupMenu (domNode, controllerObj) {
        const msgPrefix = 'PopupMenu constructor argument domNode ';
      
        // Verifique se domNode é um elemento DOM
        if (!domNode instanceof Element) {
          throw new TypeError(msgPrefix + 'is not a DOM Element.');
        }
        // Verifique se domNode tem elementos filhos
        if (domNode.childElementCount === 0) {
          throw new Error(msgPrefix + 'has no element children.');
        }
        // Verifique se os elementos descendentes do domNode têm elementos de tag A
        var childElement = domNode.firstElementChild;
        while (childElement) {
            const menuitem = childElement.firstElementChild;
            if (menuitem && menuitem === 'A') {
                throw new Error(msgPrefix + 'has descendant elements that are not A elements.');
            }
            childElement = childElement.nextElementSibling;
        }
      
        this.isMenubar = false;
      
        this.domNode    = domNode;
        this.controller = controllerObj;
      
        this.menuitems = []; // See PopupMenu init method
        this.firstChars = []; // See PopupMenu init method
      
        this.firstItem = null; // See PopupMenu init method
        this.lastItem = null; // See PopupMenu init method
      
        this.hasFocus = false; // See MenuItem handleFocus, handleBlur
        this.hasHover = false; // See PopupMenu handleMouseover, handleMouseout
    };
      
    /*
    *   @method PopupMenu.prototype.init
    *
    *   @desc
    *       Adicione ouvintes de eventos domNode para mouseover e mouseout. 
    *       Percorre os filhos do domNode para configurar cada item de menu e preencher
    *       o array de itens de menu. Inicializando as propriedades firstItem e lastItem.
    */
    PopupMenu.prototype.init = function () {
        var childElement, menuElement, menuItem, textContent, numItems, label;
      
        // Configure o próprio domNode      
        this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
        this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));
      
        // Percorra os filhos do elemento domNode: configure cada um com role menuitem e referência de armazenamento no array menuitems.
        childElement = this.domNode.firstElementChild;
      
        while (childElement) {
            menuElement = childElement.firstElementChild;
        
            if (menuElement && menuElement.tagName === 'A') {
                menuItem = new MenuItem(menuElement, this);
                menuItem.init();
                this.menuitems.push(menuItem);
                textContent = menuElement.textContent.trim();
                this.firstChars.push(textContent.substring(0, 1).toLowerCase());
            }
            childElement = childElement.nextElementSibling;
        }
      
        //Use o array e itens de menu preenchido para inicializar firstItem e lastItem.
        numItems = this.menuitems.length;
        if (numItems > 0) {
            this.firstItem = this.menuitems[ 0 ];
            this.lastItem = this.menuitems[ numItems - 1 ];
        }
    };
      
    /* MANIFESTADORES DE EVENTOS */       
    PopupMenu.prototype.handleMouseover = function (event) {
        this.hasHover = true;
    };
      
    PopupMenu.prototype.handleMouseout = function (event) {
        this.hasHover = false;
        setTimeout(this.close.bind(this, false), 1);
    };
      
    /* MÉTODOS DE GESTÃO DE FOCO */      
    PopupMenu.prototype.setFocusToController = function (command, flag) {      
        if (typeof command !== 'string') {
            command = '';
        }
      
        function setFocusToMenubarItem (controller, close) {
            while (controller) {
                if (controller.isMenubarItem) {
                    controller.domNode.focus();
                    return controller;
                } else {
                    if (close) {
                        controller.menu.close(true);
                    }
                    controller.hasFocus = false;
                }
                controller = controller.menu.controller;
            }
            return false;
        }
      
        if (command === '') {
            if (this.controller && this.controller.domNode) {
                this.controller.domNode.focus();
            }
            return;
        }
      
        if (!this.controller.isMenubarItem) {
            this.controller.domNode.focus();
            this.close();
        
            if (command === 'next') {
                var menubarItem = setFocusToMenubarItem(this.controller, false);
                if (menubarItem) {
                    menubarItem.menu.setFocusToNextItem(menubarItem, flag);
                }
            }
        }
        else {
            if (command === 'previous') {
                this.controller.menu.setFocusToPreviousItem(this.controller, flag);
            }
            else if (command === 'next') {
                this.controller.menu.setFocusToNextItem(this.controller, flag);
            }
        }
      
    };
      
    PopupMenu.prototype.setFocusToFirstItem = function () {
        this.firstItem.domNode.focus();
    };
      
    PopupMenu.prototype.setFocusToLastItem = function () {
        this.lastItem.domNode.focus();
    };
      
    PopupMenu.prototype.setFocusToPreviousItem = function (currentItem) {
        var index;
      
        if (currentItem === this.firstItem) {
            this.lastItem.domNode.focus();
        }
        else {
            index = this.menuitems.indexOf(currentItem);
            this.menuitems[ index - 1 ].domNode.focus();
        }
    };
      
    PopupMenu.prototype.setFocusToNextItem = function (currentItem) {
        var index;
      
        if (currentItem === this.lastItem) {
            this.firstItem.domNode.focus();
        }
        else {
            index = this.menuitems.indexOf(currentItem);
            this.menuitems[ index + 1 ].domNode.focus();
        }
    };
      
    PopupMenu.prototype.setFocusByFirstCharacter = function (currentItem, char) {
        var start, index;
        const charLower = char.toLowerCase();
      
        // Obter índice inicial para pesquisa com base na posição de currentItem
        start = this.menuitems.indexOf(currentItem) + 1;
        if (start === this.menuitems.length) {
            start = 0;
        }
      
        // Verifique os slots restantes no menu
        index = this.getIndexFirstChars(start, charLower);
      
        // Se não for encontrado nos slots restantes, verifique desde o início
        if (index === -1) {
            index = this.getIndexFirstChars(0, charLower);
        }
      
        // Se a correspondência foi encontrada, define foco para o item no menu
        if (index > -1) {
            this.menuitems[ index ].domNode.focus();
        }
    };
      
    PopupMenu.prototype.getIndexFirstChars = function (startIndex, char) {
        for (var i = startIndex; i < this.firstChars.length; i++) {
            if (char === this.firstChars[ i ]) {
                return i;
            }
        }
        return -1;
    };
      
    /* MÉTODOS DE EXIBIÇÃO DO MENU */      
    PopupMenu.prototype.open = function () {
        // Define a classe CSS do PopUpMenu
        if (this.controller.isMenubarItem) {
            this.domNode.classList.add('active');
        }
        this.controller.setExpanded(true);  
    };
      
    PopupMenu.prototype.close = function (force) {      
        var controllerHasHover = this.controller.hasHover;
      
        var hasFocus = this.hasFocus;
      
        for (var i = 0; i < this.menuitems.length; i++) {
            var currentItem = this.menuitems[i];
            if (currentItem.popupMenu) {
                hasFocus = hasFocus | currentItem.popupMenu.hasFocus;
            }
        }
      
        if (!this.controller.isMenubarItem) {
            controllerHasHover = false;
        }
      
        if (force || (!hasFocus && !this.hasHover && !controllerHasHover)) {
            this.domNode.classList.remove('active');
            this.controller.setExpanded(false);
        }
    };

    /* Objeto MenuItem */
    const MenuItem = function (domNode, menuObj) {

        if (typeof popupObj !== 'object') {
            popupObj = false;
        }
      
        this.domNode = domNode;
        this.menu = menuObj;
        this.popupMenu = false;
        this.isMenubarItem = false;
      
        this.keyCode = Object.freeze({
          'TAB': 9,
          'RETURN': 13,
          'ESC': 27,
          'SPACE': 32,
          'PAGEUP': 33,
          'PAGEDOWN': 34,
          'END': 35,
          'HOME': 36,
          'LEFT': 37,
          'UP': 38,
          'RIGHT': 39,
          'DOWN': 40
        });
    };
      
    MenuItem.prototype.init = function () {
        this.domNode.tabIndex = -1;
      
        this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
        this.domNode.addEventListener('click', this.handleClick.bind(this));
        this.domNode.addEventListener('focus', this.handleFocus.bind(this));
        this.domNode.addEventListener('blur', this.handleBlur.bind(this));
        this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
        this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));
      
        // Inicializar o menu suspenso
      
        const nextElement = this.domNode.nextElementSibling;
      
        if (nextElement && nextElement.tagName === 'UL') {
            this.popupMenu = new PopupMenu(nextElement, this);
            this.popupMenu.init();
        }
      
    };
      
    MenuItem.prototype.isExpanded = function () {
        return this.domNode.getAttribute('aria-expanded') === 'true';
    };
      
    /* MANIFESTADORES DE EVENTOS */      
    MenuItem.prototype.handleKeydown = function (event) {
        const target  = event.currentTarget;
        var char = event.key,
            flag = false,
            clickEvent;
      
        function isPrintableCharacter (str) {
            return str.length === 1 && str.match(/\S/);
        }
      
        switch (event.keyCode) {
            case this.keyCode.SPACE:
            case this.keyCode.RETURN:
                if (this.popupMenu) {
                    this.popupMenu.open();
                    this.popupMenu.setFocusToFirstItem();
                }
                else {
                    // rie um evento de mouse simulado para imitar o comportamento dos ATs e deixe o manipulador de eventos handleClick fazer a limpeza.
                    try {
                        clickEvent = new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                        });
                    }
                    catch (err) {
                        if (document.createEvent) {
                        // DOM Level 3 for IE 9+
                        clickEvent = document.createEvent('MouseEvents');
                        clickEvent.initEvent('click', true, true);
                        }
                    }
                    target.dispatchEvent(clickEvent);
                }        
                flag = true;
                break;
      
            case this.keyCode.UP:
                this.menu.setFocusToPreviousItem(this);
                flag = true;
                break;
      
            case this.keyCode.DOWN:
                this.menu.setFocusToNextItem(this);
                flag = true;
                break;
      
            case this.keyCode.LEFT:
                this.menu.setFocusToController('previous', true);
                this.menu.close(true);
                flag = true;
                break;
      
            case this.keyCode.RIGHT:
                if (this.popupMenu) {
                    this.popupMenu.open();
                    this.popupMenu.setFocusToFirstItem();
                }
                else {
                    this.menu.setFocusToController('next', true);
                    this.menu.close(true);
                }
                flag = true;
                break;
      
            case this.keyCode.HOME:
            case this.keyCode.PAGEUP:
                this.menu.setFocusToFirstItem();
                flag = true;
                break;
      
            case this.keyCode.END:
            case this.keyCode.PAGEDOWN:
                this.menu.setFocusToLastItem();
                flag = true;
                break;
      
            case this.keyCode.ESC:
                this.menu.setFocusToController();
                this.menu.close(true);
                flag = true;
                break;
      
            case this.keyCode.TAB:
                this.menu.setFocusToController();
                break;
        
            default:
                if (isPrintableCharacter(char)) {
                    this.menu.setFocusByFirstCharacter(this, char);
                    flag = true;
                }
                break;
        }
      
        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    };
      
    MenuItem.prototype.setExpanded = function (value) {
        if (value) {
            this.domNode.setAttribute('aria-expanded', 'true');
        }
        else {
            this.domNode.setAttribute('aria-expanded', 'false');
        }
    };
      
    MenuItem.prototype.handleClick = function (event) {
        this.menu.setFocusToController();
        this.menu.close(true);
    };
      
    MenuItem.prototype.handleFocus = function (event) {
        this.menu.hasFocus = true;
    };
      
    MenuItem.prototype.handleBlur = function (event) {
        this.menu.hasFocus = false;
        setTimeout(this.menu.close.bind(this.menu, false), 300);
    };
      
    MenuItem.prototype.handleMouseover = function (event) {
        this.menu.hasHover = true;
        this.menu.open();
        if (this.popupMenu) {
            this.popupMenu.hasHover = true;
            this.popupMenu.open();
        }
    };
      
    MenuItem.prototype.handleMouseout = function (event) {
        if (this.popupMenu) {
            this.popupMenu.hasHover = false;
            this.popupMenu.close(true);
        }
      
        this.menu.hasHover = false;
        setTimeout(this.menu.close.bind(this.menu, false), 300);
    };
    
    var menubar = new Menubar(document.querySelector('[data-menu="acessible"]'));
    menubar.init();
})();