from zipfile import ZipFile, ZIP_DEFLATED
from datetime import datetime
from xml.sax.saxutils import escape
from pathlib import Path

output_path = Path('mekdes_certificate.docx')

paragraphs = [
    ('MINISTRY OF EDUCATION', 'title'),
    ('NATIONAL AGENCY FOR EXAMINATIONS (NAE)', 'title'),
    ('The Ethiopian General Secondary Education Certificate', 'subtitle'),
    ('MEKDES BIRHANU AKELE', 'name'),
    ('This is to certify that 10 (TEN) subjects in the 2011 (E.C.) / 2018 (G.C.)', 'body'),
    ('Examination session and has earned the following grade(s) in 10 (TEN) subject(s).', 'body'),
    ('Amharic  A       English  A', 'body'),
    ('Mathematics  A       Physics  B', 'body'),
    ('Chemistry  A         Biology  A', 'body'),
    ('Civics  A            Geography  A', 'body'),
    ('History  A           Afan Oromo  C', 'body'),
    ('** VERY GREAT DISTINCTION **', 'heading'),
    ('By virtue of which, this certificate is awarded with distinction.', 'body'),
    ('Distinction: 4 A\'s    Great Distinction: 5 A\'s', 'body'),
    ('Very Great Distinction: 6 A\'s and above', 'body'),
    ('This certificate is invalid unless it bears the NAE seal on the photograph of the candidate.', 'body'),
    ('No 159135', 'serial'),
]

styles_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Title">
    <w:name w:val="Title"/>
    <w:basedOn w:val="Normal"/>
    <w:qFormat/>
    <w:rPr><w:b/><w:sz w:val="32"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading"/>
    <w:basedOn w:val="Normal"/>
    <w:qFormat/>
    <w:rPr><w:b/><w:sz w:val="24"/></w:rPr>
  </w:style>
</w:styles>
'''

def paragraph_xml(text, kind='body'):
    if kind == 'title':
        xml = '<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="28"/></w:rPr><w:t>' + escape(text) + '</w:t></w:r></w:p>'
    elif kind == 'subtitle':
        xml = '<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:i/><w:sz w:val="24"/></w:rPr><w:t>' + escape(text) + '</w:t></w:r></w:p>'
    elif kind == 'name':
        xml = '<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="26"/></w:rPr><w:t>' + escape(text) + '</w:t></w:r></w:p>'
    elif kind == 'heading':
        xml = '<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="C00000"/><w:sz w:val="26"/></w:rPr><w:t>' + escape(text) + '</w:t></w:r></w:p>'
    elif kind == 'serial':
        xml = '<w:p><w:pPr><w:jc w:val="right"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="C00000"/><w:sz w:val="22"/></w:rPr><w:t>' + escape(text) + '</w:t></w:r></w:p>'
    else:
        xml = '<w:p><w:r><w:t>' + escape(text) + '</w:t></w:r></w:p>'
    return xml

body_xml = ''.join(paragraph_xml(text, kind) for text, kind in paragraphs)

document_xml = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 w15 wp14">
  <w:body>
    {body_xml}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>
'''

content_types_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
'''

rels_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
'''

app_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Microsoft Office Word</Application>
</Properties>
'''

core_xml = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Mekdes Birhanu Akele - Certificate</dc:title>
  <dc:creator>GitHub Copilot</dc:creator>
  <cp:lastModifiedBy>GitHub Copilot</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">{datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">{datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')}</dcterms:modified>
</cp:coreProperties>
'''

with ZipFile(output_path, 'w', ZIP_DEFLATED) as zf:
    zf.writestr('[Content_Types].xml', content_types_xml)
    zf.writestr('_rels/.rels', rels_xml)
    zf.writestr('docProps/core.xml', core_xml)
    zf.writestr('docProps/app.xml', app_xml)
    zf.writestr('word/document.xml', document_xml)
    zf.writestr('word/styles.xml', styles_xml)

print(f'Created {output_path.resolve()}')
