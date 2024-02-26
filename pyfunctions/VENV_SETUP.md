# Setting up the venv on GC Compute Engine

## 1. Install virtual env
```bash
sudo apt install python3.11-venv
```

## 2. Create virtual env
```bash
python3.11 -m venv venv
```

## 3. Activate the virtual env
```bash
source venv/bin/activate
```

## 4. Install the required packages
```bash
# Install dotenv and pinecone
pip install python-dotenv
pip install pinecone-client

# Run the following commands to avoid haystack errors
sudo apt-get install libjpeg-dev zlib1g-dev
pip3 install Pillow
pip install Pillow
pip install -U setuptools

# Install haystack
pip install 'farm-haystack[colab, ocr, pinecone, preprocessing, file-conversion, pdf]'
pip install 'farm-haystack[inference]'
``` 