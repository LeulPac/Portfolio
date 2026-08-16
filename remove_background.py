import os
from dotenv import load_dotenv
from PIL import Image
import cloudinary
import cloudinary.uploader
import psycopg2
import json

# Load environment variables
load_dotenv(dotenv_path='./server/.env')

cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME', 'wgqurwpx')
api_key = os.getenv('CLOUDINARY_API_KEY', '647274971964354')
api_secret = os.getenv('CLOUDINARY_API_SECRET', 'O31_g50JupmlYyJqjnkv_Cm-yas')
db_url = os.getenv('DATABASE_URL')

cloudinary.config(
    cloud_name=cloud_name,
    api_key=api_key,
    api_secret=api_secret
)

def process_image():
    input_path = 'client/public/image.png'
    output_path = 'client/public/profile-transparent.png'
    
    print(f"Reading input image: {input_path}")
    
    try:
        from rembg import remove
        with open(input_path, 'rb') as i:
            with open(output_path, 'wb') as o:
                input_bytes = i.read()
                output_bytes = remove(input_bytes)
                o.write(output_bytes)
        print(f"Successfully removed background using rembg AI! Output saved to: {output_path}")
    except Exception as e:
        print(f"rembg error: {e}, falling back to PIL alpha mask...")
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        newData = []
        # Sample background color near top corners (grey wall/office background)
        for item in datas:
            # item is (R, G, B, A)
            r, g, b, a = item
            # Background is greyish office setup (r ~ g ~ b in 100-180 range, low saturation)
            is_grey = (abs(r - g) < 25 and abs(g - b) < 25 and r > 80 and r < 200)
            if is_grey:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"PIL mask generated: {output_path}")

    # Upload transparent PNG to Cloudinary
    print("Uploading transparent PNG to Cloudinary...")
    res = cloudinary.uploader.upload(
        output_path,
        folder='leul_portfolio',
        public_id='leul_mengesha_transparent_portrait',
        overwrite=True,
        invalidate=True
    )
    
    secure_url = res.get('secure_url')
    print(f"Cloudinary Transparent URL: {secure_url}")
    
    # Update database via psycopg2
    if db_url:
        print("Updating Neon PostgreSQL database site_config...")
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        cur.execute("SELECT value FROM \"Setting\" WHERE key = 'site_config';")
        row = cur.fetchone()
        
        current_config = {}
        if row and row[0]:
            try:
                current_config = json.loads(row[0])
            except Exception:
                pass
                
        current_config['avatarUrl'] = secure_url
        
        updated_json = json.dumps(current_config)
        
        cur.execute("""
            INSERT INTO "Setting" (id, key, value, "updatedAt")
            VALUES (gen_random_uuid(), 'site_config', %s, NOW())
            ON CONFLICT (key) DO UPDATE SET value = %s, "updatedAt" = NOW();
        """, (updated_json, updated_json))
        
        conn.commit()
        cur.close()
        conn.close()
        print("Database updated successfully!")

if __name__ == '__main__':
    process_image()
