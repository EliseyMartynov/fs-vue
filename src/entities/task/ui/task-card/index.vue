<script setup lang="ts">
  import {toRefs, computed} from 'vue';
  import {RouterLink} from 'vue-router';
  import {Card} from 'ant-design-vue';
  import {Task} from 'shared/api';
  import styles from './styles.module.scss';

  interface TaskCardProps {
    data?: Task; // types don't work :\
    titleHref: string;
  }

  const props = defineProps<TaskCardProps>();

  const {data, loading, titleHref} = toRefs(props);
  const taskNumber = computed(() => loading?.value ? '' : data?.value?.id);
</script>

<template>
  <Card
    :title="`Task#${taskNumber || ''}`"
    :class="styles.root"
  >
    <RouterLink v-if="titleHref" :to="titleHref">{{data?.title}}</RouterLink>
    <span v-else>{{data?.title}}</span>
    <slot />
    <template #actions>
      <slot name="actions" />
    </template>
    <template #extra>
      <slot name="extra" />
    </template>
  </Card>
</template>