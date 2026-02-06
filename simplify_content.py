import json

# Read the file
with open('.depraciated/products/a-series.json', 'r') as f:
    data = json.load(f)

# Find and transform the content block with "type": "basic"
for i, block in enumerate(data['layout']):
    if block.get('blockType') == 'content' and 'type' in block and block['type'] == 'basic':
        # Extract data from columns
        if 'columns' in block and len(block['columns']) > 0:
            col = block['columns'][0]
            
            # Create new structure
            new_block = {}
            
            # Add locale-based title and content
            if 'title' in col:
                for locale in col['title']:
                    if locale not in new_block:
                        new_block[locale] = {}
                    new_block[locale]['title'] = col['title'][locale]
            
            if 'content' in col:
                for locale in col['content']:
                    if locale not in new_block:
                        new_block[locale] = {}
                    new_block[locale]['content'] = col['content'][locale]
            
            # Add media if present
            if 'media' in col:
                new_block['media'] = col['media']
            
            # Add link if present
            if 'link' in col:
                new_block['link'] = col['link']
            
            # Preserve block metadata
            new_block['id'] = block.get('id')
            new_block['blockName'] = block.get('blockName')
            new_block['blockType'] = block.get('blockType')
            
            # Replace the block
            data['layout'][i] = new_block

# Write back to file
with open('.depraciated/products/a-series.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Successfully simplified content blocks!")
