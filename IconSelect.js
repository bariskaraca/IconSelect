/**  IconSelect
* methods:
    * setIcons(icons)
    * getSelectedIndex()
    * setSelectedIndex(index)
        * multiple selection: array
        * single selection: number
 * selector ***
 * options: (as object)
    * multipleSelect               (default: false)
    * selectedIconWidth            (default: 48)
    * selectedIconHeight           (default: 48)
    * selectedBoxPadding           (default: 1)
    * selectedBoxPaddingRight      (default: 12)
    * iconsWidth                   (default: 32)
    * iconsHeight                  (default: 32)
    * boxIconSpace                 (default: 1)
    * vectoralIconNumber           (default: 3)
    * horizontalIconNumber         (default: 3)
    * selectedVectoralIconNumber   (default: 2)
    * selectedHorizontalIconNumber (default: 3)
 * **/
function IconSelect(selector, options) {
    options = options ? options : {};
    this.options = options;
    this.element = document.querySelector(selector);
    this.selector = selector;
    this.selectedIndexes = [];
    this.multipleSelect = options.multipleSelect ? options.multipleSelect : false;
}
IconSelect.prototype = {
    constructor: IconSelect,
    setIcons: function (icons) {
        const that = this;
        $(that.element).empty();
        $(that.element).addClass("icon-select");
        var parameters = that.options;
        parameters.selectedIconWidth            = (parameters.selectedIconWidth)            ? parameters.selectedIconWidth            : 48;
        parameters.selectedIconHeight           = (parameters.selectedIconHeight)           ? parameters.selectedIconHeight           : 48;
        parameters.selectedBoxPadding           = (parameters.selectedBoxPadding)           ? parameters.selectedBoxPadding           : 1;
        parameters.selectedBoxPaddingRight      = (parameters.selectedBoxPaddingRight)      ? parameters.selectedBoxPaddingRight      : 12;
        parameters.iconsWidth                   = (parameters.iconsWidth)                   ? parameters.iconsWidth                   : 32;
        parameters.iconsHeight                  = (parameters.iconsHeight)                  ? parameters.iconsHeight                  : 32;
        parameters.boxIconSpace                 = (parameters.boxIconSpace)                 ? parameters.boxIconSpace                 : 1;
        parameters.vectoralIconNumber           = (parameters.vectoralIconNumber)           ? parameters.vectoralIconNumber           : 3;
        parameters.horizontalIconNumber         = (parameters.horizontalIconNumber)         ? parameters.horizontalIconNumber         : 3;
        parameters.selectedVectoralIconNumber   = (parameters.selectedVectoralIconNumber)   ? parameters.selectedVectoralIconNumber   : 2;
        parameters.selectedHorizontalIconNumber = (parameters.selectedHorizontalIconNumber) ? parameters.selectedHorizontalIconNumber : 3;
        that.options = parameters;
        that.selectedBoxElement = document.createElement('div');
        that.selectedBoxElement.setAttribute('class' ,'selected-box');
        that.selectedIconElement = document.createElement('div');
        that.selectedIconElement.setAttribute('class' ,'selected-icon');
        that.selectedIconImgElement = document.createElement('img');
        that.selectedIconImgElement.setAttribute('src', '');
        that.selectedIconElement.appendChild( that.selectedIconImgElement);

        that.boxScrollElement = document.createElement('div');
        that.boxScrollElement.setAttribute('id',that.selector + "-box-scroll");
        that.boxScrollElement.setAttribute('class', 'box');

        that.boxElement = document.createElement('div');
        that.boxScrollElement.appendChild( that.boxElement);

        that.selectedIconImgElement.setAttribute('width', parameters.selectedIconWidth);
        that.selectedIconImgElement.setAttribute('height', parameters.selectedIconHeight);
        that.selectedIconElement.style.width = parameters.selectedIconWidth + "px";
        that.selectedIconElement.style.height = parameters.selectedIconHeight + "px";
        that.selectedBoxElement.style.width = (parameters.selectedIconWidth + parameters.selectedBoxPadding + parameters.selectedBoxPaddingRight)+ "px";
        that.selectedBoxElement.style.height = (parameters.selectedIconHeight + (parameters.selectedBoxPadding * 2))+ "px";
        that.selectedIconElement.style.top = parameters.selectedBoxPadding+ "px";
        that.selectedIconElement.style.left = parameters.selectedBoxPadding+ "px";

        that.selectedBoxElement.style.minWidth = (parameters.selectedIconWidth + parameters.selectedBoxPadding + parameters.selectedBoxPaddingRight)+ "px";
        that.selectedBoxElement.style.minHeight = (parameters.selectedIconHeight + (parameters.selectedBoxPadding * 2))+ "px";
        that.selectedBoxElement.style.maxWidth = (parameters.selectedVectoralIconNumber*(parameters.selectedIconWidth + parameters.selectedBoxPadding + parameters.selectedBoxPaddingRight))+ "px";
        that.selectedBoxElement.style.maxHeight = (parameters.selectedHorizontalIconNumber*(parameters.selectedIconHeight + 6 + (parameters.selectedBoxPadding * 2)))+ "px";

        that.boxScrollElement.style.left = (parseInt( that.selectedBoxElement.style.width) + 1)+ "px";

        that.boxScrollElement.style.width = (((parameters.iconsWidth + 4) * parameters.vectoralIconNumber) +
            ((parameters.vectoralIconNumber + 1) * parameters.boxIconSpace))+"px";
        that.boxScrollElement.style.height = (((parameters.iconsHeight + 4 ) * parameters.horizontalIconNumber) +
            ((parameters.horizontalIconNumber + 1) * parameters.boxIconSpace))+ "px";

        that.boxElement.style.left =  that.boxScrollElement.style.left;
        that.boxElement.style.width =  that.boxScrollElement.style.width;

        that.element.appendChild( that.selectedBoxElement);
        that.selectedBoxElement.appendChild( that.selectedIconElement);
        that.selectedBoxElement.appendChild( that.boxScrollElement);
        that.selectedIconElement.style.width = (parseInt( that.selectedIconElement.style.width)+ that.selectedIconElement.offsetWidth - that.selectedIconElement.clientWidth) + "px";
        that.boxScrollElement.style.width = (parseInt( that.boxScrollElement.style.width)+ that.boxScrollElement.offsetWidth - that.boxScrollElement.clientWidth) + "px";
        that.boxElement.style.display = "none";
        that.boxScrollElement.style.display = "none";
        var clicked = false, selectedClicked = false, verticalChange = 0, selectedVerticalChange = 0;
        // that.boxScrollElement.onmousedown = function(e){
        //     e.preventDefault();
        //     clicked = true;
        // };
        // that.selectedIconElement.onmousedown = function(e){
        //     e.preventDefault();
        //     selectedClicked = true;
        // };
        // window.onmouseup = function(e){
        //     e.preventDefault();
        //     clicked = selectedClicked = false;
        // };
        that.element.onclick = function(e){
            if(that.boxElement.style.display === "block"){
                that.boxElement.style.display = "none";
                that.boxScrollElement.style.display = "none";
            }
            else{
                $(".icon-select .box").css("display","none");
                $(".icon-select .box > div").css("display","none");
                that.boxElement.style.display = "block";
                that.boxScrollElement.style.display = "block";
            }
        };
        that.boxScrollElement.onmousemove = function(e){
            e.preventDefault();
            if(clicked){
                verticalChange += e.movementY || e.mozMovementY || e.webkitMovementY || 0;
                that.boxScrollElement.scrollTop = verticalChange;
            }
        };
        that.element.onmousemove = function(e){
            e.preventDefault();
            // if(selectedClicked){
            //     selectedVerticalChange += e.movementY || e.mozMovementY || e.webkitMovementY || 0;
            //     that.selectedIconElement.scrollTop = selectedVerticalChange;
            //     that.boxElement.style.display = "none";
            //     that.boxScrollElement.style.display = "none";
            // }
        };
        that.element.addEventListener('click', function(event){
            event.stopPropagation();
        });
        window.addEventListener('click', function(){
            that.boxScrollElement.scrollTop = 0;
            verticalChange = 0;
            that.boxElement.style.display = "none";
            that.boxScrollElement.style.display = "none";
        });
        that.icons = [];
        for(var i = 0; i < icons.length; i++){
            var iconElement = document.createElement('div');
            iconElement.setAttribute('class', 'icon');
            iconElement.style.width = parameters.iconsWidth + "px";
            iconElement.style.height = parameters.iconsHeight + "px";
            iconElement.style.marginLeft = parameters.boxIconSpace + "px";
            iconElement.style.marginTop = parameters.boxIconSpace + "px";

            var iconImgElement = document.createElement('img');
            iconImgElement.setAttribute('src', icons[i].iconFilePath);
            iconImgElement.setAttribute('icon-value', icons[i].iconValue);
            iconImgElement.setAttribute('icon-index', i);
            iconImgElement.setAttribute('width', parameters.iconsWidth + "px");
            iconImgElement.setAttribute('height', parameters.iconsHeight + "px");
            iconElement.appendChild(iconImgElement);
            for(var prop in icons[i].data){
                iconElement.dataset[prop] = icons[i].data[prop];
            }
            icons[i].element = iconElement;
            that.boxElement.appendChild(iconElement);
            that.selectedIconElement.style.overflowY = "hidden";
            function checkSelectedIconPos() {
                if(that.selectedIndexes.length > 0) {
                    var row = Math.ceil(that.selectedIndexes.length / parameters.selectedVectoralIconNumber);
                    row = row > parameters.selectedHorizontalIconNumber ? parameters.selectedHorizontalIconNumber : row;
                    var col = that.selectedIndexes.length - ((row - 1) * parameters.selectedVectoralIconNumber);
                    col = row > 1 ? parameters.selectedVectoralIconNumber : col;
                    if (row > 1)
                        that.selectedIconElement.style.overflowY = "scroll";
                    else
                        that.selectedIconElement.style.overflowY = "hidden";
                    var width = (parameters.selectedIconWidth + parameters.selectedBoxPadding + parameters.selectedBoxPaddingRight + 4);
                    width = col * width;
                    var height = (parameters.selectedIconHeight + 6 + (parameters.selectedBoxPadding * 2));
                    height = row * height;
                    that.selectedBoxElement.style.width = width + "px";
                    that.selectedBoxElement.style.height = height + "px";
                    that.boxScrollElement.style.left = (parseInt(that.selectedBoxElement.style.width) + 1) + "px";
                    width = parameters.selectedIconWidth + 4;
                    width = col * width;
                    height = parameters.selectedIconHeight + 6;
                    height = row * height;
                    that.selectedIconElement.style.width = width + "px";
                    that.selectedIconElement.style.height = height + "px";
                    that.selectedIconElement.style.width = (parseInt(that.selectedIconElement.style.width) + that.selectedIconElement.offsetWidth - that.selectedIconElement.clientWidth) + "px";
                }
                else{
                    that.selectedIconElement.style.overflowY = "hidden";
                    that.selectedIconElement.style.width = that.selectedIconElement.style.minWidth;
                    that.selectedIconElement.style.height = that.selectedIconElement.style.minHeight;
                }
            }

            icons[i].element.onclick = function(e){
                var target_index = this.childNodes[0].getAttribute('icon-index');
                var clickedEl = $(this);
                if(that.multipleSelect) {
                    var itemIndex = that.selectedIndexes.indexOf(target_index);
                    if (itemIndex < 0) {
                        if (that.selectedIconElement){
                            $(that.selectedIconElement).empty();
                            that.selectedIconImgElement = false;
                        }
                        that.selectedIndexes.push(target_index);
                        for(let index of that.selectedIndexes) {
                            var _selectedIconImgElement = document.createElement('img');
                            _selectedIconImgElement.setAttribute('src', that.icons[index].iconFilePath);
                            _selectedIconImgElement.setAttribute('id', "selectedImg" + index);
                            that.selectedIconElement.appendChild(_selectedIconImgElement);
                            _selectedIconImgElement.setAttribute('width', parameters.selectedIconWidth);
                            _selectedIconImgElement.setAttribute('height', parameters.selectedIconHeight);
                            that.selectedBoxElement.appendChild(that.selectedIconElement);
                        }
                        clickedEl.addClass("selected");
                    }
                    else {
                        that.selectedIndexes.splice(itemIndex, 1);
                        document.getElementById("selectedImg"+target_index).remove();
                        clickedEl.removeClass("selected");
                    }
                }
                else{
                    $(".icon").removeClass("selected");
                    that.selectedIndexes = [target_index];
                    that.selectedIconImgElement.setAttribute("src",that.icons[that.selectedIndexes[0]].iconFilePath);
                    clickedEl.addClass("selected");
                }
                checkSelectedIconPos();
                that.element.dispatchEvent(new Event('changed'));

                if(that.multipleSelect) {
                    e.stopPropagation();
                }
            };
            that.icons.push(icons[i]);
        }
        var horizontalIconNumber = Math.round((icons.length) / parameters.vectoralIconNumber);
        that.boxElement.style.height = (((parameters.iconsHeight + 2) * horizontalIconNumber) +
            ((horizontalIconNumber + 1) * parameters.boxIconSpace)) + "px";
    },
    getSelectedIndex: function () {
        if(this.options.multipleSelect)
            return this.selectedIndexes;
        else
            return this.selectedIndexes[0];
    },
    setSelectedIndex: function (index) {
        const that = this;
        if((index.length && this.options.multipleSelect) || index.length < 2){
            if ( that.selectedIconImgElement){
                that.selectedIconImgElement.remove();
                that.selectedIconImgElement = false;
            }
            index.forEach(function (value) {
                $(that.icons[value].element).addClass("selected");
                if (that.selectedIndexes.indexOf(value.toString()) < 0) {
                    var _selectedIconImgElement = document.createElement('img');
                    _selectedIconImgElement.setAttribute('src', that.icons[value].iconFilePath);
                    _selectedIconImgElement.setAttribute('id', "selectedImg"+value);
                    that.selectedIconElement.appendChild(_selectedIconImgElement);
                    _selectedIconImgElement.setAttribute('width', that.options.selectedIconWidth);
                    _selectedIconImgElement.setAttribute('height', that.options.selectedIconHeight);
                    that.selectedBoxElement.appendChild(that.selectedIconElement);
                    that.selectedIndexes.push(value.toString());
                }
            });
        }
        else if(typeof index === "number"){
            $(that.icons[index].element).addClass("selected");
            that.selectedIconImgElement.setAttribute('src', that.icons[index].iconFilePath);
            that.selectedIconImgElement.setAttribute('id', "selectedImg"+index);
            if (that.selectedIndexes.indexOf(index.toString()) < 0)
                that.selectedIndexes.push(index.toString());
        }
        else
            console.error("You cannot set multiple indexes, you must set multiple select to true!");
        var row = Math.ceil(that.selectedIndexes.length / that.options.selectedVectoralIconNumber);
        var col = (row * that.options.selectedVectoralIconNumber) - that.selectedIndexes.length;
        col = col ===0 ? that.options.selectedVectoralIconNumber : col;
        col = row > 1 ? that.options.selectedVectoralIconNumber : col;
        row = row > that.options.selectedHorizontalIconNumber ? that.options.selectedHorizontalIconNumber : row;
        if(row>1)
            that.selectedIconElement.style.overflowY = "scroll";
        else
            that.selectedIconElement.style.overflowY = "hidden";
        var width = (that.options.selectedIconWidth + that.options.selectedBoxPadding + that.options.selectedBoxPaddingRight + 4);
        width = col * width;
        var height = (that.options.selectedIconHeight + 6 + (that.options.selectedBoxPadding * 2));
        height = row*height;
        that.selectedBoxElement.style.width = width+ "px";
        that.selectedBoxElement.style.height = height+ "px";
        that.boxScrollElement.style.left = (parseInt( that.selectedBoxElement.style.width) + 1)+ "px";
        width = that.options.selectedIconWidth + 4;
        width = col * width;
        height = that.options.selectedIconHeight + 6;
        height = row*height;
        that.selectedIconElement.style.width = width+ "px";
        that.selectedIconElement.style.height = height+ "px";
        that.selectedIconElement.style.width = (parseInt( that.selectedIconElement.style.width)+ that.selectedIconElement.offsetWidth -  that.selectedIconElement.clientWidth) + "px";
    }
};