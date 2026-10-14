import os
from PIL import Image, ImageDraw, ImageFont

def generate_icons():
    os.makedirs("icons", exist_ok=True)
    print("Generating PWA icons...")

    # Sizes needed for PWA
    sizes = [
        ("icon-192.png", 192, False),
        ("icon-512.png", 512, False),
        ("icon-maskable-192.png", 192, True),
        ("icon-maskable-512.png", 512, True),
        ("apple-touch-icon.png", 180, False),
        ("favicon-32x32.png", 32, False),
        ("favicon-16x16.png", 16, False),
    ]

    for filename, size, maskable in sizes:
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)

        # Background gradient / solid color
        bg_color = (15, 23, 42, 255) # deep slate blue #0f172a
        accent_color = (59, 130, 246, 255) # primary blue #3b82f6
        glow_color = (99, 102, 241, 255) # indigo glow

        if maskable:
            # Maskable icons fill entire square
            draw.rectangle([0, 0, size, size], fill=bg_color)
            # Inner circle
            pad = int(size * 0.15)
            draw.ellipse([pad, pad, size - pad, size - pad], fill=accent_color)
        else:
            # Standard icons with rounded corners
            r = int(size * 0.22)
            draw.rounded_rectangle([0, 0, size, size], radius=r, fill=bg_color)
            # Inner rounded accent
            inner_pad = int(size * 0.08)
            inner_r = int(size * 0.18)
            draw.rounded_rectangle([inner_pad, inner_pad, size - inner_pad, size - inner_pad], radius=inner_r, fill=accent_color)

        # Draw stylized "F" or Flask icon in center
        center_x = size / 2
        center_y = size / 2

        # Draw a bold letter "F" or flask beaker silhouette
        # Let's draw an elegant Flask/Beaker silhouette
        b_top = int(size * 0.28)
        b_bottom = int(size * 0.72)
        b_width_top = int(size * 0.18)
        b_width_bottom = int(size * 0.50)

        # Beaker neck
        neck_left = center_x - b_width_top / 2
        neck_right = center_x + b_width_top / 2
        neck_bottom = center_x - b_width_top / 2 + int(size * 0.16)

        # Draw stylized lightning flash or beaker
        poly = [
            (neck_left, b_top),
            (neck_right, b_top),
            (neck_right, neck_bottom),
            (center_x + b_width_bottom / 2, b_bottom),
            (center_x - b_width_bottom / 2, b_bottom),
            (neck_left, neck_bottom),
        ]
        draw.polygon(poly, fill=(255, 255, 255, 255))

        # Draw bubbles inside liquid
        liquid_top = int(b_bottom - (b_bottom - neck_bottom) * 0.55)
        liquid_poly = [
            (center_x - b_width_bottom * 0.38, b_bottom - int(size * 0.04)),
            (center_x + b_width_bottom * 0.38, b_bottom - int(size * 0.04)),
            (center_x + b_width_bottom * 0.24, liquid_top),
            (center_x - b_width_bottom * 0.24, liquid_top),
        ]
        draw.polygon(liquid_poly, fill=glow_color)

        # Draw bubble dots
        dot_r = max(2, int(size * 0.035))
        draw.ellipse([center_x - dot_r, liquid_top + dot_r, center_x + dot_r, liquid_top + 3 * dot_r], fill=(255, 255, 255, 230))
        dot2_r = max(1, int(size * 0.022))
        draw.ellipse([center_x + int(size * 0.08), liquid_top + 3 * dot_r, center_x + int(size * 0.08) + 2 * dot2_r, liquid_top + 5 * dot_r], fill=(255, 255, 255, 200))

        filepath = os.path.join("icons", filename)
        img.save(filepath, "PNG", optimize=True)
        print(f"Created: {filepath} ({size}x{size})")

    # Generate crisp SVG icon
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#3b82f6" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="115" fill="url(#bgGrad)"/>
  <rect x="36" y="36" width="440" height="440" rx="95" fill="none" stroke="#334155" stroke-width="4"/>
  
  <g filter="url(#shadow)">
    <!-- Flask Beaker Outline -->
    <path d="M 216 130 L 296 130 L 296 210 L 390 370 A 24 24 0 0 1 370 404 L 142 404 A 24 24 0 0 1 122 370 L 216 210 Z" fill="#ffffff"/>
    
    <!-- Liquid -->
    <path d="M 166 330 C 210 320, 302 345, 346 330 L 370 380 A 16 16 0 0 1 356 394 L 156 394 A 16 16 0 0 1 142 380 Z" fill="url(#liquidGrad)"/>
    
    <!-- Bubbles -->
    <circle cx="236" cy="350" r="14" fill="#ffffff" opacity="0.85"/>
    <circle cx="286" cy="336" r="10" fill="#ffffff" opacity="0.8"/>
    <circle cx="256" cy="305" r="7" fill="#ffffff" opacity="0.9"/>
    
    <!-- Lip / Rim -->
    <rect x="204" y="118" width="104" height="18" rx="9" fill="#ffffff"/>
  </g>
</svg>'''
    with open("icons/icon.svg", "w", encoding="utf-8") as f:
        f.write(svg_content)
    print("Created: icons/icon.svg")

if __name__ == "__main__":
    generate_icons()
