import base64
import os
import sys
import tempfile
import zipfile
import io
import subprocess

def run():
    with open('text2qti_single.pyz', 'rb') as f:
        data = f.read()
    
    encoded = base64.b64encode(data).decode('ascii')
    
    script_content = f"""#!/usr/bin/env python3
import base64
import tempfile
import os
import sys
import subprocess

# This is a base64 encoded zipapp of the text2qti package
PAYLOAD = "{encoded}"

def main():
    with tempfile.NamedTemporaryFile(suffix=".pyz", delete=False) as tf:
        tf.write(base64.b64decode(PAYLOAD))
        tf.flush()
        zipapp_path = tf.name
    
    try:
        sys.exit(subprocess.call([sys.executable, zipapp_path] + sys.argv[1:]))
    finally:
        try:
            os.remove(zipapp_path)
        except OSError:
            pass

if __name__ == '__main__':
    main()
"""
    with open('text2qti_standalone.py', 'w') as f:
        f.write(script_content)

if __name__ == '__main__':
    run()
