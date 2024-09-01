package com.buntod.todo.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@Configuration
@RequestMapping
public class AppController implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{spring:[a-zA-Z\\-]+}")
                .setViewName("forward:/index.html");

        registry.addViewController("/**/**/{spring:[a-zA-Z\\-]+}")
                .setViewName("forward:/index.html");

    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(0)
                .setCacheControl(CacheControl.noStore().mustRevalidate());
    }

}
