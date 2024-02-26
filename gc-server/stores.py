from typing import List
from langchain.schema.document import Document
from langchain_community.document_loaders import PyPDFLoader

class DocStore:
    paths: List[str] = []
    docs: List[Document] = []

    def __init__(self, paths: List[str] = []):
        self.paths = paths
        self.docs = []
        self.load_docs(paths)

    def load_docs(self, paths: List[str]):
        for path in paths:
            loader = PyPDFLoader(path)
            docs = loader.load()
            for doc in docs:
                self.docs.append(doc)

    def __str__(self):
        output = ""
        for doc in self.docs:
            doc_str = f"File: {doc.metadata['source']}\nPage: {doc.metadata['page'] + 1}\nContent: {doc.page_content}\n\n"
            output += doc_str
        return output

class TextStore:
    name: str = ""
    docs: List[Document] = []

    def __init__(self, name: str, text: str):
        self.docs = []
        self.name = name
        self.load_docs_from_text(text)

    def load_docs_from_text(self, text: str):
        self.docs = [Document(page_content=text, metadata={ "page": 1 })]

    def __str__(self):
        output = ""
        for doc in self.docs:
            doc_str = f"Source: Transcription {self.name}\nPage: {doc.metadata['page'] + 1}\nContent: {doc.page_content}\n\n"
            output += doc_str
        return output

if __name__ == "__main__":
    paths = ["https://firebasestorage.googleapis.com/v0/b/omnistudy-test.appspot.com/o/assignments%2F41ffe5b5-8d48-4f65-b08d-edfe2aa8595f%2FAssignment-3-Spring2024.pdf?alt=media&token=b791f1fe-f01d-4d6c-a51c-56e0f3c764cf"]
    docstore = DocStore(paths)
    print(docstore)