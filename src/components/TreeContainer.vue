<template>
  <TreeNode v-model="tree">
  </TreeNode>
  <v-textarea
    readonly>
    {{ tree }}
  </v-textarea>
</template>

<script>
import TreeNode from '../components/TreeNode.vue'
import { uuid } from 'vue-uuid'; 
export default {
  name: "TreeContainer",
  components: {
    TreeNode
  },
  data: () => ({
    tree: {
      id: uuid.v4(),
      value: '',
      operator: '',
      variable: '',
      leafs: []
    }
  }),
}
</script>

<style>

</style>
