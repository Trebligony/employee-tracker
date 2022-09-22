INSERT INTO department (name)
VALUES ('Marketing'),
('Finance'),
('Human Resources'),
('Administration');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Associate', 85000, 1),
('Order Administrator', 52000, 2),
('Marketing Assistant', 63000, 2),
('Sales Manager', 45000, 3);

INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
VALUES ('Gourmet Lanchonetes', 'André Fonseca',1, null),
('Hanari Carnes', 'Mario Pontes',2, null),
('Königlich Essen','Philip Cramer',3, 1),
('Morgenstern Gesundkost','Alexander Feuer',2, 1)