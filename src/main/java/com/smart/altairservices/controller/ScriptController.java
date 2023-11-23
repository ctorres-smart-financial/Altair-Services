package com.smart.altairservices.controller;

import com.smart.altairservices.service.ScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ScriptController {
    
    private final ScriptService scriptService;
    
    @Autowired
    public ScriptController(ScriptService scriptService) {
        this.scriptService = scriptService;
    }
    
    @GetMapping("/execute-script")
    public void execute() {
        scriptService.executeScript();
    }
}