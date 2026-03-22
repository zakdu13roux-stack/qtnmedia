import os
from PIL import Image

# Répertoires
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES_DIR = os.path.join(BASE_DIR, 'assets', 'images_dessins')
THUMBS_DIR = os.path.join(IMAGES_DIR, 'thumbs')

# Paramètres miniatures
THUMB_WIDTH = 500
THUMB_QUALITY = 90

# Extensions supportées
EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']

def is_image(filename):
    return any(filename.endswith(ext) for ext in EXTENSIONS)

def make_thumbnail(image_path, thumb_path):
    with Image.open(image_path) as img:
        # Convertir en RGB pour JPEG
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        w, h = img.size
        if w > THUMB_WIDTH:
            ratio = THUMB_WIDTH / float(w)
            new_size = (THUMB_WIDTH, int(h * ratio))
            img = img.resize(new_size, Image.LANCZOS)
        img.save(thumb_path, 'JPEG', quality=THUMB_QUALITY, optimize=True)

def main():
    if not os.path.exists(THUMBS_DIR):
        os.makedirs(THUMBS_DIR)
    for filename in os.listdir(IMAGES_DIR):
        if not is_image(filename):
            continue
        src = os.path.join(IMAGES_DIR, filename)
        name, _ = os.path.splitext(filename)
        thumb_name = f"{name}.jpg"
        dst = os.path.join(THUMBS_DIR, thumb_name)
        if os.path.exists(dst):
            print(f"[SKIP] {thumb_name} existe déjà.")
            continue
        try:
            make_thumbnail(src, dst)
            print(f"[OK] {thumb_name}")
        except Exception as e:
            print(f"[ERREUR] {filename}: {e}")

if __name__ == '__main__':
    main()
