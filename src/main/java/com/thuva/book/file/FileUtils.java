package com.thuva.book.file;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Slf4j // Simple Logging Facade for Java - Used for logging purpose
public class FileUtils {
    public static byte[] readFileFromLocation(String fileUrl) {
        if(StringUtils.isBlank(fileUrl)){
            return null;
        }
        try{
            Path filePath = new File(fileUrl).toPath(); // creates a File object for the path. converts that to a Path object.
            return Files.readAllBytes(filePath); // reads the entire file into a byte array.
        } catch(IOException e) {
            log.warn("No file found in the path {}",fileUrl);
        }
        return null;
    }

}
