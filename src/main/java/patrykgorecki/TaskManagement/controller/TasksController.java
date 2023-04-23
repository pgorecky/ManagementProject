package patrykgorecki.TaskManagement.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import patrykgorecki.TaskManagement.exception.ResourceNotFoundException;
import patrykgorecki.TaskManagement.model.Tasks;
import patrykgorecki.TaskManagement.repository.TasksRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TasksController {
    final TasksRepository tasksRepository;
    final ObjectMapper objectMapper;

    public TasksController(TasksRepository tasksRepository, ObjectMapper objectMapper) {
        this.tasksRepository = tasksRepository;
        this.objectMapper = objectMapper;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/")
    public ResponseEntity getTasks() throws JsonProcessingException{
        List<Tasks> tasks = tasksRepository.findAll();
        return ResponseEntity.ok(objectMapper.writeValueAsString(tasks));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{taskId}")
    public ResponseEntity<Optional<Tasks>> getTaskById(@PathVariable Long taskId) {
        Optional<Tasks> task = tasksRepository.getTasksById(taskId);
        if (task.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(task);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/")
    public Tasks addTask(@RequestBody Tasks task) throws JsonProcessingException{
        task.setCreated(LocalDate.now());
        task.setState("Submitted");
        return tasksRepository.save(task);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        Tasks task = tasksRepository.getTasksById(taskId).orElseThrow(() -> new ResourceNotFoundException("This task does not exist"));
        tasksRepository.deleteById(task.getId());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{taskId}")
    public ResponseEntity<Tasks> editTask(@PathVariable Long taskId, @RequestBody Tasks taskDetails){
        Tasks task = tasksRepository.getTasksById(taskId).orElseThrow(() -> new ResourceNotFoundException("This task does not exist"));
        task.setEmployee(taskDetails.getEmployee());
        task.setTitle(taskDetails.getTitle());
        task.setTaskDescription(taskDetails.getTaskDescription());
        task.setState(taskDetails.getState());
        task.setDueDate(taskDetails.getDueDate());
        Tasks updatedTask = tasksRepository.save(task);
        return ResponseEntity.ok(updatedTask);
    }
}
