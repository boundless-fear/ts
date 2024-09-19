/**
 * START
 * @param elem
 * @param activeClass
 * @param clearContainer
 * @param callback
 */
function changePage(elem, activeClass, clearContainer, callback, index) {
    pfx = '.';
    if(!$(elem).hasClass(pfx + activeClass)) {
        $(pfx + activeClass).removeClass(activeClass);
        $(elem).addClass(activeClass);
    }else{
        return 0;
    }
    clearContainer.forEach((containerName) => {
        $(containerName).empty()
    })
    callback.forEach((func)=>{func(elem)});
    updatePageArrowsData('.category__pagiItem-arrows', $(elem).data('page-num'))
    pagination.data.currentPage = parseInt($(elem).data('page-num'));
    pagination.render()
}

function nextPage(elem, activeClass, clearContainer, callback) {
    let pfx = '.';
    let current = $(elem).data('pageCurrent');
    let maxPage = $(elem).data('pageMax');
    if(current < maxPage){
        pageNum = current + 1;
        elem = $('.category__pagiItem[data-page-num=\'' + (pageNum) + '\']')
        changePage(elem, activeClass, clearContainer, callback)
    }

    pagination.data.currentPage = parseInt(elem.data('page-num'));
    pagination.render()
}
function prevPage(elem, activeClass, clearContainer, callback) {
    let pfx = '.';
    let current = $(elem).data('pageCurrent');
    if (current > 1) {
        pageNum = current - 1;
        elem = $('.category__pagiItem[data-page-num=\'' + (pageNum) + '\']')
        changePage(elem, activeClass, clearContainer, callback)
    }

    pagination.data.currentPage = parseInt(elem.data('page-num'));
    pagination.render()
}
//Обнавление данных о выбранной странице
function updatePageArrowsData(arrowsClass, page){

    $(arrowsClass).each(function(){
        $(this).data('pageCurrent', page)
    });
}


const pagination = {
    activeClass: 'current',
    pageContainer: '',
    clearContainers: [],
    data: {
        currentPage: 0,
        pageCount: 0
    },
    callbackFunctions: [],

    tpl: {
        arrowsIconPrev: '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.60564 0.230794C4.92502 -0.076931 5.44149 -0.076931 5.76087 0.230794C6.07971 0.538519 6.07971 1.03719 5.76087 1.34491L1.97143 4.99974L5.76087 8.65509C6.07971 8.96281 6.07971 9.46148 5.76087 9.76921C5.44149 10.0769 4.92502 10.0769 4.60564 9.76921L0.239127 5.5568C-0.0797086 5.24907 -0.0797086 4.7504 0.239127 4.44268L4.60564 0.230794Z" fill="#202124"></path></svg>',
        arrowsIconNext: '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.39436 9.76921C1.07498 10.0769 0.558508 10.0769 0.239126 9.76921C-0.0797088 9.46148 -0.0797088 8.96281 0.239126 8.65509L4.02857 5.00026L0.239126 1.34491C-0.0797088 1.03719 -0.0797088 0.538518 0.239126 0.230794C0.558508 -0.0769312 1.07498 -0.0769312 1.39436 0.230794L5.76087 4.4432C6.07971 4.75093 6.07971 5.2496 5.76087 5.55732L1.39436 9.76921Z" fill="#202124"></path></svg>'
    },
    stringArr(arr){
        return '[' + arr.map(x => '\'' + x + '\'' ).join() + ']'
    },

    render(){
        let functionParam = 'this, \'' + this.activeClass + '\', ' + this.stringArr(this.clearContainers) + ', [' + this.callbackFunctions + ']';
        this.pageContainer.html('');
        if(this.data.pageCount > 1){
            this.pageContainer.append(`
                <a class="category__pagiItem category__pagiItem-arrows category__pagiItem-prev"
                   data-page-max="${ this.data.pageCount }"
                   data-page="prev"
                   data-page-current="${ this.data.currentPage }"
                   onclick="prevPage(${ functionParam })">
                    ${ this.tpl.arrowsIconPrev }
                </a>
            `);
            this.data.currentPage = parseInt(this.data.currentPage);

            if (this.data.currentPage > 10) {
                for (let page = 1; page <= 5; page++) {
                    this.pageContainer.append(`<a class="category__pagiItem ${(this.data.currentPage == page) ? "current" : ""}" data-page-num="${page}" onclick="changePage(${functionParam})">${page}</a>`)
                }
                for (let page = this.data.currentPage - 2; page <= (((this.data.currentPage + 2) < this.data.pageCount) ? this.data.currentPage + 2 : this.data.pageCount); page++) {
                    console.log(this.data.currentPage, (page <= (((this.data.currentPage + 2) < this.data.pageCount) ? this.data.currentPage + 2 : this.data.pageCount)), ((this.data.currentPage + 2) < this.data.pageCount) ? this.data.currentPage + 2 : this.data.pageCount, page);
                    if (page > 1000) break;

                }
                this.pageContainer.append('<a class="category__pagiItem">...</a>')
                for (let page = this.data.currentPage - 2; page <= (((this.data.currentPage + 2) < this.data.pageCount) ? this.data.currentPage + 2 : this.data.pageCount); page++) {
                    this.pageContainer.append(`<a class="category__pagiItem ${(this.data.currentPage == page) ? "current" : ""}" data-page-num="${page}" onclick="changePage(${functionParam})">${page}</a>`)
                }
            } else {
                for (let page = 1; page <= (((this.data.currentPage + 3) < this.data.pageCount) ? this.data.currentPage + 3 : this.data.pageCount); page++) {
                    this.pageContainer.append(`<a class="category__pagiItem ${(this.data.currentPage == page) ? "current" : ""}" data-page-num="${page}" onclick="changePage(${functionParam})">${page}</a>`)
                }
            }
            if ((this.data.pageCount - this.data.currentPage) > 10) {
                this.pageContainer.append('<a class="category__pagiItem">...</a>')
            }
            for (let page = this.data.pageCount - ((this.data.currentPage < this.data.pageCount - 5 ) ? 5 : (this.data.pageCount - this.data.currentPage - 2 - 1)) ; page <= this.data.pageCount; page++) {
                this.pageContainer.append(`<a class="category__pagiItem ${(this.data.currentPage == page) ? "current" : ""}" data-page-num="${page}" onclick="changePage(${functionParam})">${page}</a>`)
            }

            this.pageContainer.append(`
                <a class="category__pagiItem category__pagiItem-arrows category__pagiItem-next"
                   data-page-max="${ this.data.pageCount }"
                   data-page="next"
                   data-page-current="${ this.data.currentPage }"
                   onclick="nextPage(${ functionParam })">
                ${ this.tpl.arrowsIconNext }
                </a>
            `);
        }
    },
}
/**END**/
