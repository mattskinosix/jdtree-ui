<template>
  <v-container>
    <v-card color="black">
      <v-card-text v-if="state.json_error">
        {{ state.json_error }}
      </v-card-text>
      <v-card-actions>
        <v-textarea
          :disabled="state.modify"
          v-model=resultValue
          @change="updateResult"
          label="result"
        >
        </v-textarea>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
 
<script>
export default {
  name: 'ResultNode',
  props: {
    result: {
      type: Object,
      required: true
    },
  },
  data: () => ({
    state: {
      modify: false,
      json_error: ''
    },
    resultValue: '{}'
  }),
  methods: {
    updateResult(){
      try{
        this.state.json_error = ''
        this.$emit('update:result', JSON.parse(this.resultValue))
      }catch(err){
        this.state.json_error = err.message
        console.log(err.message)
      }
    }
  }
}
</script>
