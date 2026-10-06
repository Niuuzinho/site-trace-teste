#!/usr/bin/env python3
"""
Prepara uma imagem nova para o site: gera versões WebP em vários tamanhos dentro de assets/img/
e cadastra a imagem em _data/imagens.yml.

Uso (na pasta do site):
    python3 ferramentas/otimizar-imagens.py caminho/da/foto.jpg grupo/nome-da-imagem [larguras]

Exemplos:
    python3 ferramentas/otimizar-imagens.py ~/Downloads/maria.jpg membros/maria-silva 240,400
    python3 ferramentas/otimizar-imagens.py capa.png projetos/novo-projeto-capa 480,960,1600

Depois, no arquivo do projeto ou em _data/membros.yml, use o nome sem tamanho e sem .webp
(ex.: foto: membros/maria-silva).

Precisa de Python 3 com: pip install pillow pyyaml
"""
import os, sys
import yaml
from PIL import Image

def main():
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    origem, nome = sys.argv[1], sys.argv[2]
    pedidas = [int(x) for x in (sys.argv[3] if len(sys.argv) > 3 else "480,960,1600").split(",")]
    img = Image.open(origem); img.load()
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA" if "A" in img.mode or img.mode == "P" else "RGB")
    W, H = img.size
    larguras = sorted({w for w in pedidas if w < W} | {min(W, max(pedidas))})
    pasta = os.path.dirname(nome)
    os.makedirs(os.path.join("assets", "img", pasta), exist_ok=True)
    for w in larguras:
        h = round(H * w / W)
        r = img if w == W else img.resize((w, h), Image.LANCZOS)
        r.save(os.path.join("assets", "img", f"{nome}-{w}.webp"), "WEBP", quality=80, method=6)   # sem metadados
    caminho = os.path.join("_data", "imagens.yml")
    dados = yaml.safe_load(open(caminho, encoding="utf-8")) or {}
    dados[nome] = {"w": larguras[-1], "h": round(H * larguras[-1] / W), "ws": larguras}
    yaml.safe_dump(dados, open(caminho, "w", encoding="utf-8"), sort_keys=True, allow_unicode=True, default_flow_style=None)
    print(f"Pronto: {nome} ({', '.join(map(str, larguras))} px). Use '{nome}' nos arquivos do site.")

if __name__ == "__main__":
    main()
