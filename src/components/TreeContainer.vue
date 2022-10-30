<template>
  <v-file-input
  truncate-length="15"
  @change="import_file"
></v-file-input>
  <v-btn icon="mdi-download" class="ma-5" @click="download"></v-btn>
  <TreeNode 
    :root=true
    v-model:leafs="tree.leafs"
  >
  </TreeNode>
  <v-textarea
    disabled
    readonly
    :value="JSON.stringify(tree)"> 
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
    import_file(e){
      console.log(e.target.files)
      if (e.target.files.length <= 0) {
        return false;
      }

      const fr = new FileReader();

      fr.onload = e => {
        this.tree = JSON.parse(e.target.result);
        console.log(this.tree)
      }
      fr.readAsText(e.target.files[0]);
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
