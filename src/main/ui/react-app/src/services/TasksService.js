import axios from "axios";

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/tasks/';

class TasksService {
    getTasks(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createTask(tasks){
        return axios.post(EMPLOYEE_API_BASE_URL, tasks);
    }

    getTaskById(taskId){
        return axios.get(EMPLOYEE_API_BASE_URL +''+ taskId);
    }

    editTask(task, taskId){
        return axios.put(EMPLOYEE_API_BASE_URL+''+taskId, task)
    }
    deleteTask(task, taskId){
        return axios.delete(EMPLOYEE_API_BASE_URL+''+taskId, task)
    }

}
export default new TasksService();