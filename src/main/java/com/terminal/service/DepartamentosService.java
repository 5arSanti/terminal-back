package com.terminal.service;

import com.terminal.entity.Departamentos;
import com.terminal.repository.DepartamentosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartamentosService {

    private final DepartamentosRepository repository;

    public DepartamentosService(DepartamentosRepository repository) {
        this.repository = repository;
    }

    public List<Departamentos> getAll() {
        return repository.findAll();
    }
}
