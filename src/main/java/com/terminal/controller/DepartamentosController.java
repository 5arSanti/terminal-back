package com.terminal.controller;

import com.terminal.entity.Departamentos;
import com.terminal.service.DepartamentosService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departamentos")
@CrossOrigin(origins = "*") // Permite peticiones desde el frontend
public class DepartamentosController {

    private final DepartamentosService service;

    public DepartamentosController(DepartamentosService service) {
        this.service = service;
    }

    @GetMapping
    public List<Departamentos> getDepartamentos() {
        return service.getAll();
    }
}
