import View from "./View";
import icons from 'url:../../img/icons.svg'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination')
    _generateMarkUp() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
        const currentPage = this._data.page


        //page 1 and there are other pages
        if (currentPage === 1 && numPages > 1) {
            return `<button class="btn--inline pagination__btn--next" data-goto="${currentPage + 1}">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `

        }





        //last page
        if (currentPage === numPages && numPages > 1) {
            return `<button class="btn--inline pagination__btn--prev" data-goto="${currentPage - 1}">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                    </button>`
        }


        //other page
        if (currentPage < numPages) {
            return `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
            </button>
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `
        }


        return ''


    }

    addHandlerPagination(handler) {
        this._parentElement.addEventListener("click", (e) => {
            e.preventDefault()
            const btn = e.target.closest('.btn--inline')
            if (!btn)
                return
            const goto = +btn.dataset.goto

            handler(goto)

        })

    }

    _generateMarkupPreview(result) {
        return `<li class="preview">
        <a class="preview__link" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.imageUrl}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
    
          </div>
        </a>
      </li>`
    }
}

export default new PaginationView()