<template>

  <v-toolbar title="JDTREE">

    <v-col>
      <v-file-input
        accept="image/json"
        hide-details
        @change="import_file"
      ></v-file-input>


    </v-col>

    <v-col>
      <v-btn icon="mdi-download" class="" @click="log"></v-btn>
    </v-col>
  </v-toolbar>
  <v-row>
    <v-textarea
      disabled
      readonly
      :value="JSON.stringify(tree)"> 
    </v-textarea>
  </v-row>


  <div :style="{ transform , backgroundColor: 'grey'}"  ref="myid">
    <div class="mt-5" :style="{ width: divWidth + this.store.width + '%',height: divWidth + this.store.width + '%' , 'transform': 'scale('+Math.pow((divWidth + this.store.width)*1.05/100,-1)+') translate(-'+this.store.width*  0.525+'%) translateY(-'+this.store.width*0.5+'%)'}"> 
      <TreeNode 
        :root=true
        v-model:leafs="tree.root.leafs"
        v-model:variableName="tree.root.variableName"
        v-model:variableType="tree.root.variableType"
      >
      </TreeNode>

    </div>
  </div>
</template>

<script>
import TreeNode from '../components/TreeNode.vue'
import { useTreeStore } from '@/stores/tree'
export default {
  name: "TreeContainer",
  components: {
    TreeNode,
  },
  data: () => ({
    tree: {
      root: {
        variableType: '',
        variableName: '',
        leafs: [],
      }
    },
    divWidth:100,
    padding: false,
    transform: '',
    mouseX: 0,
    mouseY: 0,
    mouseTX: 0,
    mouseTY: 0,
    mapKey: {},
    ts: {
      scale: 1,
      rotate: 0,
      translate: {
        x: 0,
        y: 0
      }
    },

  }),
  methods: {
    setZoom(el) {
      let transformOrigin = [0,0];
      var p = ["webkit", "moz", "ms", "o"], s = "scale(" + 5 + ")", oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

      for (var i = 0; i < p.length; i++) {
        el.style[p[i] + "Transform"] = s;
        el.style[p[i] + "TransformOrigin"] = oString;
      }

      el.style["transform"] = s;
      el.style["transformOrigin"] = oString;
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
    },
    grabbing(event) {
      if (this.padding){
        const x = event.clientX;
        const y = event.clientY;
        this.ts.translate.x = this.mouseTX + (x - this.mouseX);
        this.ts.translate.y = this.mouseTY + (y - this.mouseY);
        this.setTransform();
      }
    },
    start_grabbing(event) {
      this.padding = true
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
      this.mouseTX = this.ts.translate.x;
      this.mouseTY = this.ts.translate.y;
    },
    end_grabbing() {
      this.padding = false
    },
    zoom(event) {
      //need more handling  to avoid fast scrolls
      let rec = this.$refs.myid.getBoundingClientRect();
      let x = (event.clientX - rec.x) / this.ts.scale;
      let y = (event.clientY - rec.y) / this.ts.scale;

      let delta = (event.wheelDelta ? event.wheelDelta : -event.deltaY);
      this.ts.scale = (delta > 0.3) ? (this.ts.scale + 0.2) : (this.ts.scale - 0.2);

      //let m = (ts.scale - 1) / 2;
      let m = (delta > 0.3) ? 0.1 : -0.1;
      this.ts.translate.x += (-x * m * 2) + (this.$refs['myid'].offsetWidth * m);
      this.ts.translate.y += (-y * m * 2) + (this.$refs['myid'].offsetHeight * m);
      this.setTransform()
    },
    setTransform() {
      this.transform = `translate(${this.ts.translate.x}px,${this.ts.translate.y}px) scale(${this.ts.scale})`;
    }
  },
  created() {


    window.addEventListener('wheel', (e) => {
      if(e.metaKey == true)
        e.preventDefault()

      if(e.altKey == true)
        this.zoom(e)
    },{ passive:false });
    window.addEventListener('mousedown', (e) => {
      if(e.ctrlKey == true)
        this.start_grabbing(e)
    });
    window.addEventListener('mouseup', (e) => {
      if(e.ctrlKey == true)
        this.end_grabbing(e)
    });
    window.addEventListener('mousemove', (e) => {
      if(e.ctrlKey == true)
        this.grabbing(e)
    });
  },
  setup() {
    const store = useTreeStore()
    return {
      store,
    }
  },
}
</script>

<style>

</style>
