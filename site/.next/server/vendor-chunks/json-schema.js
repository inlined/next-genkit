/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/json-schema";
exports.ids = ["vendor-chunks/json-schema"];
exports.modules = {

/***/ "(rsc)/./node_modules/json-schema/lib/validate.js":
/*!**************************************************!*\
  !*** ./node_modules/json-schema/lib/validate.js ***!
  \**************************************************/
/***/ (function(module, exports) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\r\n * JSONSchema Validator - Validates JavaScript objects using JSON Schemas\r\n *\t(http://www.json.com/json-schema-proposal/)\r\n * Licensed under AFL-2.1 OR BSD-3-Clause\r\nTo use the validator call the validate function with an instance object and an optional schema object.\r\nIf a schema is provided, it will be used to validate. If the instance object refers to a schema (self-validating),\r\nthat schema will be used to validate and the schema parameter is not necessary (if both exist,\r\nboth validations will occur).\r\nThe validate method will return an array of validation errors. If there are no errors, then an\r\nempty list will be returned. A validation error will have two properties:\r\n\"property\" which indicates which property had the error\r\n\"message\" which indicates what the error was\r\n */\r\n(function (root, factory) {\r\n    if (true) {\r\n        // AMD. Register as an anonymous module.\r\n        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {\r\n            return factory();\r\n        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\r\n    } else {}\r\n}(this, function () {// setup primitive classes to be JSON Schema types\r\nvar exports = validate\r\nexports.Integer = {type:\"integer\"};\r\nvar primitiveConstructors = {\r\n\tString: String,\r\n\tBoolean: Boolean,\r\n\tNumber: Number,\r\n\tObject: Object,\r\n\tArray: Array,\r\n\tDate: Date\r\n}\r\nexports.validate = validate;\r\nfunction validate(/*Any*/instance,/*Object*/schema) {\r\n\t\t// Summary:\r\n\t\t//  \tTo use the validator call JSONSchema.validate with an instance object and an optional schema object.\r\n\t\t// \t\tIf a schema is provided, it will be used to validate. If the instance object refers to a schema (self-validating),\r\n\t\t// \t\tthat schema will be used to validate and the schema parameter is not necessary (if both exist,\r\n\t\t// \t\tboth validations will occur).\r\n\t\t// \t\tThe validate method will return an object with two properties:\r\n\t\t// \t\t\tvalid: A boolean indicating if the instance is valid by the schema\r\n\t\t// \t\t\terrors: An array of validation errors. If there are no errors, then an\r\n\t\t// \t\t\t\t\tempty list will be returned. A validation error will have two properties:\r\n\t\t// \t\t\t\t\t\tproperty: which indicates which property had the error\r\n\t\t// \t\t\t\t\t\tmessage: which indicates what the error was\r\n\t\t//\r\n\t\treturn validate(instance, schema, {changing: false});//, coerce: false, existingOnly: false});\r\n\t};\r\nexports.checkPropertyChange = function(/*Any*/value,/*Object*/schema, /*String*/property) {\r\n\t\t// Summary:\r\n\t\t// \t\tThe checkPropertyChange method will check to see if an value can legally be in property with the given schema\r\n\t\t// \t\tThis is slightly different than the validate method in that it will fail if the schema is readonly and it will\r\n\t\t// \t\tnot check for self-validation, it is assumed that the passed in value is already internally valid.\r\n\t\t// \t\tThe checkPropertyChange method will return the same object type as validate, see JSONSchema.validate for\r\n\t\t// \t\tinformation.\r\n\t\t//\r\n\t\treturn validate(value, schema, {changing: property || \"property\"});\r\n\t};\r\nvar validate = exports._validate = function(/*Any*/instance,/*Object*/schema,/*Object*/options) {\r\n\r\n\tif (!options) options = {};\r\n\tvar _changing = options.changing;\r\n\r\n\tfunction getType(schema){\r\n\t\treturn schema.type || (primitiveConstructors[schema.name] == schema && schema.name.toLowerCase());\r\n\t}\r\n\tvar errors = [];\r\n\t// validate a value against a property definition\r\n\tfunction checkProp(value, schema, path,i){\r\n\r\n\t\tvar l;\r\n\t\tpath += path ? typeof i == 'number' ? '[' + i + ']' : typeof i == 'undefined' ? '' : '.' + i : i;\r\n\t\tfunction addError(message){\r\n\t\t\terrors.push({property:path,message:message});\r\n\t\t}\r\n\r\n\t\tif((typeof schema != 'object' || schema instanceof Array) && (path || typeof schema != 'function') && !(schema && getType(schema))){\r\n\t\t\tif(typeof schema == 'function'){\r\n\t\t\t\tif(!(value instanceof schema)){\r\n\t\t\t\t\taddError(\"is not an instance of the class/constructor \" + schema.name);\r\n\t\t\t\t}\r\n\t\t\t}else if(schema){\r\n\t\t\t\taddError(\"Invalid schema/property definition \" + schema);\r\n\t\t\t}\r\n\t\t\treturn null;\r\n\t\t}\r\n\t\tif(_changing && schema.readonly){\r\n\t\t\taddError(\"is a readonly field, it can not be changed\");\r\n\t\t}\r\n\t\tif(schema['extends']){ // if it extends another schema, it must pass that schema as well\r\n\t\t\tcheckProp(value,schema['extends'],path,i);\r\n\t\t}\r\n\t\t// validate a value against a type definition\r\n\t\tfunction checkType(type,value){\r\n\t\t\tif(type){\r\n\t\t\t\tif(typeof type == 'string' && type != 'any' &&\r\n\t\t\t\t\t\t(type == 'null' ? value !== null : typeof value != type) &&\r\n\t\t\t\t\t\t!(value instanceof Array && type == 'array') &&\r\n\t\t\t\t\t\t!(value instanceof Date && type == 'date') &&\r\n\t\t\t\t\t\t!(type == 'integer' && value%1===0)){\r\n\t\t\t\t\treturn [{property:path,message:value + \" - \" + (typeof value) + \" value found, but a \" + type + \" is required\"}];\r\n\t\t\t\t}\r\n\t\t\t\tif(type instanceof Array){\r\n\t\t\t\t\tvar unionErrors=[];\r\n\t\t\t\t\tfor(var j = 0; j < type.length; j++){ // a union type\r\n\t\t\t\t\t\tif(!(unionErrors=checkType(type[j],value)).length){\r\n\t\t\t\t\t\t\tbreak;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t\tif(unionErrors.length){\r\n\t\t\t\t\t\treturn unionErrors;\r\n\t\t\t\t\t}\r\n\t\t\t\t}else if(typeof type == 'object'){\r\n\t\t\t\t\tvar priorErrors = errors;\r\n\t\t\t\t\terrors = [];\r\n\t\t\t\t\tcheckProp(value,type,path);\r\n\t\t\t\t\tvar theseErrors = errors;\r\n\t\t\t\t\terrors = priorErrors;\r\n\t\t\t\t\treturn theseErrors;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\treturn [];\r\n\t\t}\r\n\t\tif(value === undefined){\r\n\t\t\tif(schema.required){\r\n\t\t\t\taddError(\"is missing and it is required\");\r\n\t\t\t}\r\n\t\t}else{\r\n\t\t\terrors = errors.concat(checkType(getType(schema),value));\r\n\t\t\tif(schema.disallow && !checkType(schema.disallow,value).length){\r\n\t\t\t\taddError(\" disallowed value was matched\");\r\n\t\t\t}\r\n\t\t\tif(value !== null){\r\n\t\t\t\tif(value instanceof Array){\r\n\t\t\t\t\tif(schema.items){\r\n\t\t\t\t\t\tvar itemsIsArray = schema.items instanceof Array;\r\n\t\t\t\t\t\tvar propDef = schema.items;\r\n\t\t\t\t\t\tfor (i = 0, l = value.length; i < l; i += 1) {\r\n\t\t\t\t\t\t\tif (itemsIsArray)\r\n\t\t\t\t\t\t\t\tpropDef = schema.items[i];\r\n\t\t\t\t\t\t\tif (options.coerce)\r\n\t\t\t\t\t\t\t\tvalue[i] = options.coerce(value[i], propDef);\r\n\t\t\t\t\t\t\terrors.concat(checkProp(value[i],propDef,path,i));\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t\tif(schema.minItems && value.length < schema.minItems){\r\n\t\t\t\t\t\taddError(\"There must be a minimum of \" + schema.minItems + \" in the array\");\r\n\t\t\t\t\t}\r\n\t\t\t\t\tif(schema.maxItems && value.length > schema.maxItems){\r\n\t\t\t\t\t\taddError(\"There must be a maximum of \" + schema.maxItems + \" in the array\");\r\n\t\t\t\t\t}\r\n\t\t\t\t}else if(schema.properties || schema.additionalProperties){\r\n\t\t\t\t\terrors.concat(checkObj(value, schema.properties, path, schema.additionalProperties));\r\n\t\t\t\t}\r\n\t\t\t\tif(schema.pattern && typeof value == 'string' && !value.match(schema.pattern)){\r\n\t\t\t\t\taddError(\"does not match the regex pattern \" + schema.pattern);\r\n\t\t\t\t}\r\n\t\t\t\tif(schema.maxLength && typeof value == 'string' && value.length > schema.maxLength){\r\n\t\t\t\t\taddError(\"may only be \" + schema.maxLength + \" characters long\");\r\n\t\t\t\t}\r\n\t\t\t\tif(schema.minLength && typeof value == 'string' && value.length < schema.minLength){\r\n\t\t\t\t\taddError(\"must be at least \" + schema.minLength + \" characters long\");\r\n\t\t\t\t}\r\n\t\t\t\tif(typeof schema.minimum !== 'undefined' && typeof value == typeof schema.minimum &&\r\n\t\t\t\t\t\tschema.minimum > value){\r\n\t\t\t\t\taddError(\"must have a minimum value of \" + schema.minimum);\r\n\t\t\t\t}\r\n\t\t\t\tif(typeof schema.maximum !== 'undefined' && typeof value == typeof schema.maximum &&\r\n\t\t\t\t\t\tschema.maximum < value){\r\n\t\t\t\t\taddError(\"must have a maximum value of \" + schema.maximum);\r\n\t\t\t\t}\r\n\t\t\t\tif(schema['enum']){\r\n\t\t\t\t\tvar enumer = schema['enum'];\r\n\t\t\t\t\tl = enumer.length;\r\n\t\t\t\t\tvar found;\r\n\t\t\t\t\tfor(var j = 0; j < l; j++){\r\n\t\t\t\t\t\tif(enumer[j]===value){\r\n\t\t\t\t\t\t\tfound=1;\r\n\t\t\t\t\t\t\tbreak;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t\tif(!found){\r\n\t\t\t\t\t\taddError(\"does not have a value in the enumeration \" + enumer.join(\", \"));\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\tif(typeof schema.maxDecimal == 'number' &&\r\n\t\t\t\t\t(value.toString().match(new RegExp(\"\\\\.[0-9]{\" + (schema.maxDecimal + 1) + \",}\")))){\r\n\t\t\t\t\taddError(\"may only have \" + schema.maxDecimal + \" digits of decimal places\");\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn null;\r\n\t}\r\n\t// validate an object against a schema\r\n\tfunction checkObj(instance,objTypeDef,path,additionalProp){\r\n\r\n\t\tif(typeof objTypeDef =='object'){\r\n\t\t\tif(typeof instance != 'object' || instance instanceof Array){\r\n\t\t\t\terrors.push({property:path,message:\"an object is required\"});\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\tfor(var i in objTypeDef){ \r\n\t\t\t\tif(objTypeDef.hasOwnProperty(i) && i != '__proto__' && i != 'constructor'){\r\n\t\t\t\t\tvar value = instance.hasOwnProperty(i) ? instance[i] : undefined;\r\n\t\t\t\t\t// skip _not_ specified properties\r\n\t\t\t\t\tif (value === undefined && options.existingOnly) continue;\r\n\t\t\t\t\tvar propDef = objTypeDef[i];\r\n\t\t\t\t\t// set default\r\n\t\t\t\t\tif(value === undefined && propDef[\"default\"]){\r\n\t\t\t\t\t\tvalue = instance[i] = propDef[\"default\"];\r\n\t\t\t\t\t}\r\n\t\t\t\t\tif(options.coerce && i in instance){\r\n\t\t\t\t\t\tvalue = instance[i] = options.coerce(value, propDef);\r\n\t\t\t\t\t}\r\n\t\t\t\t\tcheckProp(value,propDef,path,i);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t\tfor(i in instance){\r\n\t\t\tif(instance.hasOwnProperty(i) && !(i.charAt(0) == '_' && i.charAt(1) == '_') && objTypeDef && !objTypeDef[i] && additionalProp===false){\r\n\t\t\t\tif (options.filter) {\r\n\t\t\t\t\tdelete instance[i];\r\n\t\t\t\t\tcontinue;\r\n\t\t\t\t} else {\r\n\t\t\t\t\terrors.push({property:path,message:\"The property \" + i +\r\n\t\t\t\t\t\t\" is not defined in the schema and the schema does not allow additional properties\"});\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\tvar requires = objTypeDef && objTypeDef[i] && objTypeDef[i].requires;\r\n\t\t\tif(requires && !(requires in instance)){\r\n\t\t\t\terrors.push({property:path,message:\"the presence of the property \" + i + \" requires that \" + requires + \" also be present\"});\r\n\t\t\t}\r\n\t\t\tvalue = instance[i];\r\n\t\t\tif(additionalProp && (!(objTypeDef && typeof objTypeDef == 'object') || !(i in objTypeDef))){\r\n\t\t\t\tif(options.coerce){\r\n\t\t\t\t\tvalue = instance[i] = options.coerce(value, additionalProp);\r\n\t\t\t\t}\r\n\t\t\t\tcheckProp(value,additionalProp,path,i);\r\n\t\t\t}\r\n\t\t\tif(!_changing && value && value.$schema){\r\n\t\t\t\terrors = errors.concat(checkProp(value,value.$schema,path,i));\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn errors;\r\n\t}\r\n\tif(schema){\r\n\t\tcheckProp(instance,schema,'',_changing || '');\r\n\t}\r\n\tif(!_changing && instance && instance.$schema){\r\n\t\tcheckProp(instance,instance.$schema,'','');\r\n\t}\r\n\treturn {valid:!errors.length,errors:errors};\r\n};\r\nexports.mustBeValid = function(result){\r\n\t//\tsummary:\r\n\t//\t\tThis checks to ensure that the result is valid and will throw an appropriate error message if it is not\r\n\t// result: the result returned from checkPropertyChange or validate\r\n\tif(!result.valid){\r\n\t\tthrow new TypeError(result.errors.map(function(error){return \"for property \" + error.property + ': ' + error.message;}).join(\", \\n\"));\r\n\t}\r\n}\r\n\r\nreturn exports;\r\n}));\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvanNvbi1zY2hlbWEvbGliL3ZhbGlkYXRlLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLElBQTBDO0FBQ2xEO0FBQ0EsUUFBUSxpQ0FBTyxFQUFFLG1DQUFFO0FBQ25CO0FBQ0EsU0FBUztBQUFBLGtHQUFDO0FBQ1YsTUFBTSxLQUFLLEVBUU47QUFDTCxDQUFDLG9CQUFvQjtBQUNyQjtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnQkFBZ0IsRUFBRSx1Q0FBdUM7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGlDQUFpQztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw4QkFBOEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHNHQUFzRztBQUNwSDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCLE1BQU07QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsT0FBTztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsaUNBQWlDO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsOENBQThDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixrQkFBa0I7QUFDbEIsMEZBQTBGO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDhHQUE4RztBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxnRUFBZ0U7QUFDeEg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC1nZW5raXQvLi9ub2RlX21vZHVsZXMvanNvbi1zY2hlbWEvbGliL3ZhbGlkYXRlLmpzP2Q3NzgiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEpTT05TY2hlbWEgVmFsaWRhdG9yIC0gVmFsaWRhdGVzIEphdmFTY3JpcHQgb2JqZWN0cyB1c2luZyBKU09OIFNjaGVtYXNcclxuICpcdChodHRwOi8vd3d3Lmpzb24uY29tL2pzb24tc2NoZW1hLXByb3Bvc2FsLylcclxuICogTGljZW5zZWQgdW5kZXIgQUZMLTIuMSBPUiBCU0QtMy1DbGF1c2VcclxuVG8gdXNlIHRoZSB2YWxpZGF0b3IgY2FsbCB0aGUgdmFsaWRhdGUgZnVuY3Rpb24gd2l0aCBhbiBpbnN0YW5jZSBvYmplY3QgYW5kIGFuIG9wdGlvbmFsIHNjaGVtYSBvYmplY3QuXHJcbklmIGEgc2NoZW1hIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGJlIHVzZWQgdG8gdmFsaWRhdGUuIElmIHRoZSBpbnN0YW5jZSBvYmplY3QgcmVmZXJzIHRvIGEgc2NoZW1hIChzZWxmLXZhbGlkYXRpbmcpLFxyXG50aGF0IHNjaGVtYSB3aWxsIGJlIHVzZWQgdG8gdmFsaWRhdGUgYW5kIHRoZSBzY2hlbWEgcGFyYW1ldGVyIGlzIG5vdCBuZWNlc3NhcnkgKGlmIGJvdGggZXhpc3QsXHJcbmJvdGggdmFsaWRhdGlvbnMgd2lsbCBvY2N1cikuXHJcblRoZSB2YWxpZGF0ZSBtZXRob2Qgd2lsbCByZXR1cm4gYW4gYXJyYXkgb2YgdmFsaWRhdGlvbiBlcnJvcnMuIElmIHRoZXJlIGFyZSBubyBlcnJvcnMsIHRoZW4gYW5cclxuZW1wdHkgbGlzdCB3aWxsIGJlIHJldHVybmVkLiBBIHZhbGlkYXRpb24gZXJyb3Igd2lsbCBoYXZlIHR3byBwcm9wZXJ0aWVzOlxyXG5cInByb3BlcnR5XCIgd2hpY2ggaW5kaWNhdGVzIHdoaWNoIHByb3BlcnR5IGhhZCB0aGUgZXJyb3JcclxuXCJtZXNzYWdlXCIgd2hpY2ggaW5kaWNhdGVzIHdoYXQgdGhlIGVycm9yIHdhc1xyXG4gKi9cclxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XHJcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxyXG4gICAgICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFjdG9yeSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgICAgIC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxyXG4gICAgICAgIC8vIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxyXG4gICAgICAgIC8vIGxpa2UgTm9kZS5cclxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzXHJcbiAgICAgICAgcm9vdC5qc29uU2NoZW1hID0gZmFjdG9yeSgpO1xyXG4gICAgfVxyXG59KHRoaXMsIGZ1bmN0aW9uICgpIHsvLyBzZXR1cCBwcmltaXRpdmUgY2xhc3NlcyB0byBiZSBKU09OIFNjaGVtYSB0eXBlc1xyXG52YXIgZXhwb3J0cyA9IHZhbGlkYXRlXHJcbmV4cG9ydHMuSW50ZWdlciA9IHt0eXBlOlwiaW50ZWdlclwifTtcclxudmFyIHByaW1pdGl2ZUNvbnN0cnVjdG9ycyA9IHtcclxuXHRTdHJpbmc6IFN0cmluZyxcclxuXHRCb29sZWFuOiBCb29sZWFuLFxyXG5cdE51bWJlcjogTnVtYmVyLFxyXG5cdE9iamVjdDogT2JqZWN0LFxyXG5cdEFycmF5OiBBcnJheSxcclxuXHREYXRlOiBEYXRlXHJcbn1cclxuZXhwb3J0cy52YWxpZGF0ZSA9IHZhbGlkYXRlO1xyXG5mdW5jdGlvbiB2YWxpZGF0ZSgvKkFueSovaW5zdGFuY2UsLypPYmplY3QqL3NjaGVtYSkge1xyXG5cdFx0Ly8gU3VtbWFyeTpcclxuXHRcdC8vICBcdFRvIHVzZSB0aGUgdmFsaWRhdG9yIGNhbGwgSlNPTlNjaGVtYS52YWxpZGF0ZSB3aXRoIGFuIGluc3RhbmNlIG9iamVjdCBhbmQgYW4gb3B0aW9uYWwgc2NoZW1hIG9iamVjdC5cclxuXHRcdC8vIFx0XHRJZiBhIHNjaGVtYSBpcyBwcm92aWRlZCwgaXQgd2lsbCBiZSB1c2VkIHRvIHZhbGlkYXRlLiBJZiB0aGUgaW5zdGFuY2Ugb2JqZWN0IHJlZmVycyB0byBhIHNjaGVtYSAoc2VsZi12YWxpZGF0aW5nKSxcclxuXHRcdC8vIFx0XHR0aGF0IHNjaGVtYSB3aWxsIGJlIHVzZWQgdG8gdmFsaWRhdGUgYW5kIHRoZSBzY2hlbWEgcGFyYW1ldGVyIGlzIG5vdCBuZWNlc3NhcnkgKGlmIGJvdGggZXhpc3QsXHJcblx0XHQvLyBcdFx0Ym90aCB2YWxpZGF0aW9ucyB3aWxsIG9jY3VyKS5cclxuXHRcdC8vIFx0XHRUaGUgdmFsaWRhdGUgbWV0aG9kIHdpbGwgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHR3byBwcm9wZXJ0aWVzOlxyXG5cdFx0Ly8gXHRcdFx0dmFsaWQ6IEEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSBpbnN0YW5jZSBpcyB2YWxpZCBieSB0aGUgc2NoZW1hXHJcblx0XHQvLyBcdFx0XHRlcnJvcnM6IEFuIGFycmF5IG9mIHZhbGlkYXRpb24gZXJyb3JzLiBJZiB0aGVyZSBhcmUgbm8gZXJyb3JzLCB0aGVuIGFuXHJcblx0XHQvLyBcdFx0XHRcdFx0ZW1wdHkgbGlzdCB3aWxsIGJlIHJldHVybmVkLiBBIHZhbGlkYXRpb24gZXJyb3Igd2lsbCBoYXZlIHR3byBwcm9wZXJ0aWVzOlxyXG5cdFx0Ly8gXHRcdFx0XHRcdFx0cHJvcGVydHk6IHdoaWNoIGluZGljYXRlcyB3aGljaCBwcm9wZXJ0eSBoYWQgdGhlIGVycm9yXHJcblx0XHQvLyBcdFx0XHRcdFx0XHRtZXNzYWdlOiB3aGljaCBpbmRpY2F0ZXMgd2hhdCB0aGUgZXJyb3Igd2FzXHJcblx0XHQvL1xyXG5cdFx0cmV0dXJuIHZhbGlkYXRlKGluc3RhbmNlLCBzY2hlbWEsIHtjaGFuZ2luZzogZmFsc2V9KTsvLywgY29lcmNlOiBmYWxzZSwgZXhpc3RpbmdPbmx5OiBmYWxzZX0pO1xyXG5cdH07XHJcbmV4cG9ydHMuY2hlY2tQcm9wZXJ0eUNoYW5nZSA9IGZ1bmN0aW9uKC8qQW55Ki92YWx1ZSwvKk9iamVjdCovc2NoZW1hLCAvKlN0cmluZyovcHJvcGVydHkpIHtcclxuXHRcdC8vIFN1bW1hcnk6XHJcblx0XHQvLyBcdFx0VGhlIGNoZWNrUHJvcGVydHlDaGFuZ2UgbWV0aG9kIHdpbGwgY2hlY2sgdG8gc2VlIGlmIGFuIHZhbHVlIGNhbiBsZWdhbGx5IGJlIGluIHByb3BlcnR5IHdpdGggdGhlIGdpdmVuIHNjaGVtYVxyXG5cdFx0Ly8gXHRcdFRoaXMgaXMgc2xpZ2h0bHkgZGlmZmVyZW50IHRoYW4gdGhlIHZhbGlkYXRlIG1ldGhvZCBpbiB0aGF0IGl0IHdpbGwgZmFpbCBpZiB0aGUgc2NoZW1hIGlzIHJlYWRvbmx5IGFuZCBpdCB3aWxsXHJcblx0XHQvLyBcdFx0bm90IGNoZWNrIGZvciBzZWxmLXZhbGlkYXRpb24sIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGUgcGFzc2VkIGluIHZhbHVlIGlzIGFscmVhZHkgaW50ZXJuYWxseSB2YWxpZC5cclxuXHRcdC8vIFx0XHRUaGUgY2hlY2tQcm9wZXJ0eUNoYW5nZSBtZXRob2Qgd2lsbCByZXR1cm4gdGhlIHNhbWUgb2JqZWN0IHR5cGUgYXMgdmFsaWRhdGUsIHNlZSBKU09OU2NoZW1hLnZhbGlkYXRlIGZvclxyXG5cdFx0Ly8gXHRcdGluZm9ybWF0aW9uLlxyXG5cdFx0Ly9cclxuXHRcdHJldHVybiB2YWxpZGF0ZSh2YWx1ZSwgc2NoZW1hLCB7Y2hhbmdpbmc6IHByb3BlcnR5IHx8IFwicHJvcGVydHlcIn0pO1xyXG5cdH07XHJcbnZhciB2YWxpZGF0ZSA9IGV4cG9ydHMuX3ZhbGlkYXRlID0gZnVuY3Rpb24oLypBbnkqL2luc3RhbmNlLC8qT2JqZWN0Ki9zY2hlbWEsLypPYmplY3QqL29wdGlvbnMpIHtcclxuXHJcblx0aWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XHJcblx0dmFyIF9jaGFuZ2luZyA9IG9wdGlvbnMuY2hhbmdpbmc7XHJcblxyXG5cdGZ1bmN0aW9uIGdldFR5cGUoc2NoZW1hKXtcclxuXHRcdHJldHVybiBzY2hlbWEudHlwZSB8fCAocHJpbWl0aXZlQ29uc3RydWN0b3JzW3NjaGVtYS5uYW1lXSA9PSBzY2hlbWEgJiYgc2NoZW1hLm5hbWUudG9Mb3dlckNhc2UoKSk7XHJcblx0fVxyXG5cdHZhciBlcnJvcnMgPSBbXTtcclxuXHQvLyB2YWxpZGF0ZSBhIHZhbHVlIGFnYWluc3QgYSBwcm9wZXJ0eSBkZWZpbml0aW9uXHJcblx0ZnVuY3Rpb24gY2hlY2tQcm9wKHZhbHVlLCBzY2hlbWEsIHBhdGgsaSl7XHJcblxyXG5cdFx0dmFyIGw7XHJcblx0XHRwYXRoICs9IHBhdGggPyB0eXBlb2YgaSA9PSAnbnVtYmVyJyA/ICdbJyArIGkgKyAnXScgOiB0eXBlb2YgaSA9PSAndW5kZWZpbmVkJyA/ICcnIDogJy4nICsgaSA6IGk7XHJcblx0XHRmdW5jdGlvbiBhZGRFcnJvcihtZXNzYWdlKXtcclxuXHRcdFx0ZXJyb3JzLnB1c2goe3Byb3BlcnR5OnBhdGgsbWVzc2FnZTptZXNzYWdlfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoKHR5cGVvZiBzY2hlbWEgIT0gJ29iamVjdCcgfHwgc2NoZW1hIGluc3RhbmNlb2YgQXJyYXkpICYmIChwYXRoIHx8IHR5cGVvZiBzY2hlbWEgIT0gJ2Z1bmN0aW9uJykgJiYgIShzY2hlbWEgJiYgZ2V0VHlwZShzY2hlbWEpKSl7XHJcblx0XHRcdGlmKHR5cGVvZiBzY2hlbWEgPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRcdFx0aWYoISh2YWx1ZSBpbnN0YW5jZW9mIHNjaGVtYSkpe1xyXG5cdFx0XHRcdFx0YWRkRXJyb3IoXCJpcyBub3QgYW4gaW5zdGFuY2Ugb2YgdGhlIGNsYXNzL2NvbnN0cnVjdG9yIFwiICsgc2NoZW1hLm5hbWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2UgaWYoc2NoZW1hKXtcclxuXHRcdFx0XHRhZGRFcnJvcihcIkludmFsaWQgc2NoZW1hL3Byb3BlcnR5IGRlZmluaXRpb24gXCIgKyBzY2hlbWEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdFx0aWYoX2NoYW5naW5nICYmIHNjaGVtYS5yZWFkb25seSl7XHJcblx0XHRcdGFkZEVycm9yKFwiaXMgYSByZWFkb25seSBmaWVsZCwgaXQgY2FuIG5vdCBiZSBjaGFuZ2VkXCIpO1xyXG5cdFx0fVxyXG5cdFx0aWYoc2NoZW1hWydleHRlbmRzJ10peyAvLyBpZiBpdCBleHRlbmRzIGFub3RoZXIgc2NoZW1hLCBpdCBtdXN0IHBhc3MgdGhhdCBzY2hlbWEgYXMgd2VsbFxyXG5cdFx0XHRjaGVja1Byb3AodmFsdWUsc2NoZW1hWydleHRlbmRzJ10scGF0aCxpKTtcclxuXHRcdH1cclxuXHRcdC8vIHZhbGlkYXRlIGEgdmFsdWUgYWdhaW5zdCBhIHR5cGUgZGVmaW5pdGlvblxyXG5cdFx0ZnVuY3Rpb24gY2hlY2tUeXBlKHR5cGUsdmFsdWUpe1xyXG5cdFx0XHRpZih0eXBlKXtcclxuXHRcdFx0XHRpZih0eXBlb2YgdHlwZSA9PSAnc3RyaW5nJyAmJiB0eXBlICE9ICdhbnknICYmXHJcblx0XHRcdFx0XHRcdCh0eXBlID09ICdudWxsJyA/IHZhbHVlICE9PSBudWxsIDogdHlwZW9mIHZhbHVlICE9IHR5cGUpICYmXHJcblx0XHRcdFx0XHRcdCEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0eXBlID09ICdhcnJheScpICYmXHJcblx0XHRcdFx0XHRcdCEodmFsdWUgaW5zdGFuY2VvZiBEYXRlICYmIHR5cGUgPT0gJ2RhdGUnKSAmJlxyXG5cdFx0XHRcdFx0XHQhKHR5cGUgPT0gJ2ludGVnZXInICYmIHZhbHVlJTE9PT0wKSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gW3twcm9wZXJ0eTpwYXRoLG1lc3NhZ2U6dmFsdWUgKyBcIiAtIFwiICsgKHR5cGVvZiB2YWx1ZSkgKyBcIiB2YWx1ZSBmb3VuZCwgYnV0IGEgXCIgKyB0eXBlICsgXCIgaXMgcmVxdWlyZWRcIn1dO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZih0eXBlIGluc3RhbmNlb2YgQXJyYXkpe1xyXG5cdFx0XHRcdFx0dmFyIHVuaW9uRXJyb3JzPVtdO1xyXG5cdFx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IHR5cGUubGVuZ3RoOyBqKyspeyAvLyBhIHVuaW9uIHR5cGVcclxuXHRcdFx0XHRcdFx0aWYoISh1bmlvbkVycm9ycz1jaGVja1R5cGUodHlwZVtqXSx2YWx1ZSkpLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmKHVuaW9uRXJyb3JzLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRcdHJldHVybiB1bmlvbkVycm9ycztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9ZWxzZSBpZih0eXBlb2YgdHlwZSA9PSAnb2JqZWN0Jyl7XHJcblx0XHRcdFx0XHR2YXIgcHJpb3JFcnJvcnMgPSBlcnJvcnM7XHJcblx0XHRcdFx0XHRlcnJvcnMgPSBbXTtcclxuXHRcdFx0XHRcdGNoZWNrUHJvcCh2YWx1ZSx0eXBlLHBhdGgpO1xyXG5cdFx0XHRcdFx0dmFyIHRoZXNlRXJyb3JzID0gZXJyb3JzO1xyXG5cdFx0XHRcdFx0ZXJyb3JzID0gcHJpb3JFcnJvcnM7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhlc2VFcnJvcnM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBbXTtcclxuXHRcdH1cclxuXHRcdGlmKHZhbHVlID09PSB1bmRlZmluZWQpe1xyXG5cdFx0XHRpZihzY2hlbWEucmVxdWlyZWQpe1xyXG5cdFx0XHRcdGFkZEVycm9yKFwiaXMgbWlzc2luZyBhbmQgaXQgaXMgcmVxdWlyZWRcIik7XHJcblx0XHRcdH1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHRlcnJvcnMgPSBlcnJvcnMuY29uY2F0KGNoZWNrVHlwZShnZXRUeXBlKHNjaGVtYSksdmFsdWUpKTtcclxuXHRcdFx0aWYoc2NoZW1hLmRpc2FsbG93ICYmICFjaGVja1R5cGUoc2NoZW1hLmRpc2FsbG93LHZhbHVlKS5sZW5ndGgpe1xyXG5cdFx0XHRcdGFkZEVycm9yKFwiIGRpc2FsbG93ZWQgdmFsdWUgd2FzIG1hdGNoZWRcIik7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYodmFsdWUgIT09IG51bGwpe1xyXG5cdFx0XHRcdGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpe1xyXG5cdFx0XHRcdFx0aWYoc2NoZW1hLml0ZW1zKXtcclxuXHRcdFx0XHRcdFx0dmFyIGl0ZW1zSXNBcnJheSA9IHNjaGVtYS5pdGVtcyBpbnN0YW5jZW9mIEFycmF5O1xyXG5cdFx0XHRcdFx0XHR2YXIgcHJvcERlZiA9IHNjaGVtYS5pdGVtcztcclxuXHRcdFx0XHRcdFx0Zm9yIChpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7IGkgKz0gMSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChpdGVtc0lzQXJyYXkpXHJcblx0XHRcdFx0XHRcdFx0XHRwcm9wRGVmID0gc2NoZW1hLml0ZW1zW2ldO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLmNvZXJjZSlcclxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlW2ldID0gb3B0aW9ucy5jb2VyY2UodmFsdWVbaV0sIHByb3BEZWYpO1xyXG5cdFx0XHRcdFx0XHRcdGVycm9ycy5jb25jYXQoY2hlY2tQcm9wKHZhbHVlW2ldLHByb3BEZWYscGF0aCxpKSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmKHNjaGVtYS5taW5JdGVtcyAmJiB2YWx1ZS5sZW5ndGggPCBzY2hlbWEubWluSXRlbXMpe1xyXG5cdFx0XHRcdFx0XHRhZGRFcnJvcihcIlRoZXJlIG11c3QgYmUgYSBtaW5pbXVtIG9mIFwiICsgc2NoZW1hLm1pbkl0ZW1zICsgXCIgaW4gdGhlIGFycmF5XCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYoc2NoZW1hLm1heEl0ZW1zICYmIHZhbHVlLmxlbmd0aCA+IHNjaGVtYS5tYXhJdGVtcyl7XHJcblx0XHRcdFx0XHRcdGFkZEVycm9yKFwiVGhlcmUgbXVzdCBiZSBhIG1heGltdW0gb2YgXCIgKyBzY2hlbWEubWF4SXRlbXMgKyBcIiBpbiB0aGUgYXJyYXlcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fWVsc2UgaWYoc2NoZW1hLnByb3BlcnRpZXMgfHwgc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKXtcclxuXHRcdFx0XHRcdGVycm9ycy5jb25jYXQoY2hlY2tPYmoodmFsdWUsIHNjaGVtYS5wcm9wZXJ0aWVzLCBwYXRoLCBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoc2NoZW1hLnBhdHRlcm4gJiYgdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnICYmICF2YWx1ZS5tYXRjaChzY2hlbWEucGF0dGVybikpe1xyXG5cdFx0XHRcdFx0YWRkRXJyb3IoXCJkb2VzIG5vdCBtYXRjaCB0aGUgcmVnZXggcGF0dGVybiBcIiArIHNjaGVtYS5wYXR0ZXJuKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoc2NoZW1hLm1heExlbmd0aCAmJiB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgJiYgdmFsdWUubGVuZ3RoID4gc2NoZW1hLm1heExlbmd0aCl7XHJcblx0XHRcdFx0XHRhZGRFcnJvcihcIm1heSBvbmx5IGJlIFwiICsgc2NoZW1hLm1heExlbmd0aCArIFwiIGNoYXJhY3RlcnMgbG9uZ1wiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoc2NoZW1hLm1pbkxlbmd0aCAmJiB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgJiYgdmFsdWUubGVuZ3RoIDwgc2NoZW1hLm1pbkxlbmd0aCl7XHJcblx0XHRcdFx0XHRhZGRFcnJvcihcIm11c3QgYmUgYXQgbGVhc3QgXCIgKyBzY2hlbWEubWluTGVuZ3RoICsgXCIgY2hhcmFjdGVycyBsb25nXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZih0eXBlb2Ygc2NoZW1hLm1pbmltdW0gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB2YWx1ZSA9PSB0eXBlb2Ygc2NoZW1hLm1pbmltdW0gJiZcclxuXHRcdFx0XHRcdFx0c2NoZW1hLm1pbmltdW0gPiB2YWx1ZSl7XHJcblx0XHRcdFx0XHRhZGRFcnJvcihcIm11c3QgaGF2ZSBhIG1pbmltdW0gdmFsdWUgb2YgXCIgKyBzY2hlbWEubWluaW11bSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmKHR5cGVvZiBzY2hlbWEubWF4aW11bSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHZhbHVlID09IHR5cGVvZiBzY2hlbWEubWF4aW11bSAmJlxyXG5cdFx0XHRcdFx0XHRzY2hlbWEubWF4aW11bSA8IHZhbHVlKXtcclxuXHRcdFx0XHRcdGFkZEVycm9yKFwibXVzdCBoYXZlIGEgbWF4aW11bSB2YWx1ZSBvZiBcIiArIHNjaGVtYS5tYXhpbXVtKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYoc2NoZW1hWydlbnVtJ10pe1xyXG5cdFx0XHRcdFx0dmFyIGVudW1lciA9IHNjaGVtYVsnZW51bSddO1xyXG5cdFx0XHRcdFx0bCA9IGVudW1lci5sZW5ndGg7XHJcblx0XHRcdFx0XHR2YXIgZm91bmQ7XHJcblx0XHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgbDsgaisrKXtcclxuXHRcdFx0XHRcdFx0aWYoZW51bWVyW2pdPT09dmFsdWUpe1xyXG5cdFx0XHRcdFx0XHRcdGZvdW5kPTE7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmKCFmb3VuZCl7XHJcblx0XHRcdFx0XHRcdGFkZEVycm9yKFwiZG9lcyBub3QgaGF2ZSBhIHZhbHVlIGluIHRoZSBlbnVtZXJhdGlvbiBcIiArIGVudW1lci5qb2luKFwiLCBcIikpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZih0eXBlb2Ygc2NoZW1hLm1heERlY2ltYWwgPT0gJ251bWJlcicgJiZcclxuXHRcdFx0XHRcdCh2YWx1ZS50b1N0cmluZygpLm1hdGNoKG5ldyBSZWdFeHAoXCJcXFxcLlswLTlde1wiICsgKHNjaGVtYS5tYXhEZWNpbWFsICsgMSkgKyBcIix9XCIpKSkpe1xyXG5cdFx0XHRcdFx0YWRkRXJyb3IoXCJtYXkgb25seSBoYXZlIFwiICsgc2NoZW1hLm1heERlY2ltYWwgKyBcIiBkaWdpdHMgb2YgZGVjaW1hbCBwbGFjZXNcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0Ly8gdmFsaWRhdGUgYW4gb2JqZWN0IGFnYWluc3QgYSBzY2hlbWFcclxuXHRmdW5jdGlvbiBjaGVja09iaihpbnN0YW5jZSxvYmpUeXBlRGVmLHBhdGgsYWRkaXRpb25hbFByb3Ape1xyXG5cclxuXHRcdGlmKHR5cGVvZiBvYmpUeXBlRGVmID09J29iamVjdCcpe1xyXG5cdFx0XHRpZih0eXBlb2YgaW5zdGFuY2UgIT0gJ29iamVjdCcgfHwgaW5zdGFuY2UgaW5zdGFuY2VvZiBBcnJheSl7XHJcblx0XHRcdFx0ZXJyb3JzLnB1c2goe3Byb3BlcnR5OnBhdGgsbWVzc2FnZTpcImFuIG9iamVjdCBpcyByZXF1aXJlZFwifSk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGZvcih2YXIgaSBpbiBvYmpUeXBlRGVmKXsgXHJcblx0XHRcdFx0aWYob2JqVHlwZURlZi5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpICE9ICdfX3Byb3RvX18nICYmIGkgIT0gJ2NvbnN0cnVjdG9yJyl7XHJcblx0XHRcdFx0XHR2YXIgdmFsdWUgPSBpbnN0YW5jZS5oYXNPd25Qcm9wZXJ0eShpKSA/IGluc3RhbmNlW2ldIDogdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0Ly8gc2tpcCBfbm90XyBzcGVjaWZpZWQgcHJvcGVydGllc1xyXG5cdFx0XHRcdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5leGlzdGluZ09ubHkpIGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0dmFyIHByb3BEZWYgPSBvYmpUeXBlRGVmW2ldO1xyXG5cdFx0XHRcdFx0Ly8gc2V0IGRlZmF1bHRcclxuXHRcdFx0XHRcdGlmKHZhbHVlID09PSB1bmRlZmluZWQgJiYgcHJvcERlZltcImRlZmF1bHRcIl0pe1xyXG5cdFx0XHRcdFx0XHR2YWx1ZSA9IGluc3RhbmNlW2ldID0gcHJvcERlZltcImRlZmF1bHRcIl07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZihvcHRpb25zLmNvZXJjZSAmJiBpIGluIGluc3RhbmNlKXtcclxuXHRcdFx0XHRcdFx0dmFsdWUgPSBpbnN0YW5jZVtpXSA9IG9wdGlvbnMuY29lcmNlKHZhbHVlLCBwcm9wRGVmKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNoZWNrUHJvcCh2YWx1ZSxwcm9wRGVmLHBhdGgsaSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRmb3IoaSBpbiBpbnN0YW5jZSl7XHJcblx0XHRcdGlmKGluc3RhbmNlLmhhc093blByb3BlcnR5KGkpICYmICEoaS5jaGFyQXQoMCkgPT0gJ18nICYmIGkuY2hhckF0KDEpID09ICdfJykgJiYgb2JqVHlwZURlZiAmJiAhb2JqVHlwZURlZltpXSAmJiBhZGRpdGlvbmFsUHJvcD09PWZhbHNlKXtcclxuXHRcdFx0XHRpZiAob3B0aW9ucy5maWx0ZXIpIHtcclxuXHRcdFx0XHRcdGRlbGV0ZSBpbnN0YW5jZVtpXTtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRlcnJvcnMucHVzaCh7cHJvcGVydHk6cGF0aCxtZXNzYWdlOlwiVGhlIHByb3BlcnR5IFwiICsgaSArXHJcblx0XHRcdFx0XHRcdFwiIGlzIG5vdCBkZWZpbmVkIGluIHRoZSBzY2hlbWEgYW5kIHRoZSBzY2hlbWEgZG9lcyBub3QgYWxsb3cgYWRkaXRpb25hbCBwcm9wZXJ0aWVzXCJ9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIHJlcXVpcmVzID0gb2JqVHlwZURlZiAmJiBvYmpUeXBlRGVmW2ldICYmIG9ialR5cGVEZWZbaV0ucmVxdWlyZXM7XHJcblx0XHRcdGlmKHJlcXVpcmVzICYmICEocmVxdWlyZXMgaW4gaW5zdGFuY2UpKXtcclxuXHRcdFx0XHRlcnJvcnMucHVzaCh7cHJvcGVydHk6cGF0aCxtZXNzYWdlOlwidGhlIHByZXNlbmNlIG9mIHRoZSBwcm9wZXJ0eSBcIiArIGkgKyBcIiByZXF1aXJlcyB0aGF0IFwiICsgcmVxdWlyZXMgKyBcIiBhbHNvIGJlIHByZXNlbnRcIn0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhbHVlID0gaW5zdGFuY2VbaV07XHJcblx0XHRcdGlmKGFkZGl0aW9uYWxQcm9wICYmICghKG9ialR5cGVEZWYgJiYgdHlwZW9mIG9ialR5cGVEZWYgPT0gJ29iamVjdCcpIHx8ICEoaSBpbiBvYmpUeXBlRGVmKSkpe1xyXG5cdFx0XHRcdGlmKG9wdGlvbnMuY29lcmNlKXtcclxuXHRcdFx0XHRcdHZhbHVlID0gaW5zdGFuY2VbaV0gPSBvcHRpb25zLmNvZXJjZSh2YWx1ZSwgYWRkaXRpb25hbFByb3ApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjaGVja1Byb3AodmFsdWUsYWRkaXRpb25hbFByb3AscGF0aCxpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZighX2NoYW5naW5nICYmIHZhbHVlICYmIHZhbHVlLiRzY2hlbWEpe1xyXG5cdFx0XHRcdGVycm9ycyA9IGVycm9ycy5jb25jYXQoY2hlY2tQcm9wKHZhbHVlLHZhbHVlLiRzY2hlbWEscGF0aCxpKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBlcnJvcnM7XHJcblx0fVxyXG5cdGlmKHNjaGVtYSl7XHJcblx0XHRjaGVja1Byb3AoaW5zdGFuY2Usc2NoZW1hLCcnLF9jaGFuZ2luZyB8fCAnJyk7XHJcblx0fVxyXG5cdGlmKCFfY2hhbmdpbmcgJiYgaW5zdGFuY2UgJiYgaW5zdGFuY2UuJHNjaGVtYSl7XHJcblx0XHRjaGVja1Byb3AoaW5zdGFuY2UsaW5zdGFuY2UuJHNjaGVtYSwnJywnJyk7XHJcblx0fVxyXG5cdHJldHVybiB7dmFsaWQ6IWVycm9ycy5sZW5ndGgsZXJyb3JzOmVycm9yc307XHJcbn07XHJcbmV4cG9ydHMubXVzdEJlVmFsaWQgPSBmdW5jdGlvbihyZXN1bHQpe1xyXG5cdC8vXHRzdW1tYXJ5OlxyXG5cdC8vXHRcdFRoaXMgY2hlY2tzIHRvIGVuc3VyZSB0aGF0IHRoZSByZXN1bHQgaXMgdmFsaWQgYW5kIHdpbGwgdGhyb3cgYW4gYXBwcm9wcmlhdGUgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyBub3RcclxuXHQvLyByZXN1bHQ6IHRoZSByZXN1bHQgcmV0dXJuZWQgZnJvbSBjaGVja1Byb3BlcnR5Q2hhbmdlIG9yIHZhbGlkYXRlXHJcblx0aWYoIXJlc3VsdC52YWxpZCl7XHJcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKHJlc3VsdC5lcnJvcnMubWFwKGZ1bmN0aW9uKGVycm9yKXtyZXR1cm4gXCJmb3IgcHJvcGVydHkgXCIgKyBlcnJvci5wcm9wZXJ0eSArICc6ICcgKyBlcnJvci5tZXNzYWdlO30pLmpvaW4oXCIsIFxcblwiKSk7XHJcblx0fVxyXG59XHJcblxyXG5yZXR1cm4gZXhwb3J0cztcclxufSkpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/json-schema/lib/validate.js\n");

/***/ })

};
;