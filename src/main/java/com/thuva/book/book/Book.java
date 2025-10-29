package com.thuva.book.book;

import com.thuva.book.common.BaseEntity;
import com.thuva.book.feedback.Feedback;
import com.thuva.book.history.BookTransactionHistory;
import com.thuva.book.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.List;
@Getter
@Setter
@SuperBuilder // @Builder doesn’t support chaining builders from parent to child. @SuperBuilder allows access to both parent and child fields.
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Book extends BaseEntity {
    private String title;
    private String authorName;
    private String isbn;
    private String synopsis;
    private String bookCover;
    private boolean archived;
    private boolean shareable;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "book")
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "book")
    private List<BookTransactionHistory> histories;

    @Transient
    // JPA annotation used to mark a field in an entity that should not be persisted in the database. JPA will ignore that field — it will not create a column for it, nor will it be saved or loaded from the database.
    public double getRate() {
        if (feedbacks == null || feedbacks.isEmpty()) {
            return 0.0;
        }
        //We can omit the explicit type declaration(able to use var) when the compiler can clearly infer the type from the context.
        var rate = this.feedbacks.stream()
                .mapToDouble(Feedback::getNote)
                .average()
                .orElse(0.0);
        double roundedRate = Math.round(rate * 10) / 10.0;
        return roundedRate;
    }
}
