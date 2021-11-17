<script setup lang="ts">
  import {Layout, LayoutContent, Row, Col, TypographyTitle, Spin, Empty} from 'ant-design-vue';
  import {onMounted} from 'vue';
  import {useStore} from 'vuex';
  import styles from './styles.module.scss';

  const store = useStore();

  const getTasksListAsync = () => store.dispatch('getTasksListAsync');

  onMounted(getTasksListAsync)
</script>

<template>
  <Layout :class="styles.root">
    <Layout :class="styles.toolbar">
      <Row justify="center">
        <TypographyTitle :level="1">Tasks list</TypographyTitle>
      </Row>
      <Row justify="center">
<!--        TasksFilter feature-->
      </Row>
    </Layout>
    <LayoutContent :class="styles.content">
      <Row :gutter="[0, 20]" justify="center">
        <Spin size="large" />
        <Empty description="No tasks found" />
<!--        TasksList here -->
      </Row>
    </LayoutContent>
  </Layout>
</template>