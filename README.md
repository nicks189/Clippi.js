# Clippi.js

Easily build command line interfaces for interacting with REST APIs (using [Commander.js](https://github.com/tj/commander.js/))

## Usage

Create a CLI for desired APIs

```js
#!/usr/bin/env node
const Clippi = require('clippi');

let clippi = new Clippi('SampleCLI');

// Run Clippi.js with the passed arguments
clippi.run(process.argv);
```

Specify a request for your CLI

```js
let bacon = new ClippiRequest('bacon', 'Get some bacon from the interwebs',
    {
        // https://baconipsum.com/api/?type=meat-and-filler&sentences=1
        hostname: 'baconipsum.com',
        path: '/api/?type=meat-and-filler&sentences=1',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
);
clippi.addRequest(bacon);
```

Use your CLI

```shell
$ ./sampleCLI.js bacon
Response object: 
[ 'Flank rump sint bresaola.' ]

```

See samples folder for additional information.


###### In progress ######

