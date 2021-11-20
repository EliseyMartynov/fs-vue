<script setup lang="ts">
import {Layout, LayoutContent, Result, Button} from 'ant-design-vue';
import {onMounted, computed} from 'vue';
import {useStore} from 'vuex';
import {RouterLink, useRoute} from 'vue-router';

import {ToggleTask} from 'features/toggle-task';
import {TaskCard, taskModel} from 'entities/task';

import styles from './styles.module.scss';

const route = useRoute();
const taskId = route.params.id;

const store = useStore();

const getTaskById = () => {
  store.dispatch(taskModel.actions.getTaskByIdAsync, { taskId } )
}
onMounted(getTaskById);

const task = computed(() => store.getters[taskModel.getters.useTask](taskId));
const isDetailsLoading = computed(() => store.state[taskModel.NAMESPACE].isDetailsLoading);
// it's not rendering 404 somehow :/
const isRenderNotFound = computed(() => !task.value && !isDetailsLoading.value);
</script>

<template>
  <Layout :class="styles.root">
    <LayoutContent :class="styles.content">
      <Result status="404"
              title="404"
              subTitle="Task was not found"
              v-if="isRenderNotFound"
      >
        <!--         v-if not working properly :/-->
        <template #extra>
          <RouterLink to="/"><Button>Back to tasks list</Button></RouterLink>
        </template>
      </Result>
      <TaskCard v-else
                :data="task"
                size="default"
                :loading="isDetailsLoading"
                :class="styles.card"
                :bodyStyle="{height: 400}"
      >
        <template #actions>
<!--          it's not rendering action if we will not place some div near it...-->
<!--          e.g. <div>Actions</div>-->
          123
          <ToggleTask :taskId="taskId" :withStatus="true" />
        </template>
        <template #extra>
          <RouterLink to="/">Back to tasks list</RouterLink>
        </template>
      </TaskCard>
    </LayoutContent>
  </Layout>
</template>