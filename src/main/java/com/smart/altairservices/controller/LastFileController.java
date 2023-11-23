package com.smart.altairservices.controller;

import com.smart.altairservices.service.LastFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LastFileController {
    
    private final LastFileService lastFileService;
    @Autowired
    public LastFileController(LastFileService lastFileService) {
        this.lastFileService = lastFileService;
    }
    
    @GetMapping("/last-file")
    @ResponseBody
    public Object execute() {
        return lastFileService.latestReportFile();
    }
    
    
}
