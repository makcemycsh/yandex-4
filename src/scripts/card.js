let cardsStore;

class Card {
  constructor(item) {
    this.item = $(item);
    this.$close = this.item.find('.js-item-close');
    this.id = this.item.attr('data-id');

    this.handlers();
  }

  closeItem() {
    const unsubscribe = cardsStore.subscribe(() => console.log(`Card remove, id:${ this.id }`));

    const removeItem = {type: 'removeItem', id: this.id};
    cardsStore.dispatch(removeItem);
    unsubscribe();

  }

  handlers() {
    this.$close.on('click', this.closeItem.bind(this));
  }
}


$(document).ready(function() {

  const initialState = [];
  let localData = [];

  $('.js-card').each((i, e) => {
    initialState.push({cardId: $(e).attr('data-id'), card: e});
    localData.push($(e).attr('data-id'));
    new Card($(e));
  });

  if ( localStorage.getItem('CardIdSore') ) {
    // localData = JSON.parse(localStorage.getItem('CardIdSore'));
    localStorage.setItem('CardIdSore', JSON.stringify(localData));

  } else {
    localStorage.setItem('CardIdSore', JSON.stringify(localData));
  }

  cardsStore = new Store(cardReducer, initialState);
});
