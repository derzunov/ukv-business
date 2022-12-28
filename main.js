console.log("ms-service");

// Elements
const licensingButton_1 = document.getElementById("ms-licensing-button-1");
const licensingButton_2 = document.getElementById("ms-licensing-button-2");

const licensingBlock_1 = document.getElementById("ms-licensing-info-1");
const licensingBlock_2 = document.getElementById("ms-licensing-info-2");

const documentsGroupsContainer = document.getElementById("ms-documents");

// Block for scroll into view (Licensing)
const licensingCommonBlock = document.getElementById("ms-licensing");
const documentsBlock = document.getElementById("ms-documentation");

// Class constants
const ACTIVE_LICENSING_BUTTON_CLASS = "ms-licensing-button_active";
const DOCUMENTS_GROUP_OPENED_CLASS = "ms-documents-group_opened";
const DOCUMENT_ADDED_CLASS = "ms-document-group__document_added";
const HIDDEN_CLASS = "ms-g-hidden";

// Functions
const showPreLicensing = () => {
    if ( !licensingButton_1.classList.contains(ACTIVE_LICENSING_BUTTON_CLASS) ) {
        licensingButton_2.classList.remove(ACTIVE_LICENSING_BUTTON_CLASS);
        licensingButton_1.classList.add(ACTIVE_LICENSING_BUTTON_CLASS);

        licensingBlock_1.classList.remove(HIDDEN_CLASS);
        licensingBlock_2.classList.add(HIDDEN_CLASS);
    }
}
const showPostLicensing = () => {
    if ( !licensingButton_2.classList.contains(ACTIVE_LICENSING_BUTTON_CLASS) ) {
        licensingButton_1.classList.remove(ACTIVE_LICENSING_BUTTON_CLASS);
        licensingButton_2.classList.add(ACTIVE_LICENSING_BUTTON_CLASS);

        licensingBlock_2.classList.remove(HIDDEN_CLASS);
        licensingBlock_1.classList.add(HIDDEN_CLASS);
    }
}

// Code :)
// Check up hash for external links

if( window.location.hash ) {
    switch ( window.location.hash ) {
        case "#prelicensing":
            showPreLicensing();
            licensingCommonBlock.scrollIntoView();
            break;
        case "#postlicensing":
            showPostLicensing();
            licensingCommonBlock.scrollIntoView();
            break;
        case "#documents":
            documentsBlock.scrollIntoView();
            break;
    }
}

// Buttons listeners
licensingButton_1.addEventListener("click", () => {
    showPreLicensing();
    window.location.hash = "#prelicensing";
});

licensingButton_2.addEventListener("click", () => {
    showPostLicensing();
    window.location.hash = "#postlicensing";
});


const getDocumentsData = async ( file ) => {
    let data = await fetch( file );
    return await data.text();
};

// Get documents data and render it to our page ------------------------
getDocumentsData( "documents.json" ).then( ( documents ) => {

    const documentsGroups = JSON.parse( documents );

    // before pasting our groups and documents clear the main container
    documentsGroupsContainer.innerHTML = "";

    // GO!
    documentsGroups.forEach( ( { title, price, documents } ) => {

        const groupTemplate = getGroupTemplate( title, price, documents );
        const groupElement = createElementFromHTML( groupTemplate );
        documentsGroupsContainer.appendChild( groupElement );

        // Now put our documents to group into documents container
        const documentsContainer = groupElement.getElementsByClassName("ms-document-group__documents-container")[0];

        documents.forEach( ( documentItem ) => {
            const documentTemplate = getDocumentTemplate( documentItem );
            const documentElement = createElementFromHTML( documentTemplate );

            documentsContainer.appendChild( documentElement );

            const documentAddToCardButton = documentElement.getElementsByClassName("ms-document-group__document-add")[0];
            const documentRemoveFromCardButton = documentElement.getElementsByClassName("ms-document-group__document-remove")[0];

            documentAddToCardButton.addEventListener( "click", () => {
                toggleClass( documentElement, DOCUMENT_ADDED_CLASS );
                addDocumentToCart( documentItem );
                renderCart();
            } );
            documentRemoveFromCardButton.addEventListener( "click", () => {
                toggleClass( documentElement, DOCUMENT_ADDED_CLASS );
                removeDocumentFromCart( documentItem );
                renderCart();
            } );
        } );

        // Add listeners for our group
        const hideButton = groupElement.getElementsByClassName("ms-documents-group__hide")[0];
        const showButton = groupElement.getElementsByClassName("ms-documents-group__show")[0];
        const arrowButton = groupElement.getElementsByClassName("ms-documents-group__icon")[0];

        const toggleShowDocuments = () => {
            if ( groupElement.classList.contains( DOCUMENTS_GROUP_OPENED_CLASS ) ) {
                groupElement.classList.remove( DOCUMENTS_GROUP_OPENED_CLASS );
            } else {
                groupElement.classList.add( DOCUMENTS_GROUP_OPENED_CLASS );
            }
        }

        hideButton.addEventListener( "click", () => {
            groupElement.classList.remove( DOCUMENTS_GROUP_OPENED_CLASS );
        } );

        showButton.addEventListener( "click", () => {
            groupElement.classList.add( DOCUMENTS_GROUP_OPENED_CLASS );
        } );

        arrowButton.addEventListener( "click", () => {
            toggleShowDocuments();
        } );
    } );
} );

// Utils ---------------------------------------------------------------------------------------------------------------
const createElementFromHTML = (htmlString) => {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

const toggleClass = ( element, className ) => {
    if ( element.classList.contains( className ) ) {
        element.classList.remove( className );
    } else {
        element.classList.add( className );
    }
}

const addClass = ( element, className ) => {
    if ( !element.classList.contains( className ) ) {
        element.classList.add( className );
    }
}
const removeClass = ( element, className ) => {
    if ( element.classList.contains( className ) ) {
        element.classList.remove( className );
    }
}
