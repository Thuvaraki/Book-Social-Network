package com.thuva.book.book;

import org.springframework.data.jpa.domain.Specification;

public class BookSpecification {
    public static Specification<Book> withOwnerId(Integer ownerId){
        return(root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownerId);
    }
}

// Specification is a functional interface in Spring Data JPA. helps you dynamically build complex SQL WHERE clauses.
// root - Represents the entity
// query - Represents the overall query being built
// criteriaBuilder - Helper object to build WHERE conditions

// criteriaBuilder.equal(root.get("owner").get("id"), ownerId)
// root.get("owner") → gets the owner field from the Book entity
// .get("id") → accesses the id field of that owner.
// criteriaBuilder.equal(...) → builds a SQL condition of the form owner.id = ownerId
// So this line literally means: “WHERE book.owner.id = :ownerId”