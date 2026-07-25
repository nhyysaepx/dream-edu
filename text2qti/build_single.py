import stickytape
output = stickytape.script("text2qti/cmdline.py", add_dir=["."])
with open("single_text2qti.py", "w") as f:
    f.write(output)
