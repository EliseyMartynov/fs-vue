<script setup lang="ts">
  import {Checkbox} from 'ant-design-vue';
  import {computed, toRefs} from 'vue';
  import {useStore} from 'vuex';
  import {taskModel, taskLib} from 'entities/task';

  interface ToggleTaskProps {
    taskId: number;
    withStatus?: boolean;
  }

  const props = defineProps<ToggleTaskProps>();
  const {taskId, withStatus} = toRefs(props)

  const store = useStore();

  // for use inside script we need to extract value from reactive variables
  const task = computed(() => store.state[taskModel.NAMESPACE].data[taskId.value]);
  const isTaskCompleted = computed(() => task.value?.completed)
  const status = computed(() => taskLib.getTaskStatus(task.value));

  const toggleTask = () => store.commit(taskModel.mutations.toggleTask, taskId.value);
</script>

<template>
  <Checkbox @click="toggleTask" :checked="isTaskCompleted">
      <template v-if="withStatus">{{status}}</template>
  </Checkbox>
</template>