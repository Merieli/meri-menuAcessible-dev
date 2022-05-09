(function (){
   
    class DisclosureNav {
        constructor(domNode) {

            this.rootNode = domNode;
            this.controlledNodes = [];
            this.openIndex = null;
            this.topLevelNodes = [...this.rootNode.querySelectorAll('button[aria-expanded][aria-controls]'),
            ];
    
            this.topLevelNodes.forEach((node) => {
                // handle button + menu
                if (node.tagName.toLowerCase() === 'button' && node.hasAttribute('aria-controls')) {
                    const menu = node.parentNode.querySelector('ul');
                    if (menu) {
                        // save ref controlled menu
                        this.controlledNodes.push(menu);
            
                        // collapse menus
                        node.setAttribute('aria-expanded', 'false');
                        this.toggleMenu(menu, false);
            
                        // attach event listeners
                        node.addEventListener('click', this.onButtonClick.bind(this));
                    }
                }
                /* handle links
                else {
                    this.controlledNodes.push(null);
                    node.addEventListener('keydown', this.onLinkKeyDown.bind(this));
                }*/
            });    
            this.rootNode.addEventListener('focusout', this.onBlur.bind(this));
        }
    
        // public function to close open menu
        close() {
            this.toggleExpand(this.openIndex, false);
        }
    
        onBlur(event) {
            var menuContainsFocus = this.rootNode.contains(event.relatedTarget);
            if (!menuContainsFocus && this.openIndex !== null) {
                this.toggleExpand(this.openIndex, false);
            }
        }
    
        onButtonClick(event) {
            var button = event.target;
            var buttonIndex = this.topLevelNodes.indexOf(button);
            var buttonExpanded = button.getAttribute('aria-expanded') === 'true';
            this.toggleExpand(buttonIndex, !buttonExpanded);
        }
    
        onButtonKeyDown(event) {
            var targetButtonIndex = this.topLevelNodes.indexOf(document.activeElement);
        
            // close on escape
            if (event.key === 'Escape') {
                this.toggleExpand(this.openIndex, false);
            }
        
        }
    
        onLinkKeyDown(event) {
            var targetLinkIndex = this.topLevelNodes.indexOf(document.activeElement);
        
        }
    
        toggleExpand(index, expanded) {
        // close open menu, if applicable
        if (this.openIndex !== index) {
            this.toggleExpand(this.openIndex, false);
        }
    
        // handle menu at called index
        if (this.topLevelNodes[index]) {
            this.openIndex = expanded ? index : null;
            this.topLevelNodes[index].setAttribute('aria-expanded', expanded);
            this.toggleMenu(this.controlledNodes[index], expanded);
        }
        }
    
        toggleMenu(domNode, show) {
            if (domNode) {
                domNode.style.display = show ? 'block' : 'none';
            }
        }
    }
    
    /* Initialize Disclosure Menus */
    // Quando a janela for carregada:
    window.addEventListener('load', function () {
        var menus = document.querySelectorAll('[data-disclosureNav]');
        var disclosureMenus = [];
    
        for (var i = 0; i < menus.length; i++) {
            disclosureMenus[i] = new DisclosureNav(menus[i]);
        }

        // fake link behavior
        disclosureMenus.forEach((disclosureNav, i) => {
            let links = menus[i].querySelectorAll('[data-subListMenu]');
            for (let k = 0; k < links.length; k++) {                
                links[k].addEventListener('click', (event) => {
                    // handle aria-current
                    for (let n = 0; n < links.length; n++) {
                        links[n].removeAttribute('aria-current');
                    }
                    event.target.setAttribute('aria-current', 'page');
                });
            }
        });
    }, false);
})();