from chat import Chat
from stores import TextStore

class Formatter(Chat):
    def __init__(self, docs):
        prompt_template = """
            Given the following text given from a transcription: 
            {context}

            Format the text into a readable format with headers, subheaders, etc. Try to 
            make the resulting format use as many words as possible from the resulting 
            text (do not change the wording too much).
        """
        super().__init__(prompt_template, docs)
    
# Example usage
if __name__ == "__main__":
    textstore = TextStore("testing", "Today we are going to cover semaphores. They are used for concurrency control.")
    docs = textstore.docs
    chat = Formatter(docs)
    print(chat.run()['output_text'])
