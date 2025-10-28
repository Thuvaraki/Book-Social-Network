package com.thuva.book.auth;

import lombok.*;

@Getter
@Setter
@Builder
public class AuthenticationResponse {
    private String token;
}
