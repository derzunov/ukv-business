// Cart functionality: -------------------------------------------------------------------------------------------------
// TODO: Refactor to es6 import/export modules after NY (TEST IT On Mobile browsers before!)
const cart = {
    customer: {
        name: "Default name",
        phone: "+7 999 111 22 33",
        email: "user@email.com",
    },
    documents: [],
};

const addDocumentToCart = ( newDocument ) => {

    // Document names are considered unique -------------------------------
    // Add one type of document to the cart only once ---------------------
    // Don't use the Set structure because of documents Set of objects mutability
    let isAlreadyInCart = isDocumentAlreadyInCart( newDocument );

    if ( !isAlreadyInCart ) {
        cart.documents = [
            ...cart.documents,
            newDocument
        ]
    }
    // / Add one type of document to the cart only once -------------------
}

const removeDocumentFromCart = ( documentToToRemove ) => {
    cart.documents = cart.documents.filter( ({ documentTitle }) => {
        return documentToToRemove.documentTitle !== documentTitle;
    } );
}

const isDocumentAlreadyInCart = ( documentItem ) => {
    return cart.documents.some( ( documentInCart ) => {
        return documentItem.documentTitle === documentInCart.documentTitle;
    } );
}

const renderCart = () => {
    const CART_SHOWED = "ms-cart_showed";
    const CART_EXPANDED = "ms-cart_expanded";

    const { documents } = cart;
    const cartContainer = document.getElementById("js_ms-cart");

    const cartTemplate = getCartTemplate( cart );
    const cartElement = createElementFromHTML( cartTemplate );

    if (documents.length) {
        addClass( cartContainer, CART_SHOWED );
    } else {
        removeClass( cartContainer, CART_SHOWED );
    }

    cartContainer.innerHTML = "";
    cartContainer.appendChild( cartElement );

    const cartDocumentsContainer = cartElement.getElementsByClassName( "js_ms-cart__documents-container" )[0];

    documents.forEach( ( documentItem ) => {

        const { documentTitle, documentPrice } = documentItem;

        const cartDocumentTemplate = getCartDocumentTemplate( { documentTitle, documentPrice } );
        const cartDocumentElement = createElementFromHTML( cartDocumentTemplate );

        cartDocumentsContainer.append( cartDocumentElement );

        // Listeners for Document in cart
        const removeDocumentButton = cartDocumentElement.getElementsByClassName("ms-cart-document-item__remove")[0];

        removeDocumentButton.addEventListener( "click", () => {
            removeDocumentFromCart( documentItem );
            renderCart();
        } );
    } );

    // Listeners for Cart
    const cartToggleExpandButton = cartElement.getElementsByClassName( "js_cart_toggle_expand" )[0];

    cartToggleExpandButton.addEventListener( "click", () => {
        toggleClass( cartContainer, CART_EXPANDED );
        addClass( cartToggleExpandButton, 'ms-g-hidden');
    } );
}
