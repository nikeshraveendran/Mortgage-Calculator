<template>
    <div class="wrapper mortgageCalculator">
        <div class="container-row">
            <div class="heading">
                <h2>Mortgage Calculator</h2>
            </div>
            <div class="mortgageCalculator-wrap">
                <form>
                    <div class="form-group">
                        <label for="pp">Purchase price</label>
                        <input type="number" placeholder="Principal amount" id="pp" v-model="pp">
                    </div>
                    <div class="form-group">
                        <label for="dp">Down payment</label>
                        <input type="number" placeholder="Down payment" id="dp" v-model="dp">
                    </div>
                    <div class="form-group">
                        <label for="rt">Repayment time</label>
                        <input type="number" placeholder="In Years" id="rt" v-model="rt">
                    </div>
                    <div class="form-group">
                        <label for="ir">Interest rate</label>
                        <input type="number" placeholder="Annual Interest" id="ir" v-model="ir">
                    </div>
                    <div class="btn-wrap">
                        <a href="#" @click.prevent="getMortgageQuote">Get a mortgage quote</a>
                    </div>
                </form>
                <div class="display-values">
                    <div class="col">
                        <p v-if=" la !== null ">Loan amount: <span class="red">₹{{ la }}/-</span></p>
                    </div>
                    <div class="col">
                        <p v-if=" em !== null ">Estimated pr. month: <span class="red">₹{{ em }}/-</span></p>
                    </div>
                    <div class="col">
                        <p v-if=" ta !== null ">Total amount payable: <span class="red">₹{{ ta }}/-</span></p>
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
            pp: null,
            dp: null,
            rt: null,
            ir: null,
            la: null,
            em: null,
            ta: null,
        }
    },
    methods: {
        getMortgageQuote() {
            this.subtract();
            this.mortgagePayment();
        },
        subtract() {
            if (this.pp !== null && this.dp !== null) {
                this.la = this.pp - this.dp;
            }
        },
        mortgagePayment() {
            if (this.la !== null && this.ir !== null && this.rt !== null) {
                const r = this.ir / 12 / 100; // Monthly interest rate
                const n = this.rt * 12; // Total number of payments
                console.log(this.la)
                console.log(r)
                console.log(n)

                this.em = this.la * r * ( Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
                this.ta = this.em * n;
            }
        }
    }
}
</script>
  
  
  
<style scoped>
.mortgageCalculator {
    margin: 50px 0;
}

.mortgageCalculator-wrap {
    background-color: #eee;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 7px 7px 0px rgb(0 0 0 / 21%);
}

form {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    margin: 0 -15px;
}

.mortgageCalculator-wrap .form-group {
    width: calc(100% / 2 - 30px);
    margin: 0 15px 30px;
}

.mortgageCalculator-wrap label {
    width: 100%;
    display: inline-block;
    margin-bottom: 5px;
}

.mortgageCalculator-wrap input {
    width: 100%;
    padding: 10px 15px;
    margin-bottom: 0;
}

.mortgageCalculator-wrap form .btn-wrap a {
    padding: 8px 10px;
    margin: 0 15px 15px;
}

.display-values {
    display: flex;
    flex-wrap: wrap;
    margin: 30px -15px 0;
}

.display-values .col {
    width: calc(100% / 1 - 30px);
    margin: 0 15px 5px;
}

.display-values .col p {
    font-size: 20px;
}

.display-values .col p span {
    background-color: rgba(247, 0, 0, 0.21);
    display: inline-block;
    padding: 0 15px;
}
</style>
  