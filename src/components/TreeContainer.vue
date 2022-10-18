<template>

  <TreeNode 
    v-model:leafs="tree.leafs"
    v-model:operator="tree.operator"
    v-model:value="tree.value"
    v-model:variable="tree.variable"
  >
  </TreeNode>
  <v-textarea
    disabled
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
  methods: {
    log(){
      console.log(this.tree)
    }
  },
}
</script>

<style>

</style>
