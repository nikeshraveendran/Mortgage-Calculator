const API_KEY = '28ba866fac40f594d5997979f6e0c79577988315';

const linkShortnervar = {
  state: () => ({
    input: '',
    result: '',
  }),

  actions: {
    async getShortenedUrl({ commit, state }) {
      try {
        const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            long_url: state.input, // Use state.input as the long_url
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          commit('result', data.id); // Assuming data.id contains the shortened URL
        } else {
          throw new Error('Failed to shorten URL');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        // Optionally, you can commit a mutation here to update state for error handling.
      }
    },
  },
  

  mutations: {
    setInput(state, url) {
        console.log('input url', url);
      state.input = url;
    },
    setResult(state, url) {
        console.log('result');
      state.result = url;
    },
  },
}

export default linkShortnervar;
