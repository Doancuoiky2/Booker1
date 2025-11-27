package com.example.booker.exception;


import com.example.booker.request.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHanler {

    //bat tat ca cac loai Exception
//    @ExceptionHandler(value = Exception.class)
//    ResponseEntity<ApiResponse> runtimeExceptionHandler(RuntimeException e) {
//        ApiResponse apiResponse = new ApiResponse();
//        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
//        apiResponse.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
//        return ResponseEntity.badRequest().body(apiResponse);
//    }
//
//    @ExceptionHandler(value = RuntimeException.class)
//    ResponseEntity<ApiResponse> runtimeAppExceptionHandler(RuntimeException e) {
//        ApiResponse apiResponse = new ApiResponse();
//
//        apiResponse.setCode(1001);
//        apiResponse.setMessage(e.getMessage());
//
//        return ResponseEntity.badRequest().body(apiResponse);
//    }
//
//    @ExceptionHandler(value = MethodArgumentNotValidException.class)
//    ResponseEntity<ApiResponse> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
//        String enumKey = e.getFieldError().getDefaultMessage();
//        ErrorCode errorCode = ErrorCode.valueOf(enumKey);
//
//        ApiResponse apiResponse = new ApiResponse();
//        apiResponse.setCode(errorCode.getCode());
//        apiResponse.setMessage(errorCode.getMessage());
//
//        return ResponseEntity.badRequest().body(apiResponse);
//    }

}
