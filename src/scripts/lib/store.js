class Store {
  constructor(updateState, state) {
    this.state = state;
    this.updateState = updateState;
    this.callbacks = [];
  }

  getState() {
    return this.state;
  }

  /**
   * Update state
   * @param { Function } action
   */
  dispatch(action) {
    this.state = this.updateState(this.state, action);
    this.callbacks.forEach(callback => callback());
  }

  /**
   * Subscription / unsubscribe to Store changes
   * @param { Function } callback
   */
  subscribe(callback) {
    this.callbacks.push(callback);

    // Отписка!
    return () => this.callbacks = this.callbacks.filter(cb => cb !== callback);
  }

}

