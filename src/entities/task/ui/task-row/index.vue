<script setup lang="ts">
  import {toRefs} from 'vue';
  import {RouterLink} from 'vue-router';
  import {Row} from 'ant-design-vue';
  import {Task} from 'shared/api';
  import styles from './styles.module.scss';

  // interfaces are not exporting....
  interface TaskRowProps {
    data: Task;
    titleHref?: string;
    before?: any; // types (expect primitives) don't work anyways
  }

  const {data, before, titleHref} = toRefs(defineProps<TaskRowProps>())
</script>

<template>
  <Row :class="[styles.root, { [styles.completed]: data?.completed }]">
    {{before}}
    <RouterLink v-if="titleHref" :to="titleHref">{{data?.title}}</RouterLink>
    <span v-else>{{data?.title}}</span>
  </Row>
</template>