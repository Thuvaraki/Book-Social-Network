package com.thuva.book.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book, Integer>, JpaSpecificationExecutor<Book> {

    //written in JPQL (not raw SQL)
    // :userId is a named parameter — it means the actual user ID will be supplied dynamically when the query runs.
    @Query("""
            SELECT book
            FROM Book book
            WHERE book.archived = false
            AND book.shareable = true
            AND book.owner.id != :userId
            """)
    Page<Book> findAllDisplayableBooks(Pageable pageable, Integer userId);

    // It returns a Page<Book> — which contains:
          //  The list of Book entities for that page.
         //  Metadata like total elements, total pages, etc.
}
