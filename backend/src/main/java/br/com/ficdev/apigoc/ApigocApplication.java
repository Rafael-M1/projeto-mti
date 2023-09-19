package br.com.ficdev.apigoc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class ApigocApplication extends SpringBootServletInitializer  {
	
	public static void main(String[] args) {
		SpringApplication.run(ApigocApplication.class, args);
	}
}
