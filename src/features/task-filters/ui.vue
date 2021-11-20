<script setup lang="ts">
  import {RadioButton, RadioGroup} from 'ant-design-vue';
  import {computed} from 'vue';
  import {useStore} from 'vuex';
  import {taskModel} from 'entities/task';
  import {filtersList, getFilterById, DEFAULT_FILTER} from './config'

  const store = useStore();

  const isListLoading = computed(() => store.state[taskModel.NAMESPACE].isListLoading);
  const onFilterClick = (id: number) => store.commit(
    taskModel.mutations.setQueryConfig, getFilterById(id).config
  )
</script>

<template>
  <RadioGroup :defaultValue="DEFAULT_FILTER"
              buttonStyle="solid"
  >
    <template v-for="{title, id} in filtersList" :key="id">
      <RadioButton
                :value="id"
                @click="onFilterClick(id)"
                :disabled="isListLoading"
      >
        {{title}}
      </RadioButton>
    </template>
  </RadioGroup>
</template>