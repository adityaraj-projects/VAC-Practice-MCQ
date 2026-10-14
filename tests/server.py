import http.server
import socketserver
import os

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class ThreadedHTTPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True

with ThreadedHTTPServer(('127.0.0.1', 8080), Handler) as httpd:
    print("Serving HTTP on 127.0.0.1:8080 multithreaded without cache...")
    httpd.serve_forever()
