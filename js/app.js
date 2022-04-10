const
  // Carousel
  carousel = document.querySelector( '.carousel' ),
  carouselDisplay = carousel.querySelector( '.carousel__display' ),
  carouselLeft = carousel.querySelector( '.carousel__left' ),
  carouselRight = carousel.querySelector( '.carousel__right' ),
  carouselItems = carousel.querySelector( '.carousel__items' ),
  carouselNavigationDots = carousel.querySelectorAll( '.carousel__dot' ),
  slidingDistance = carouselItems.children[ 0 ].getBoundingClientRect().width,
  carouselItemsCount = carouselItems.childElementCount,
  // Menu modal
  buttonMenu = document.querySelector( '.btn-menu' ),
  modalMenu = document.getElementById( 'modal-mobile-menu' ),
  // Create node modal
  buttonsCreateNode = document.querySelectorAll( '.btn-create-node' ),
  buttonCreateNode = document.getElementById( 'create-node' ),
  modalCreateNode = document.getElementById( 'modal-create-node' ),
  modalFeedbackCreateNode = document.getElementById( 'modal-feedback-create-node' ),
  // Compound nodes
  buttonsCompoundNodes = document.querySelectorAll( '.btn-compound-nodes' ),
  modalCompoundNodes = document.getElementById( 'modal-feedback-compound-nodes' ),
  // Claim rewards
  buttonsClaimRewards = document.querySelectorAll( '.btn-claim-rewards' ),
  modalClaimRewards = document.getElementById( 'modal-feedback-claim-rewards' ),
  // Feedback modals
  modalSuccess = document.getElementById( 'modal-feedback-success' ),
  modalOperationAborted = document.getElementById( 'modal-feedback-opration-aborted' );


//
// Carousel
//

let
  carouselPosition = 0,
  carouselIndex = 0;

// Events
carouselRight.addEventListener( 'click', () => {
  updateCarousel( 'positive' )
});

carouselLeft.addEventListener( 'click', () => {
  updateCarousel( 'negative' )
});

carouselNavigationDots.forEach( el => {
  el.addEventListener( 'click', el => {
    updateCarousel( 'dot', parseInt( el.target.textContent ));
  });
});

// Update carousel
// type: text — type of update
// doteIndex: number — index of the triggered dot
function updateCarousel( type, dotIndex ) {

  // Right arrow
  if ( type == 'positive' && carouselIndex < carouselItemsCount - 1 ) {
    carouselIndex += 1;
    carouselPosition -= slidingDistance;
  }

  // Left arrow
  if ( type == 'negative' && carouselIndex > 0 ) {
    carouselIndex -= 1;
    carouselPosition += slidingDistance;
  }

  // Dots navigation
  if ( type == 'dot' ) {
    carouselIndex = dotIndex;
    carouselPosition = -dotIndex * slidingDistance;
  }

  // Update position
  carouselItems.style.transform = `translate3d( ${carouselPosition}px, 0, 0 )`;

  // Update arrows
  if ( carouselIndex == 0 ) {
    carouselLeft.setAttribute( 'disabled', '');
    carouselRight.removeAttribute( 'disabled' );
  }

  if ( carouselIndex > 0 && carouselIndex < carouselItemsCount - 1 ) {
    carouselLeft.removeAttribute( 'disabled' );
    carouselRight.removeAttribute( 'disabled' );
  }

  if ( carouselIndex == carouselItemsCount - 1 ) {
    carouselLeft.removeAttribute( 'disabled' );
    carouselRight.setAttribute( 'disabled', '');
  }

  // Update navigation
  carouselNavigationDots.forEach( el => {
    el.classList.remove( 'carousel__dot--active' );
  });

  carouselNavigationDots[ carouselIndex ].classList.add( 'carousel__dot--active' );
}


//
// Modal triggers
//

// Menu modal
buttonMenu.addEventListener( 'click', () => {
  openModal( modalMenu );
});


// Create Node modal
buttonsCreateNode.forEach( el => {
  el.addEventListener( 'click', () => {
    openModal( modalCreateNode );
  });
});

// Feedback: create node
buttonCreateNode.addEventListener( 'click', () => {
  swapModal( modalCreateNode, modalFeedbackCreateNode );
  // Success
  setTimeout(() => {
    swapModal( modalFeedbackCreateNode, modalSuccess );
    setTimeout(() => {
      closeModal( modalSuccess );
    }, 3000);
  }, 3000);
});

// Feedback: compound node
buttonsCompoundNodes.forEach( el => {
  el.addEventListener( 'click', () => {
    openModal( modalCompoundNodes );
    // Success
    setTimeout(() => {
      swapModal( modalCompoundNodes, modalSuccess );
      setTimeout(() => {
        closeModal( modalSuccess );
      }, 3000);
    }, 3000);
  });
});

// Feedback: claim rewards
buttonsClaimRewards.forEach( el => {
  el.addEventListener( 'click', () => {
    openModal( modalClaimRewards );
    // Success
    setTimeout(() => {
      swapModal( modalClaimRewards, modalSuccess );
      setTimeout(() => {
        closeModal( modalSuccess );
      }, 3000);
    }, 3000);
  });
});


//
// Modal
//

// Open modal
function openModal( modal ) {
  let openModal = document.querySelector( '.modal--visible' );

  if ( openModal != undefined ) {
    swapModal( openModal, modal );
    return;
  } else {

    let overlay = createOverlay();

    // Body prenvent scroll
    document.body.style.overflowY = 'hidden';

    // Modal
    modal.classList.add( 'modal--visible' );
    modal.offsetHeight;
    modal.classList.add( 'modal--appear' );

    // If not feedback
    if( !modal.classList.contains( 'modal--centered' )) {

      let closeBtn = modal.querySelector( '.btn-close' );

      // Add listeners
      closeBtn.addEventListener( 'click', () => {
        closeModal( modal );
      });

      overlay.addEventListener( 'click', () => {
        closeModal( modal );
      });
    }
  }

}

// Close modal
function closeModal( modal ) {
  let
    closeBtn = modal.querySelector( '.btn-close' ),
    overlay = document.querySelector( '.modal__overlay' );

  // Modal
  modal.classList.remove( 'modal--appear' );
  setTimeout(() => {
    modal.classList.remove( 'modal--visible' );
  }, 301);

  // Overlay
  overlay.classList.remove( 'modal__overlay--appear' );
  setTimeout(() => {
    overlay.remove();
  }, 151);

  // Remove listeners
  if ( closeBtn != undefined ) {
    closeBtn.removeEventListener( 'click', closeModal );
  }

  // Body scroll
  document.body.style.overflowY = 'unset';
}

// Swap modal
function swapModal( currentModal, nextModal ) {
  let
    currentClose = currentModal.querySelector( '.btn-close' ),
    nextClose = nextModal.querySelector( '.btn-close' ),
    overlay = document.querySelector( '.modal__overlay' );

  currentModal.classList.add( 'modal--swap' );
  setTimeout(() => {
    currentModal.classList.remove( 'modal--visible', 'modal--appear', 'modal--swap' );
  }, 301);

  if ( currentClose != undefined ) {
    currentClose.removeEventListener( 'click', closeModal );
  }
  overlay.removeEventListener( 'click', closeModal );

  nextModal.classList.add( 'modal--visible' );
  nextModal.offsetHeight;
  nextModal.classList.add( 'modal--appear' );

  // Add listeners
  if ( nextClose != undefined ) {
    nextClose.addEventListener( 'click', () => {
      closeModal( nextModal );
    });

    overlay.addEventListener( 'click', () => {
      closeModal( nextModal );
    });
  }
}

// Create overlay
function createOverlay() {
  let overlay = document.createElement( 'div' );

  overlay.classList.add( 'modal__overlay' );
  document.body.appendChild( overlay );
  overlay.classList.add( 'modal__overlay--visible' );
  overlay.offsetHeight;
  overlay.classList.add( 'modal__overlay--appear' );

  return overlay;
}
