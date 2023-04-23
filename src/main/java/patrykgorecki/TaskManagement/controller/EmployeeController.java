package patrykgorecki.TaskManagement.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import patrykgorecki.TaskManagement.exception.ResourceNotFoundException;
import patrykgorecki.TaskManagement.model.Employee;
import patrykgorecki.TaskManagement.repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    final EmployeeRepository employeeRepository;
    final ObjectMapper objectMapper;

    public EmployeeController(EmployeeRepository employeeRepository, ObjectMapper objectMapper) {
        this.employeeRepository = employeeRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/")
    public ResponseEntity getEmployees() throws JsonProcessingException {
        List<Employee> employees = employeeRepository.findAll();
        return ResponseEntity.ok(objectMapper.writeValueAsString(employees));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{userId}")
    public ResponseEntity<Optional<Employee>> getUserById(@PathVariable Long userId) {
        Optional<Employee> employee = employeeRepository.getEmployeeById(userId);
        if (employee.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(employee);
        }
    }

    @PostMapping("/")
    public Employee addEmployee(@RequestBody Employee employee) throws JsonProcessingException{
        return employeeRepository.save(employee);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{userId}")
    public ResponseEntity<Employee> editEmployee(@PathVariable Long userId, @RequestBody Employee employeeDetails){
        Employee employee = employeeRepository.getEmployeeById(userId).orElseThrow(() -> new ResourceNotFoundException("This employee does not exist"));
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setDateOfBirth(employeeDetails.getDateOfBirth());
        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{userId}")
    public void deleteEmployee(@PathVariable Long userId){
        Employee employee = employeeRepository.getEmployeeById(userId).orElseThrow(() -> new ResourceNotFoundException("This employee does not exist"));
        employeeRepository.deleteById(employee.getId());
    }
}
