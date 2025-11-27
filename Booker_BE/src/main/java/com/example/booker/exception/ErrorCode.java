package com.example.booker.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized Exception"),
    CATEGORY_EXISTED(1002, "Category existed"),
    CATEGORY_INVALED(1003, "Ten the loai khong duoc de trong"),
    INVALID_CATEGORY(1004, "Mo ta khong duoc de trong");

    private int code;
    private String message;
}
