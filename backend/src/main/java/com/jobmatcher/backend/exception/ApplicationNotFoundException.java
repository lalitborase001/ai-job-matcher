package com.jobmatcher.backend.exception;

public class ApplicationNotFoundException extends RuntimeException {
    public ApplicationNotFoundException(String message){
        super(message);
    }
}
