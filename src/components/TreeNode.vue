<template>
  <v-container>
    <v-card color="black">
      <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn icon="fas fa-edit" @click="state.modify=!state.modify" ></v-btn>
          <v-btn icon="fas fa-add" @click="addLeaf" ></v-btn>
          <v-btn icon="fas fa-minus" @click="removeLeaf" ></v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-card-actions>
        <v-text-field
          :disabled="state.modify"
          v-model="node.variable"
          label="variable"
        >
        </v-text-field>
        <v-text-field
          :disabled="state.modify"
          v-model="node.operator"
          label="operator"
        >
        </v-text-field>
        <v-text-field
          :disabled="state.modify"
          v-model="node.value"
          label="value"
        >
        </v-text-field>
      </v-card-actions>
    </v-card>
  </v-container>
  <v-row>
    <v-col 
      v-for="leaf in node.leafs"
      :key="leaf.id" 
    >
      <TreeNode
        :children="leaf"
      />
      </v-col>
  </v-row>
 </template>
 
<script>
import { uuid } from 'vue-uuid'; 
export default {
  name: 'TreeNode',
  props: ['value'],
  data: () => ({
    state: {
      modify: false,
    },
    node: this.value,
  }),
  methods: {
    addLeaf(){
      this.node.leafs.push({
        id: uuid.v4(),
        value: '',
        operator: '',
        variable: '',
        leafs: []
      })
      this.handleInput()
    },
    removeLeaf(){
      this.leafs.splice(this.leafs.length-1, 1)
      this.handleInput()
    },
    handleInput () {
      this.$emit('input', this.node)
    }
  }
}
</script>
