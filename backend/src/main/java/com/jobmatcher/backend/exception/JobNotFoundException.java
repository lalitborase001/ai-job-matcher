package com.jobmatcher.backend.exception;

public class JobNotFoundException extends RuntimeException{
    public JobNotFoundException(String message){
        super(message);
    }
}
