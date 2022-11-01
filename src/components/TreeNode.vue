<template>
  <v-container>
    <v-card color="black" >
      <v-card-actions >
          <v-btn @click="addLeaf">+ condition</v-btn>

          <v-btn @click="addResultLeaf">set result</v-btn>

          <v-btn @click="removeLeaf"> - condition</v-btn>
      </v-card-actions>

      <v-card-actions v-if="!root">
        <v-text-field
          :disabled="state.modify"
          label="variable"
          @input="$emit('update:variable', $event.target.value)"
          v-model="variableData"
        >
        </v-text-field>
        <v-text-field
          :disabled="state.modify"
          label="operator"
          @input="$emit('update:operator', $event.target.value)"
          v-model="operatorData"
        >
        </v-text-field>
        <v-text-field
          :disabled="state.modify"
          @input="$emit('update:value', $event.target.value)"
          v-model="valueData"
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
      <v-icon icon="mdi-arrow-down">

      </v-icon>
        <br>
      
      <ResultNode 
        v-if="leaf.hasOwnProperty('result')"
        v-model:result="leaf.result"
      />

      <TreeNode 
        v-if="!leaf.hasOwnProperty('result')"
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
import ResultNode from '../components/ResultNode.vue'
export default {
  name: 'TreeNode',
  components: {
    ResultNode
  },
  props: {
    root:{
      type: Boolean
    },
    leafs: {
      type: Array,
      required: true
    },
    value: {
      type: String,
    },
    variable: {
      type: String,
    },
    operator: {
      type: String,
    },
  },
  data: () => ({
    state: {
      result: false,
    },
    leafsMutable: [],
    valueData: '',
    variableData: '',
    operatorData:'' 
  }),
  methods: {
    log(){
      console.log(this)
    },
    addLeaf(){
      // delete result leaf
      for (const [index, leaf] of this.leafsMutable.entries()){
        if (leaf.result){
          this.leafsMutable.splice(index, 1)
        }
      }

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
    addResultLeaf(){
      this.leafsMutable = []
      this.leafsMutable.push({
        result: {}
      })
      this.$emit("update:leafs", this.leafsMutable)
    },
  },
  created(){
    this.valueData = this.value
    this.operatorData = this.operator
    this.leafsMutable = this.leafs
    this.variableData = this.variable
  } 
}
</script>
