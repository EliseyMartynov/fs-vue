<script setup lang="ts">
  import {Layout, LayoutContent, Row, Col, TypographyTitle, Spin, Empty} from 'ant-design-vue';
  import {onMounted, computed} from 'vue';
  import {useStore} from 'vuex';

  import {ToggleTask} from 'features/toggle-task';
  import {TaskFilters} from 'features/task-filters';
  import {taskModel, TaskRow} from 'entities/task';

  import styles from './styles.module.scss';

  const store = useStore();

  const getTasksListAsync = () => store.dispatch(taskModel.actions.getTasksListAsync);
  onMounted(getTasksListAsync)

  const isListLoading = computed(() => store.state[taskModel.NAMESPACE].isListLoading)
  const isTasksListEmpty = computed(() => store.getters[taskModel.getters.isTasksListEmpty]);
  const filteredTasks = computed(() => store.getters[taskModel.getters.filteredTasks])
</script>

<template>
  <Layout :class="styles.root">
    <Layout :class="styles.toolbar">
      <Row justify="center">
        <TypographyTitle :level="1">Tasks list</TypographyTitle>
      </Row>
      <Row justify="center">
        <TaskFilters />
      </Row>
    </Layout>
    <LayoutContent :class="styles.content">
      <Row :gutter="[0, 20]" justify="center">
        <Spin v-if="isListLoading" size="large" />
        <Empty v-else-if="isTasksListEmpty" description="No tasks found" />
        <template v-else v-for="task in filteredTasks" :key="task.id">
          <Col :span="24">
            <TaskRow
              :data="task"
              :titleHref="`/${task.id}`"
            >
              <template v-slot:before>
                <ToggleTask :taskId='task.id' :withStatus='false' />
              </template>
            </TaskRow>
          </Col>
        </template>
      </Row>
    </LayoutContent>
  </Layout>
</template>