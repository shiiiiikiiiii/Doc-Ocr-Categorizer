import asyncio
from concurrent.futures import ThreadPoolExecutor
import os

import torch
from transformers import AutoTokenizer, AutoModel
from torch.nn.functional import normalize

# Class to manage shared tokenizer and model
class SharedResources:
    def __init__(self, model_path):
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModel.from_pretrained(model_path)

    def get_tokenizer(self):
        return self.tokenizer

    def get_model(self):
        return self.model

# Instance of shared resource
file_dir = os.path.dirname(os.path.abspath(__file__))
model_location = os.path.join(file_dir, "multilingual-e5-large-instruct")
shared_resources = SharedResources(model_location)

# helper functions
def average_pool(last_hidden_states: torch.Tensor, attention_mask: torch.Tensor) -> torch.Tensor:
    last_hidden = last_hidden_states.masked_fill(~attention_mask[..., None].bool(), 0.0)
    return last_hidden.sum(dim=1) / attention_mask.sum(dim=1)[..., None]


def get_detailed_instruct(task_description: str, query: str) -> str:
    return f'Instruct: {task_description}\nQuery: {query}'


# Async function, using thread pool
async def generate_text_vector_async(task: str, instruct: str, document: str) -> torch.Tensor:
    loop = asyncio.get_running_loop()
    executor = ThreadPoolExecutor(max_workers=1)  # Maximum 1 worker, because we just use thread pool to share resource

    # Sync function, which will use shared resources
    def sync_generate_text_vector(task, instruct, document, shared_resources):
        tokenizer = shared_resources.get_tokenizer()
        model = shared_resources.get_model()

        query = [get_detailed_instruct(task, instruct)]
        input_texts = query + [document]

        batch_dict = tokenizer(input_texts, max_length=512, padding=True, truncation=True, return_tensors='pt')
        outputs = model(**batch_dict)
        pooled_output = average_pool(outputs.last_hidden_state, batch_dict['attention_mask'])
        vector = normalize(pooled_output, p=2, dim=1)
        
        return vector

    # Run sync function in thread pool
    vector = await loop.run_in_executor(executor, sync_generate_text_vector, task, instruct, document, shared_resources)

    return vector

if __name__ == "__main__":
    # example
    task = 'Given a web search query, retrieve relevant passages that answer the query'
    instruct = 'how much protein should a female eat'
    document = 'As a general guideline, the CDC recommends 46 grams of protein per day for adult women.'

    async def main():
        vector = await generate_text_vector_async(task, instruct, document)
        print(vector)

    asyncio.run(main())