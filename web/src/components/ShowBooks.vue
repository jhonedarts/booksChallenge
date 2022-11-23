<template>
  <div>
    <Book
      class="book"
      v-for="(book, index) in books"
      :key="index"
      :id="book.id"
      :title="book.title"
      :author="book.author_name"
      :publication-year="book.publication_year"
      :isbn="book.isbn"
      :pages="book.num_pages"
    />
  </div>
</template>

<script>
import Book from './Book'

export default {
  name: 'show-books',
  components: {
    Book,
  },
  props: {
    books: {
      type: Array,
      default: () => []
    },
  },
  methods: {

  },
  mounted() {

  }
}

</script>

<style scoped>
.book:nth-child(odd) {
  background: #CCC
}
.book:nth-child(even) {
  background: #FFF
}
</style>
