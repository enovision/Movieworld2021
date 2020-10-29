# TipToast Ext JS Package for Bootstrap alike alerts

This Ext JS package is an easy way of showing alerts like Bootstrap alerts.

## Getting Started

Clone this repository to the packages/local folder of your workspace/application.

Modify your `app.json` file and add include the package in the requirements:

```
"requires": [
    ...,
    "ext-tip-toast"
    ...
],
```

### Prerequisites

This package was developed using `Sencha Cmd 6.5` and `Ext JS 6.2.1` classic. I guess that 
this package should also work with Ext JS version 5, but has not been tested.

This package has its own SASS styling and is not depending on a Sencha theme.

The `TipToast` uses a singleton for presenting the messages. Disadvantage is that it will
generate a `<div>` container at the moment the first `TipToast.toast` is initiated. It is therefor
in this version only possible to have your messages show up at the same position.

### Usage

### Configuration options

#### delay

The default delay is 2000 ms (2 seconds). You can alter this for every toast message
you send or at the launch of your program.

at launch (change default):
```
TipToast.setDelayOption(4000);
```

when showing a message:
```
TipToast.toast('Nice Title', 'Nice Message', 3000);
```
or:
```
TipToast.toast('Nice Title', 'Nice Message', {
   delay: 3000
});
```

#### size

The default size of a message is 400px. You can alter this at the launch of your program.

at launch (change default):
```
TipToast.setSizeOption('sm'); // 300px
TipToast.setSizeOption('lg'); // 500px
TipToast.setSizeOption('default'); // 400px
```

#### direction

The default direction of a message is sliding in from the top of the viewport. You can alter this at the launch of your program.

at launch (change default):
```
TipToast.setDirectionOption('top');
TipToast.setDirectionOption('bottom');
```

#### position

The default position of a message is at the center of the viewport. You can alter this at the launch of your program.

at launch (change default):
```
TipToast.setPositionOption('left');
TipToast.setPositionOption('right');
TipToast.setPositionOption('default');
```

#### closeable

By default you can close a message. When you don't want this, you can change the default at the launch of your program.

at launch (change default):
```
TipToast.setCloseOption(false);
```

when showing a message:
```
TipToast.toast('Nice Title', 'Nice Message', {
   delay: 3000,
   closeable: false
});
```

#### cls

The `cls` add a `CSS` class to the message. There are some special classes that can be used
to simulate the Bootstrap alert colors:

* danger (red)
* info (blue)
* warning (yellow)
* plain (gray)
* success (green)

There are 2 ways to get a message show up with the appropriate color settings.

when showing a message:
```
TipToast.toast('Nice Title', 'Nice Message', {
   cls: 'danger'
});

// or:

TipToast.danger('Nice Title', 'Nice Message');
```
All color settings like `danger` or `success` are also methods. An additional alternative for 
danger is availabe:

```
TipToast.error('Bad Title', 'Something is wrong');
```

## Styling

You can find in the folders `var` and `src` within the `sass` folder the SASS styling rules.
In the `var\all.scss` you can find the variable values and in the the `src\all.scss` you can find the
actual CSS rules.
        
## Versioning

##### 1.0
Initial commit 

## Authors

* **Johan van de Merwe** - *This package development*
* **AlexB** - *Base principle coding and inspiration*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Thanks to AlexB for the inspiration, for some of the code used in this package was used from his developments that

can be found here: [extjs-tip-toast](https://github.com/TKeePeR/extjs-tip-toast)
