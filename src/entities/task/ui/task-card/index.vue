<script setup lang="ts">
  import {toRefs} from 'vue';
  import {RouterLink} from 'vue-router';
  import {Card, CardProps} from 'ant-design-vue';
  import {Task} from 'shared/api';
  import styles from './styles.module.scss';

  interface TaskCardProps extends CardProps {
    data?: Task; // types don't work :\
    titleHref: string;
  }

  const {data, loading, titleHref} = toRefs(defineProps<TaskCardProps>());
</script>

<template>
  <Card
    :title="`Task#${loading ? '' : data?.id}`"
    :class="styles.root"
  >
    <RouterLink v-if="titleHref" :to="titleHref">{{data?.title}}</RouterLink>
    <span v-else>{{data?.title}}</span>
    <slot />
  </Card>
</template>