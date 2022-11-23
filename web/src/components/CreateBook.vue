<template>
    <div class="box">
        <div class="createBox">
            <div class="input">
                <label for="title"> Title </label>
                <input type="string" id="title" v-model="book.title" />
            </div>
            <div class="input">
                <label for="author"> Author </label>
                <input type="string" id="author" v-model="book.author_name" />
            </div>
            <div class="input">
                <label for="year"> Publication year </label>
                <input type="number" id="year" v-model="book.publication_year" />
            </div>
            <div class="input">
                <label for="isbn"> ISBN </label>
                <input type="string" id="isbn" v-model="book.isbn" />
            </div>
            <div class="input">
                <label for="pages"> Pages </label>
                <input type="number" id="pages" v-model="book.num_pages" />
            </div>
            <div class="submit">
                <div :class="resultClasses">
                    <span>{{ status ? status : '' }}</span>{{ result ? ' '+result : '' }}
                </div>
                <button @click="createBook()"> Register </button>
            </div>
        </div>
    </div>
</template>

<script>

import { addBook } from '../api/books.js'

export default {
  name: 'create-book',
  data() {
    return {
        book: {},
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
    createBook() {
        const invalidInput = this.hasIncorrectInput(this.book)
        if (invalidInput) {
            this.result = 'Field: '+invalidInput
            this.status = 'error'
            return
        }

        addBook(this.book).then(res => {
            if (res.status == 201) {
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
    hasIncorrectInput(book) {
        if (typeof book.title !== 'string' || book.title === '') {
            return 'Title'
        }
        if (typeof book.author_name !== 'string' || book.author_name === '') {
            return 'Author'
        }
        if (!Number.isInteger(parseInt(book.publication_year))) {
            return 'Publication year'
        }
        if (typeof book.isbn !== 'string' || book.isbn === '') {
            return 'ISBN'
        }
        if (!Number.isInteger(parseInt(book.num_pages)) || book.num_pages < 1) {
            return 'Pages'
        }
        return false
    }
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
