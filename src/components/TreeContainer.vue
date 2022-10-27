<template>

  <v-btn icon="fas fa-download" class="ma-5" @click="download"></v-btn>
  <TreeNode 
    root=true
    v-model:leafs="tree.leafs"
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
export default {
  name: "TreeContainer",
  components: {
    TreeNode
  },
  data: () => ({
    tree: {
      leafs: []
    }
  }),
  methods: {
    log(){
      console.log(this.tree)
    },
    download(){
      let text = JSON.stringify(this.tree);
      let filename = 'tree.json';
      let element = document.createElement('a');
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
    }
  },
}
</script>

<style>

</style>
