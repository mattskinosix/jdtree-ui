<template>
  <div >
    <v-card color="black" style="border-radius: 30px;" >
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
      <v-row 
        class="ma-16"
        style="justify-content:center"
      >
        <v-col
          v-if="!leafs[0].hasOwnProperty('result')"
        >
          <v-card color="black" style="border-radius: 30px;">
            <v-card-title>
              variable
            </v-card-title>
            <v-card-actions>
              <v-text-field 
                color="white"
                :disabled="state.modify"
                @input="$emit('update:variableName', $event.target.value)"
                v-model="variableNameData"
              >
              </v-text-field>
              <v-select 
                :items="this.allowed_types"
                color="white"
                @update:modelValue="$emit('update:variableType', $event)"
                v-model="variableTypeData"
              >
              </v-select>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-5">
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
            v-model:variableName="leaf.variableName"
            v-model:variableType="leaf.variableType"
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
import ALLOWED_TYPES from '@/constants/allowed_type.js'
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
    variableName: {
      type: String,
    },
    operator: {
      type: String,
    },
    variableType: {
      type: String
    }
  },
  data: () => ({
    allowed_types: ALLOWED_TYPES,
    state: {
      result: false,
    },
    leafsMutable: [],
    valueData: '',
    variableData: '',
    operatorData:'', 
    variableTypeData:'', 
    variableNameData:'', 
    randomColor: '',
    sumWidthData: 0,
  }),
  methods: {
    log(e){
      console.log(e)
    },
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
        leafs: []
      })
      this.$emit("update:leafs", this.leafsMutable)
      store.width += this.$vuetify.display.xs ? 150 : 15
    },
    removeLeaf(){

      const store = useTreeStore()
      this.leafsMutable.splice(this.leafsMutable.length-1, 1)
      this.$emit("update:leafs", this.leafsMutable)
      console.log(this.$vuetify)
      store.width -=  this.$vuetify.display.xs ? 100 : 15
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
    this.variableNameData = this.variableName
    this.variableTypeData = this.variableType
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
