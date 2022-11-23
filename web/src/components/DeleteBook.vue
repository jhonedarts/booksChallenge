<template>
    <div class="box">
        <div class="createBox">
            <div class="input">
                <label for="isbn"> ISBN </label>
                <input type="string" id="isbn" v-model="isbn" />
            </div>
            <div class="submit">
                <div :class="resultClasses">
                    <span>{{ status ? status : '' }}</span>{{ result ? ' '+result : '' }}
                </div>
                <button @click="deleteBook()"> Delete </button>
            </div>
        </div>
    </div>
</template>

<script>

import { deleteBook } from '../api/books.js'

export default {
  name: 'delete-book',
  data() {
    return {
        isbn: null,
        result: null,
        status: null,
    }
  },
  computed: {
    resultClasses() {
        const classes = ['result']

        if (this.status === 'error') {
            classes.push('resultError')
        }
        if (this.status === 'success') {
            classes.push('resultSuccess')
        }

        return classes
    }
  },
  methods: {
    deleteBook() {
        if (typeof this.isbn !== 'string' || this.isbn === '') {
            this.result = 'Field: ISBN'
            this.status = 'error'
            return
        }

        deleteBook(this.isbn).then(res => {
            if (res.status == 200) {
                this.result = null
                this.status = 'success'
            }
        }).catch(err => {
            this.status = 'error'
            if (err.response.data.message.errors && err.response.data.message.errors[0]) {
                this.result = err.response.data.message.errors[0]
            }
            else if (err.response.data.message) {
                this.result = err.response.data.message
            }
        })

    },
  },
}

</script>


<style scoped>
.createBox {
    background-color: #9ee2d6;
    padding: 24px;
    border-radius: 16px;
    font-size: 18px;
}
.input {
    display: flex;
    justify-content: flex-end;
    padding: 8px;
}
.input label {
    padding-right: 16px;
}
.submit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 8px 0 8px;
}
.submit button {
    padding: 8px;
    font-size: 16px;
    margin: 0;
    width: unset;
    padding: 8px 16px;
}
.result {
    margin-right: 16px;
}
.result span {
    padding: 0 8px;
    border-radius: 4px;
}
.resultError span {
    background-color: red;
}
.resultSuccess span {
    background-color: green;
}
.box {
    position: relative;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
}

</style>
