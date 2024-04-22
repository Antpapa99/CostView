import requests
import json


base_url = 'https://catalog.skl.se/rowstore/dataset/4c544014-8e8f-4832-ab8e-6e787d383752?_limit=500&_offset=0'

response = requests.get(base_url)
results = response.json()


# Extracting every 'kommun' parameter
commune_pop = []

for kommun in results["results"]:
    commune_pop.append({"commune_name": kommun["kommun"].replace("å", "a").replace("ö", "o").replace("ä","a").replace("Å", "A").replace("Ö", "O").replace("Ä","A").replace(" ", "-"), "population": int(kommun["antal invånare"]), "group": kommun["kommungrupp 2023"]})
    

with open("data/kommunpopgrupp.json", "w", encoding='utf-8') as outfile:
        json.dump(commune_pop, outfile, indent=2, ensure_ascii=False)
