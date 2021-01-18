import * as parser from 'fast-xml-parser'
import * as he from 'he'

const options = {
  attributeNamePrefix: '@_',
  attrNodeName: false, //'attr', //default is 'false'
  textNodeName: '#text',
  ignoreAttributes: true,
  ignoreNameSpace: true,
  allowBooleanAttributes: true,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: false, //'__cdata', //default is 'false'
  cdataPositionChar: '\\c',
  parseTrueNumberOnly: false,
  arrayMode: false, //"strict"
  attrValueProcessor: (val: string, attrName: string) => he.decode(val, { isAttributeValue: true }), //default is a=>a
  tagValueProcessor: (val: string, tagName: string) => he.decode(val), //default is a=>a
  stopNodes: ['parse-me-as-string'],
}
const xml2json = (xmlData: string) =>
  parser.validate(xmlData) === true ? parser.parse(xmlData, <any>options) : null

export default xml2json
