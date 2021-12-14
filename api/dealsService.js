const apiHost = 'https://bigsale-b030e-default-rtdb.firebaseio.com';

export default {
  async fetchInitialDeals() {
    try {
      let response = await fetch(apiHost + '/deals.json');
      let json = await response.json();
      return Object.values(json);
    } catch(error) {
      console.error(error);
    }
  }
}
