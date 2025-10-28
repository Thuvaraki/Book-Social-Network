package com.thuva.book;

import com.thuva.book.role.Role;
import com.thuva.book.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware") // a Spring Data JPA annotation that activates the auditing feature. auditorAwareRef refers to a Spring Bean that implements the interface AuditorAware<T>
@EnableAsync
public class BookNetworkApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookNetworkApiApplication.class, args);
	}

	// CommandLineRunner → A special Spring interface that runs code after the Spring Boot application starts.
	@Bean
	public CommandLineRunner runner(RoleRepository  roleRepository){
		// lambda expression that implements the run method of CommandLineRunner
		return args -> {
			if(roleRepository.findByName("USER").isEmpty())
			{
				roleRepository.save(
						Role.builder().name("USER").build()
				);
			}
		};
	}
}

// @EnableJpaAuditing - a Spring Data JPA annotation that activates the auditing feature.
//Auditing means Spring can automatically fill fields like:
		// Who created an entity (@CreatedBy)
		// When it was created (@CreatedDate)
		// Who last modified it (@LastModifiedBy)
		// When it was last modified (@LastModifiedDate)