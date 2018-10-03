# jQuery Tags Input plugin

This plugin has several dependencies:
- jQuery 3
- jQuery Color Plus Name 2
- Bootstrap v4

## Compilation

```Bash
git clone git@github.com:khenfei/jquery-tagsinput.git
cd jquery-tagsinput
npm install #Setup necessary dependencies.
npm run-script test #Verify all test passed. [Optional]
npm run-script build #Build the project.
```

The minified js (including its source map) and css can be found in dist/ folder.

## Instructions

First, add the Javascript and CSS files to `<head>` tag, and place them in the following order:
```html
<head>
  <link href="bootstrap.min.css" rel="stylesheet" type="text/css" />
  <link href="jquery-tagsinput.min.css" rel="stylesheet" type="text/css" />
	
  <script src="jquery-3.3.1.min.js"></script>
  <script src="jquery.color.plus-names-2.1.2.min.js"></script>
  <script src="bootstrap.min.js" defer></script>
  <script src="jquery-tagsinput.min.js" defer></script>
</head>
```	

Create an input element in your form. Attribute `value` is optional. When it is set, it must be in a semi-colon-separated string format.
```html
<input id="tags" name="tags" value="first;second;third;" />
```
Lastly, initialize the plugin by the following statement:
```javascript
$('#tags').tagsInput();
```

Please checkout the [sample](sample/demo.html) for more details.


