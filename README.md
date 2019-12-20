# Formism

> easy way to pack and unpack your data

## pack your data to FormData

``` javascript

const sourceObj = [{
  deep: {
    file: new File([], 'empty.txt'),
    string: 'string',
    number: 123,
    boolean: false,
  },
}];

const formData = formism(sourceObj); // output a FormData instance

```

## unpack FormData

``` javascript

const recoveredObj = parse(formData);

```
