<template>
  <v-container>
    <v-card color="black">
      <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn icon="fas fa-edit" @click="state.modify=!state.modify"></v-btn>
          <v-btn icon="fas fa-add" @click="addLeaf"></v-btn>
          <v-btn icon="fas fa-minus" @click="removeLeaf"></v-btn>
          <v-btn icon="fas fa-minus" @click="log"></v-btn>
        <v-spacer></v-spacer>

      </v-card-actions>

      <v-card-actions>
        <v-text-field
          :disabled="state.modify"
          label="variable"
          @input="$emit('update:variable', $event.target.value)"
          :value="variable"
        >
        </v-text-field>
        <v-text-field
          :disabled="state.modify"
          label="operator"
          @input="$emit('update:operator', $event.target.value)"
          :value="operator"
        >
        </v-text-field>
        <v-text-field
          :disabled="state.modify"
          @input="$emit('update:value', $event.target.value)"
          :value="value"
          label="value"
        >
        </v-text-field>
      </v-card-actions>
    </v-card>
  </v-container>
  <v-row>
    <v-col 
      v-for="leaf in leafs"
      :key="leaf.id" 
    >
      <v-icon icon="fas fa-arrow-down-long">

      </v-icon>
        <br>
      
      <TreeNode
        v-model:leafs="leaf.leafs"
        v-model:value="leaf.value"
        v-model:operator="leaf.operator"
        v-model:variable="leaf.variable"
      />
      </v-col>
  </v-row>

</template>
 
<script>
import { uuid } from 'vue-uuid'; 
export default {
  name: 'TreeNode',
  props: {
    leafs: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    variable: {
      type: String,
      default: '',
      required: true
    },
    operator: {
      type: String,
      required: true
    },
  },
  data: () => ({
    state: {
      modify: false
    },
    leafsMutable: []
  }),
  methods: {
    addLeaf(){
      this.leafsMutable.push({
        id: uuid.v4(),
        value: '',
        operator: '',
        variable: '',
        leafs: []
      })
      this.$emit("update:leafs", this.leafsMutable)
    },
    removeLeaf(){
      this.leafsMutable.splice(this.leafsMutable.length-1, 1)
      this.$emit("update:leafs", this.leafsMutable)
    },
    log(){
      console.log(this)
    }
  },
  created(){

      console.log(this.leafs)
  }

}
</script>
