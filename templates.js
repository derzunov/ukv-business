// Documents Group --------------------------------------------------------------
const getGroupTemplate = ( title, price, documents ) => {
    return `<div class="ms-documents-group">
        <!-- Шапка группы документов -->
        <div class="ms-documents-group__header">
          <div class="ms-documents-group__title-price">
            <p class="ms-documents-group__title">${title}</p>
            <p class="ms-documents-group__price">${price}</p>
          </div>
          <p class="ms-documents-group__hide">Скрыть</p>
          <p class="ms-documents-group__show">Смотреть ещё ${documents.length}</p>
          <div class="ms-documents-group__icon">
            <svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.6908 18.5C36.6908 28.1655 28.8602 36 19.2019 36C9.54353 36 1.71289 28.1655 1.71289 18.5C1.71289 8.83445 9.54353 1 19.2019 1C28.8602 1 36.6908 8.83445 36.6908 18.5Z" stroke="black" stroke-width="2"/>
                <path d="M8.93066 14.3889L19.2023 23.6389L29.474 14.3889" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="ms-documents-group__header-underline"></div>
        <!-- Список документов для этой группы (здесь пока пуст, заполним отдельно) -->
        <div class="ms-document-group__documents-container"></div>
      </div>`
}

// Document - one single Item ----------------------------------------------------
const getDocumentTemplate = ( { documentTitle, documentPrice } ) => {
    return `<div class="ms-document-group__document">
            <p class="ms-document-group__document-title">${ documentTitle }</p>
            <p class="ms-document-group__document-price">${ documentPrice }</p>
            <p 
              class="ms-document-group__document-add"
              data-document="${ {
        documentTitle,
        documentPrice
    } }"
            >Купить</p>
            
            <p 
              class="ms-document-group__document-remove"
              data-document="${ {
        documentTitle,
        documentPrice
    } }"
            >Убрать</p>
          </div>`
}

const getCartTemplate = ( cart ) => {
    return `<div class="ms-cart__inner">
            <h2 class="ms-cart__header">В вашу корзину добавлены пакеты документов (${ cart.documents.length } шт.)</h2>
            <div class="ms-cart__body">
              <p class="ms-cart__toggle-expand js_cart_toggle_expand">
                Смотреть весь список?
              </p>
              <div class="ms-cart__documents-container js_ms-cart__documents-container">
                
              </div>
            </div>
            <p class="ms-cart__checkout">Перейти к оформлению</p>
          </div>`
}

const getCartDocumentTemplate = ( document ) => {
    return `<div class="ms-cart-document-item">
            <p class="ms-cart-document-item__title">
              ${ document.documentTitle }
            </p>
            <p>${ document.documentPrice }</p>
            <p class="ms-cart-document-item__remove">
              Удалить
            </p>
          </div>`
}
