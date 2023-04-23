package patrykgorecki.TaskManagement.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String taskDescription;
    private String title;
    private String state;
    private LocalDate dueDate;
    private LocalDate created;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
