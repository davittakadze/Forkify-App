import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _btnNext(page) {
    return `
        <button data-goto="${
          page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
  }

  _btnPrev(page) {
    return `
    <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-left"></use>
         </svg>
         <span>Page ${[page - 1]}</span>
     </button>
   `;
  }

  _generateMarkup() {
    const page = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // 1. first page
    if (page === 1 && numPages > 1) {
      return this._btnNext(page);
    }
    // 3. last page
    if (page === numPages && numPages > 1) {
      return this._btnPrev(page);
    }
    // 4. another page
    if (page < numPages && this._data.page > 1) {
      return this._btnNext(page) + this._btnPrev(page);
    }
    // 2. first page and there ar no other pages
    return '';
  }
}

export default new PaginationView();
