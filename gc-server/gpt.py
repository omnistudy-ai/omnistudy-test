from chat import Chat
from stores import DocStore

class GPT(Chat):
    def __init__(self, docs, question):
        prompt_template = """
            Given the following context: 
            {context}
            Answer the following question:\n
        """ + str(question)
        super().__init__(prompt_template, docs)
    
# Example usage
if __name__ == "__main__":
    docs = DocStore(["https://firebasestorage.googleapis.com/v0/b/omnistudy-test.appspot.com/o/assignments%2F41ffe5b5-8d48-4f65-b08d-edfe2aa8595f%2FYour%20booking%20with%20'Mission%20Manor'%20-%20Bookeo.pdf?alt=media&token=02b2eead-b77c-42bd-bd6e-5c318f096cf3"]).docs
    chat = GPT(docs, question="When did I go to Mission Manor?")
    print(chat.run()['output_text'])
