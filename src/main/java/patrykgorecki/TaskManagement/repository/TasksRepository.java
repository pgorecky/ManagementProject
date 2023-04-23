package patrykgorecki.TaskManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import patrykgorecki.TaskManagement.model.Tasks;

import java.util.Optional;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Long> {
    Optional<Tasks> getTasksById(Long Id);
}
