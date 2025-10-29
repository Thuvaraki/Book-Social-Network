package com.thuva.book.book;

import com.thuva.book.common.PageResponse;
import com.thuva.book.history.BookTransactionHistory;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("books")
@RequiredArgsConstructor
@Tag(name = "Book") //  group all operations within that controller under a common tag
public class BookController {
    private final BookService service;

    @PostMapping
    public ResponseEntity<Integer> saveBook(
            @Valid @RequestBody BookRequest request,
            Authentication connectedUser
            ){
        return ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping({"book-id"})
    public ResponseEntity<BookResponse> findById(@PathVariable("book-id") Integer bookId){
        return ResponseEntity.ok(service.findById(bookId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<BookResponse>> findAllBooks(
            @RequestParam(name="page", defaultValue = "0", required = false) int page, //tell Spring to read values from query parameters in the request URL
            @RequestParam(name ="size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.findAllBooks(page, size, connectedUser));
    }

}
