<template>
  <div id="app">
    <div class="options">
      <button
        :class="mode === 'show' ? 'buttonActive': ''"
        @click="refreshData">
        {{ mode === 'show' ? 'Refresh List' : 'List' }}
      </button>
      <button
        :class="mode === 'create' ? 'buttonActive': ''"
        @click="changeMode('create')">
        Create
      </button>
      <button
        :class="mode === 'delete' ? 'buttonActive': ''"
        @click="changeMode('delete')">
        Delete
      </button>
    </div>
    <div class="container">
      <ShowBooks
        v-show="mode === 'show'"
        :books=books />
      <CreateBook v-show="mode === 'create'" />
      <DeleteBook v-show="mode === 'delete'" />
    </div>
  </div>
</template>

<script>
import ShowBooks from './components/ShowBooks'
import { getBooks } from './api/books.js'
import CreateBook from './components/CreateBook.vue'
import DeleteBook from './components/DeleteBook.vue'

export default {
  name: 'App',
  components: {
    ShowBooks,
    CreateBook,
    DeleteBook
  },
  data() {
    return {
      books: [],
      mode: "create",
    }
  },
  methods: {
    changeMode(mode) {
      this.mode = mode
    },
    refreshData() {
      this.changeMode('show')
      getBooks().then(res => {
        this.books = res.data
      });
    },
  },
  mounted() {}
}
</script>

<style>
.options {
  background-color: #9ee2d6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 20%;
}
.container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

button {
  width: 180px;
  font-size: 24px;
  border-radius: 8px;
  margin: 20px;
  cursor: pointer;
}

button:hover {
  background-color: #d3d3d3;
}

button:active,
button:focus-visible {
  background-color: #afafaf;
}

.buttonActive {
  background-color: #d3d3d3;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height: 98vh;
  justify-content: center;
}
</style>
