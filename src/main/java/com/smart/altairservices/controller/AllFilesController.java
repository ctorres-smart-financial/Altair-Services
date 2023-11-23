package com.smart.altairservices.controller;

import com.smart.altairservices.service.AllFilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AllFilesController {
    private final AllFilesService allFilesService;
    @Autowired
    public AllFilesController(AllFilesService allFilesService) {
        this.allFilesService = allFilesService;
    }
    
    @GetMapping("/all-files")
    @ResponseBody
    public Object execute() {
        return allFilesService.reportFiles();
    }
}
