import os
import sys
import json
import pathlib
import webbrowser
import threading
import time
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from text2qti.quiz import Quiz
from text2qti.qti import QTI
from text2qti.config import Config
from text2qti.err import Text2qtiError

if getattr(sys, 'frozen', False):
    WEB_DIR = os.path.join(sys._MEIPASS, 'web')
else:
    WEB_DIR = os.path.join(os.path.dirname(__file__), 'web')


active_connections = 0
last_active_time = time.time()

class APIHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEB_DIR, **kwargs)

    def log_message(self, format, *args):
        pass  # Disable logging to avoid console spam

    def do_GET(self):
        global active_connections, last_active_time
        if self.path == '/api/events':
            self.send_response(200)
            self.send_header('Content-type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'keep-alive')
            self.end_headers()
            
            active_connections += 1
            try:
                while True:
                    self.wfile.write(b": keepalive\n\n")
                    self.wfile.flush()
                    time.sleep(2)
            except Exception:
                pass
            finally:
                active_connections -= 1
                last_active_time = time.time()
            return
            
        super().do_GET()

    def do_POST(self):
        if self.path == '/api/convert':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            filename = data.get('filename')
            text_content = data.get('content')
            
            # If the user uploaded an RTF file, convert it to plain text first
            if filename.lower().endswith('.rtf'):
                try:
                    from striprtf.striprtf import rtf_to_text
                    text_content = rtf_to_text(text_content)
                except ImportError:
                    response = {"success": False, "message": "Error: 'striprtf' module is missing. Please run 'pip install striprtf' in your terminal."}
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps(response).encode('utf-8'))
                    return
            
            try:
                config = Config()
                config.load()
                if not config.loaded_config_file:
                    config['latex_render_url'] = "/equation_images/"
                
                quiz = Quiz(text_content, config=config, source_name=filename)
                qti = QTI(quiz)
                
                downloads_path = os.path.join(pathlib.Path.home(), 'Downloads')
                base_name = os.path.splitext(filename)[0]
                qti_path = os.path.join(downloads_path, f"{base_name}.zip")
                qti.save(qti_path)
                
                response = {"success": True, "message": f"Success! File saved as:\n{qti_path}"}
            except Text2qtiError as e:
                response = {"success": False, "message": f"Error: {str(e)}"}
            except Exception as e:
                response = {"success": False, "message": f"Unexpected error: {str(e)}"}
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            self.send_error(404, "Not Found")

class ReusableThreadingServer(ThreadingHTTPServer):
    allow_reuse_address = True

def start_server_loop(server):
    server.serve_forever()

def monitor_connections():
    # Wait 10 seconds initially for the browser to open and load the page
    time.sleep(10)
    while True:
        # If no active connections and 5 seconds have passed since the last one closed
        if active_connections == 0 and (time.time() - last_active_time > 5):
            import os
            os._exit(0)
        time.sleep(1)

if __name__ == '__main__':
    # Bind server synchronously to guarantee the port is ready
    server = ReusableThreadingServer(('127.0.0.1', 8080), APIHandler)
    
    # Start web server loop in background
    threading.Thread(target=start_server_loop, args=(server,), daemon=True).start()
    
    # Start heartbeat monitor
    threading.Thread(target=monitor_connections, daemon=True).start()
    
    # Open default browser
    webbrowser.open('http://127.0.0.1:8080/')
    
    # Keep main thread alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        pass
