CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  date_of_birth DATE
);

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT,
  title VARCHAR(255),
  task_description VARCHAR(65000),
  state VARCHAR(255),
  due_date DATE,
  created DATE,
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);
