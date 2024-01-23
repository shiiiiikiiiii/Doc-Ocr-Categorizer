# DocOcrCategorizeer
 Efficient document categorization using OCR for college student materials.
> The project is currently under development.

## Overview

The goal of this project is to build an intelligent system that can automatically classify scanned documents using OCR and NLP techniques. 

The system is designed for university students to efficiently organize and manage documents like transcripts, party application forms, student records etc. 

It aims to automate the traditionally manual process of categorizing documents which is time-consuming and requires constant human supervision.

### Key Features

- Intelligent classification - Classify documents automatically using OCR to extract text and NLP algorithms to analyze text

- Recommendation system - Improve classification accuracy using recommendations based on user history

- User-friendly interface - Upload and process documents easily with an intuitive UI

- Multi-level organization:
  
  - Document libraries - Top level to manage different collections of documents
  
  - Categories - Each library contains multiple document categories
  
  - Documents - Individual documents belong to a specific category

## Tech Stack

### Frontend

- React - A popular JavaScript framework for building user interfaces

- Ant Design - UI component library that provides various React components

### Backend

- Python - High-level programming language that is easy to build APIs with

- FastAPI - A high-performance web framework for building APIs with Python

### Database

- PostgreSQL - Open-source relational database with powerful extensions

### Storage

- MinIO - S3-compatible high-performance object storage

### OCR

- PaddleOCR - Pre-trained OCR model repository from Baidu for extracting text

### NLP

- PaddleNLP - Pre-trained NLP model repository from Baidu for text analysis

## File Structure

```markdown
DocOcrCategorizer
- frontend
- backend
- model
- README.md
```
