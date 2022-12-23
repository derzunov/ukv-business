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
const ACTIVE_LICENSING_BUTTON_CLASS = "ms-licensing-button_active"
const DOCUMENTS_GROUP_OPENED_CLASS = "ms-documents-group_opened"
const HIDDEN_CLASS = "ms-g-hidden"

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

// Documents ( from external source ) ----------------------------------------------------------------------------------

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

const getDocumentTemplate = ( { documentTitle, documentPrice } ) => {
    return `<div class="ms-document-group__document">
            <p class="ms-document-group__document-title">${ documentTitle }</p>
            <p class="ms-document-group__document-price">${ documentPrice }</p>
          </div>`
}

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

        documents.forEach( ( document ) => {
            const documentTemplate = getDocumentTemplate( document );
            const documentElement = createElementFromHTML( documentTemplate );

            documentsContainer.appendChild( documentElement );
        });

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
