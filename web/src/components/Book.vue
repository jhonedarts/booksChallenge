<template>
<div class="box">
    <img
      style="width: 100px;"
      src="../assets/book.svg">
    <div class="description">
        <span>{{ 'ID: '+id }}</span>
        <span>{{ 'Title: '+title }}</span>
        <span>{{ 'Author; '+author }}</span>
        <span>{{ 'Publication Year: '+publicationYear }}</span>
        <span>{{ 'Pages: '+pages }}</span>
    </div>
</div>
</template>

<script>

export default {
  name: 'book-item',
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    publicationYear: {
      type: Number,
      required: true
    },
    isbn: {
      type: String,
      required: true
    },
    pages: {
      type: Number,
      required: true
    },
  },
}

</script>

<style scoped>
.box {
  display: flex;
  padding: 8px;
  background-color: aquamarine
}
.description {
  padding-left: 8px;
  flex-direction: column;
  display: flex;
  text-align: initial;
}
</style>
