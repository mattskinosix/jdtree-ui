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
      <div :style="{backgroundColor: randomColor , 'border-radius': '30px'}" v-if="leafs.length">
        
      <v-row >
        <v-col>
<v-text-field 
        :disabled="state.modify"
        label="variable"
        @input="$emit('update:variable', $event.target.value)"
        v-model="variableData"
      >

            </v-text-field>
        </v-col>
      </v-row>
    <v-row  class="ma-5">
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
        v-model:sumWidth="sumWidthData"
      />
      </v-col>
  </v-row>
</div>
  </div>
</template>
 
<script>
import { uuid } from 'vue-uuid'; 
import ResultNode from '../components/ResultNode.vue'
import { useTreeStore } from '@/stores/tree'

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
    sumWidth:{
      type: Number
    }
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
    sumWidthData: 0,
  }),
  methods: {
    randomColorFunc() {
      const r = () => Math.floor(256 * Math.random());
      return`rgb(${r()}, ${r()}, ${r()})`;
    },
    addLeaf(){

      const store = useTreeStore()
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
      store.width += this.$vuetify.display.xs ? 150 : 15
    },
    removeLeaf(){
      if(this.leafsMutable.length){
        const store = useTreeStore()
        this.leafsMutable.splice(this.leafsMutable.length-1, 1)
        this.$emit("update:leafs", this.leafsMutable)
        console.log(this.$vuetify)
        store.width -=  this.$vuetify.display.xs ? 100 : 15
      }
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
    this.sumWidthData = this.sumWidth
    this.randomColor = this.randomColorFunc()
  },
  setup() {
    const store = useTreeStore()

    return {
      // you can return the whole store instance to use it in the template
      store,
    }
  },

}
</script>
<style scoped>
.cardAction {
  text-align:center;
  align-items: center;
  color: white;
}
</style>
