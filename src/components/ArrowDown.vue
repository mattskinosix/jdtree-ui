<template>
    <!-- Note: several SVG and path attributes omitted for brevity -->
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="80" x2="100" y2="20" stroke="black" />

  <!-- If you do not specify the stroke
       color the line will not be visible -->
</svg>
</template>

<script>
export default {
    name: 'FavStar',


}
</script>

<style scoped>
path {
    fill: none;
}

.starred path{
    fill: #ffd100;
}
</style>
