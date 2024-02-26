from http.server import BaseHTTPRequestHandler, HTTPServer
import datetime

from Processor import Processor

port = 8000

class myHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path == '/time':
            self.do_time()
        elif self.path == '/date':
            self.do_date()
        elif '/process' in self.path:
            param_string = self.path.split('?')[1]
            params_kvs = param_string.split('&')
            params = {}
            for kv in params_kvs:
                k, v = kv.split('=')
                params[k] = v
            self.do_process(params)

    def do_time(self):
        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.end_headers()
        # Send the html message
        self.wfile.write(b"<b> Hello World!</b><br>Current time: " + str(datetime.datetime.now()).encode("utf-8"))

    def do_date(self):
        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.end_headers()
        # Send the html message
        self.wfile.write(b"<b> Hello World!</b><br>Current date: " + str(datetime.date.today()).encode("utf-8"))

    def do_process(self, params):
        if False:#params.get('path') == None or params.get('namespace') == None:
            self.send_response(400)
            self.send_header('Content-type','text/html')
            self.end_headers()
            self.wfile.write(b"Invalid parameters")
            return
        else:
            self.send_response(200)
            self.send_header('Content-type','text/html')
            self.end_headers()

            # Get params
            path = params.get('path')
            namespace = params.get('namespace')
            print(f"Downloading .pdf file from {path}")
            import os
            os.system(f"curl -O {path}")
            os.system("ls -l")

            # Call the Processor
            #processor = Processor()
            #processor.upload(path, namespace)

            # Send the html message
            self.wfile.write(b"Process function called with path " + path.encode("utf-8") + b" and namespace " + namespace.encode("utf-8"))

server = HTTPServer(('', port), myHandler)
print('Started httpserver on port', port)

#Wait forever for incoming http requests
server.serve_forever()