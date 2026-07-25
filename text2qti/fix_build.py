import base64
import os
import shutil
import subprocess
import zipfile

def run():
    build_dir = "build_temp"
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir)
    os.makedirs(os.path.join(build_dir, "text2qti"))
    
    # Copy files
    for f in os.listdir("text2qti"):
        src = os.path.join("text2qti", f)
        dst = os.path.join(build_dir, "text2qti", f)
        if os.path.isfile(src):
            shutil.copy2(src, dst)
        elif os.path.isdir(src):
            shutil.copytree(src, dst)
            
    # Create zipapp
    subprocess.run(["python3", "-m", "zipapp", build_dir, "-m", "text2qti.cmdline:main", "-o", "text2qti_fixed.pyz"])
    
    with open('text2qti_fixed.pyz', 'rb') as f:
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
        
    shutil.rmtree(build_dir)
    os.remove("text2qti_fixed.pyz")

if __name__ == '__main__':
    run()
