function cardReducer(state, action) {
  switch (action.type) {
    case 'removeItem':
      const card = $(state.filter(card => card.cardId === action.id)[0].card);
      card.fadeOut(200, () => {card.remove();});

      state = state.filter(card => card.cardId !== action.id);

      const localData = [];
      state.forEach(el => {
        localData.push(el.cardId);
      });
      localStorage.setItem('CardIdSore', JSON.stringify(localData));

      return state;
    default :
      return state;
  }
}


