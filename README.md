# Formism

> easy way to pack and unpack your data

## install

``` bash
yarn add formism
```

## pack your data to FormData

``` javascript
import { pack } from 'formism';

const sourceObj = [{
  deep: {
    file: new File([], 'empty.txt'),
    string: 'string',
    number: 123,
    boolean: false,
  },
}];

const formData = pack(sourceObj); // output a FormData instance

```

## unpack FormData

``` javascript
import { unpack } from 'formism';

const recoveredObj = unpack(formData);
```
