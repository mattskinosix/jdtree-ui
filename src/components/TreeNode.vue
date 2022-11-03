<template>
  <div >

    <v-card color="black" style="border-radius: 30px;">
      <v-card-actions class="cardAction">

        <v-col>
          <v-btn @click="addLeaf">+ </v-btn>
        </v-col>

        <v-col>
          <v-btn @click="addResultLeaf"> result</v-btn>
        </v-col>

        <v-col>
          <v-btn @click="removeLeaf"> - </v-btn>
        </v-col>

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
  <v-row :style="{backgroundColor: randomColor , 'border-radius': '30px'}" class="ma-5">
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

  </div>
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
    operatorData:'', 
    randomColor: '',
  }),
  methods: {
    randomColorFunc() {
      const r = () => Math.floor(256 * Math.random());
      return`rgb(${r()}, ${r()}, ${r()})`;
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
    this.randomColor = this.randomColorFunc()
  } 
}
</script>
<style scoped>
.cardAction {
  text-align:center;
  align-items: center;
  color: white;
}
</style>
