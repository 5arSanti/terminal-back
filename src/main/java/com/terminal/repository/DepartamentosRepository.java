package com.terminal.repository;

import com.terminal.entity.Departamentos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartamentosRepository extends JpaRepository<Departamentos, Integer> {
}
