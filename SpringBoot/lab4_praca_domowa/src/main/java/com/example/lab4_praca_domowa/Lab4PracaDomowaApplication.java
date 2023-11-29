package com.example.lab4_praca_domowa;

//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//
//@SpringBootApplication
//public class Lab4PracaDomowaApplication {
//
//	public static void main(String[] args) {
//		SpringApplication.run(Lab4PracaDomowaApplication.class, args);
//	}
//
//}

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class Lab4PracaDomowaApplication {
	public static void main(String[] args) {
		SpringApplication.run(Lab4PracaDomowaApplication.class, args);
	}
}
