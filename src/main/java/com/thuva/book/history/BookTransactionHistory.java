package com.thuva.book.history;

import com.thuva.book.common.BaseEntity;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public class BookTransactionHistory extends BaseEntity {
    // user relationship
    // book relationship

    private boolean returned;
    private boolean returnApproved;
}
