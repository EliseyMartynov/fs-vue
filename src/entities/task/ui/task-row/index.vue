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
  }

  const props = defineProps<TaskRowProps>()

  const {data, titleHref} = toRefs(props)
</script>

<template>
  <Row :class="[styles.root, { [styles.completed]: data?.completed }]">
    <div :class="styles.marginBefore">
      <slot name="before" />
    </div>
    <RouterLink v-if="titleHref" :to="titleHref">{{data?.title}}</RouterLink>
    <span v-else>{{data?.title}}</span>
  </Row>
</template>