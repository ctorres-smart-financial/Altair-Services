package com.smart.altairservices;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Directories {
    @Value("${api.directory}")
    public String apiDir;
    
    @Value("${reports.html}")
    public String htmlReportsDir;
    
    @Value("${reports.xml}")
    public String xmlReportsDir;
    
    @Value("${bash.scripts}")
    public String bashScripts;
    
    @Value("${node.path}")
    public String
            nodePath;
    
    @Value("${newman.path}")
    public String
            newmanPath;
}
