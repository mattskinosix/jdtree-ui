<template>
  <AppBar/>
  <TreeContainer/>
</template>

<script>
import AppBar from '../components/AppBar/AppBar.vue'
import  TreeContainer  from '../components/TreeContainer.vue'

export default {
  name: 'HomePage',
  components: {
    TreeContainer,
    AppBar
  }
}
</script>
