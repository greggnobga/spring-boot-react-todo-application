package com.buntod.todo;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringBootTodoApplication {

    /** Add model mapper. */
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    /** Default main function. */
    public static void main(String[] args) {
        SpringApplication.run(SpringBootTodoApplication.class, args);
    }

}
