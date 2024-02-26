# Imports
from typing import List
from stores import DocStore
from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.schema.document import Document
from langchain.chains.combine_documents.stuff import StuffDocumentsChain

class Chat:
    """ This class represents a chat request to the OpenAI LLM. """
    prompt_template: str = ""
    docs: List[Document] = []

    def __init__(self, prompt_template: str, docs: List[Document]):
        """Initialize the prompt_template and docs"""
        self.prompt_template = prompt_template
        self.docs = docs

    def run(self):
        """Using the prompt template, run the StuffChain with the ChatOpenAI LLM and return the answer."""
        prompt = PromptTemplate.from_template(self.prompt_template)
        llm = ChatOpenAI(openai_api_key="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")
        llm_chain = LLMChain(prompt=prompt, llm=llm)
        stuff_chain = StuffDocumentsChain(
            llm_chain=llm_chain,
            document_variable_name="context"
        )
        answer = stuff_chain.invoke(self.docs)
        return answer

# Example usage
if __name__ == "__main__":
    docs = DocStore(["https://firebasestorage.googleapis.com/v0/b/omnistudy-test.appspot.com/o/assignments%2F41ffe5b5-8d48-4f65-b08d-edfe2aa8595f%2FYour%20booking%20with%20'Mission%20Manor'%20-%20Bookeo.pdf?alt=media&token=02b2eead-b77c-42bd-bd6e-5c318f096cf3"]).docs
    chat = Chat("Given context: {context}. Answer the question: Tell me about this document", docs)
    print(chat.run()['output_text'])