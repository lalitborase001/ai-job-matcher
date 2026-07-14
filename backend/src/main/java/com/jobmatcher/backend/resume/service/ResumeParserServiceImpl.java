package com.jobmatcher.backend.resume.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class ResumeParserServiceImpl
        implements ResumeParserService {

    @Override
    public String extractText(File file)
            throws IOException {

        try (PDDocument document = Loader.loadPDF(file)) {

            PDFTextStripper stripper =
                    new PDFTextStripper();

            return stripper.getText(document);

        }
    }
}