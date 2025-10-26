package com.thuva.book;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing // a Spring Data JPA annotation that activates the auditing feature.
public class BookNetworkApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookNetworkApiApplication.class, args);
	}

}

// @EnableJpaAuditing - a Spring Data JPA annotation that activates the auditing feature.
//Auditing means Spring can automatically fill fields like:
		// Who created an entity (@CreatedBy)
		// When it was created (@CreatedDate)
		// Who last modified it (@LastModifiedBy)
		// When it was last modified (@LastModifiedDate)