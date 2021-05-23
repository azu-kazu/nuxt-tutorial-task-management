<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <input v-model="name" />
    <button @click="add">追加</button>

    <ul class="task-list">
      <li v-for="todo in todos" :key="todo.id">
        <span v-if="todo.createdAt">
          <input
            type="checkbox"
            :checked="todo.isDone"
            @change="changeStatus(todo)"
          />
          <span :class="{ done: todo.isDone }">{{ todo.name }} {{ todo.isDone }} {{ todo.createdAt }}</span>
          <button @click="remove(todo.id)">削除</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      pageTitle: "タスク管理",
      name: "",
      isDone: false,
    };
  },
  created: function () {
    this.$store.dispatch("todos/init");
  },
  computed: {
    todos() {
      return this.$store.state.todos.todos;
    },
  },
  methods: {
    add() {
      this.$store.dispatch("todos/add", this.name);
      this.name = "";
    },
    changeStatus(todo) {
      this.$store.dispatch("todos/changeStatus", todo);
    },
    remove(id) {
      this.$store.dispatch("todos/remove", id);
    },
  },
};
</script>>

<style>
.task-list .done {
  text-decoration: line-through;
}
</style>