package com.thuva.book.feedback;

import jakarta.validation.constraints.*;

public record FeedbackRequest(
        @Positive(message = "200") //  "200": "Value must be positive"
        @Min(value = 0, message = "201") //  "201": "Value must be at least 0"
        @Max(value = 5, message = "202")
        Double note,

        @NotBlank(message = "203")
        String comment,
        Integer bookId
){
}
