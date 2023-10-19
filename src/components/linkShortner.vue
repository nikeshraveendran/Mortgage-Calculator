<template>
  <div class="wrapper linkShortner">
    <div class="container-row">
      <div class="heading">
        <h2>Link Shortener</h2>
      </div>
      <div class="linkShortner-wrap">
        <form>
          <div class="form-group">
            <label for="url">Paste your URL below</label>
            <input type="text" placeholder="Enter URL" v-model="input">
          </div>
          <div class="btn-wrap">
            <a href="#" @click.prevent="shortenUrl">Click to shorten</a>
          </div>
        </form>
        <div class="shortened-url">
          <p>Shortened URL: <span class="red">{{ result }}</span></p>
          <div class="btn-wrap">
            <a href="#" @click.prevent="copyToClipboard">Click to copy</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      result: '',
    };
  },
  methods: {
    async shortenUrl() {
      try {
        const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer 28ba866fac40f594d5997979f6e0c79577988315',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            long_url: this.input.trim(),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          this.result = data.id;
        } else {
          const errorMessage = await response.text();
          throw new Error(`Failed to shorten URL. Status: ${response.status}. Error: ${errorMessage}`);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
    copyToClipboard() {
      const textarea = document.createElement('textarea');
      textarea.value = this.result;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
    }
  }
}
</script>



<style scoped>
.linkShortner-wrap {
  background-color: #eee;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 7px 7px 0px rgb(0 0 0 / 21%);
}

form {
  display: flex;
  align-items: flex-end;
}

.linkShortner-wrap label {
  width: 100%;
  display: inline-block;
}

.linkShortner-wrap input {
  max-width: 500px;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 0;
}

.linkShortner-wrap form .btn-wrap a {
  padding: 8px 10px;
}

.linkShortner-wrap .shortened-url {
  margin: 20px 0;
}

.shortened-url p {
  margin-bottom: 5px;
}

.red {
  color: red;
}</style>
