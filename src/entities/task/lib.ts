import type {Task} from 'shared/api';

export const getTaskStatus = (data: Task) => data?.completed ? "CLOSED" : "OPENED";