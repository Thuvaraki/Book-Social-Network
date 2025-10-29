package com.thuva.book.book;

import lombok.AllArgsConstructor;
import lombok.*;
import lombok.NoArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookResponse {
    private Integer id;
    private String title;
    private String authorName;
    private String isbn;
    private String synopsis;
    private String owner;
    private byte[] cover;
    private double rate;
    private boolean archive;
    private boolean shareable;

}
