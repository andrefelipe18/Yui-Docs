<script setup lang="ts">
interface MarkDownFile {
  path: string;
}

const fileTree = ref([] as MarkDownFile[]);
getMarkdownFiles('andrefelipe18', 'Yui', 'docs')
    .then(files => {
        fileTree.value = files;
        console.log(fileTree.value);
    });
</script>
<template>
    <div>
        
    </div>
</template>